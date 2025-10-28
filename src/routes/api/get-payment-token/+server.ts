import { json, type RequestHandler } from '@sveltejs/kit';
import axios from 'axios';

const AUTHNET_API_LOGIN_ID = import.meta.env.VITE_AUTHNET_API_LOGIN_ID;
const AUTHNET_TRANSACTION_KEY = import.meta.env.VITE_AUTHNET_TRANSACTION_KEY;
const AUTHNET_RETURN_URL = import.meta.env.VITE_AUTHNET_RETURN_URL;

const AUTHNET_ENDPOINT = 'https://api.authorize.net/xml/v1/request.api';
// Use 'https://apitest.authorize.net/xml/v1/request.api' for sandbox testing
// Use 'https://api.authorize.net/xml/v1/request.api' for production

export const POST: RequestHandler = async ({ request }) => {
	const { lang, amount } = await request.json();

	try {
		const requestPayload = {
			getHostedPaymentPageRequest: {
				merchantAuthentication: {
					name: AUTHNET_API_LOGIN_ID,
					transactionKey: AUTHNET_TRANSACTION_KEY
				},
				transactionRequest: {
					transactionType: 'authCaptureTransaction',
					amount: amount.toFixed(2)
				},
				hostedPaymentSettings: {
					setting: [
						{
							settingName: 'hostedPaymentReturnOptions',
							settingValue:
								'{"showReceipt": true, "url": "' +
								AUTHNET_RETURN_URL +
								'/' +
								lang +
								'/give", "urlText": "Continue", "cancelUrl": "' +
								AUTHNET_RETURN_URL +
								'/' +
								lang +
								'/give","cancelUrlText": "Cancel"}'
						},
						{
							settingName: 'hostedPaymentButtonOptions',
							settingValue: '{"text": "Donate"}'
						},
						{
							settingName: 'hostedPaymentStyleOptions',
							settingValue: '{"bgColor": "blue"}'
						},
						{
							settingName: 'hostedPaymentPaymentOptions',
							settingValue:
								'{"cardCodeRequired": true, "showCreditCard": true, "showBankAccount": true}'
						},
						{
							settingName: 'hostedPaymentSecurityOptions',
							settingValue: '{"captcha": true}'
						},
						{
							settingName: 'hostedPaymentShippingAddressOptions',
							settingValue: '{"show": false, "required": false}'
						},
						{
							settingName: 'hostedPaymentBillingAddressOptions',
							settingValue: '{"show": true, "required": true}'
						},
						{
							settingName: 'hostedPaymentCustomerOptions',
							settingValue: '{"showEmail": true, "requiredEmail": true, "addPaymentProfile": false}'
						},
						{
							settingName: 'hostedPaymentOrderOptions',
							settingValue: '{"show": true, "merchantName": "Chinese Collegial Ministry Corp"}'
						}
					]
				}
			}
		};

		// Make the API call to Authorize.Net
		const response = await axios.post(AUTHNET_ENDPOINT, requestPayload, {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const rawData = response.data;
		let data = rawData;

		if (typeof rawData === 'string') {
			// strip BOM and trim whitespace
			data = rawData.replace(/^\uFEFF/, '').trim();

			try {
				data = JSON.parse(data);
			} catch (err) {
				console.warn('Authorize.Net response is not valid JSON after BOM removal:', err);
				return json({ error: 'Invalid response from payment gateway.' }, { status: 500 });
			}
		}

		if (data?.messages?.resultCode === 'Ok') {
			const token = data?.token;
			return json({ token });
		} else {
			const errorMessages = data?.messages?.message || [];
			const errorText = errorMessages.length > 0 ? errorMessages[0].text : 'Unknown error';

			console.error('Authorize.Net API Error:', errorText);
			return json({ error: errorText }, { status: 500 });
		}
	} catch (error) {
		console.error('Payment token request failed:', error);

		if (axios.isAxiosError(error)) {
			return json(
				{
					error: `${error.response?.data?.message || error.message}`
				},
				{ status: 500 }
			);
		}

		return json({ error: 'Unable to connect to the payment service.' }, { status: 500 });
	}
};
