import { env } from '$env/dynamic/private';
import { ALLOWED_LANGS, type AllowedLang } from '$lib/types';
import { json, type RequestHandler } from '@sveltejs/kit';
import axios from 'axios';

const AUTHNET_API_LOGIN_ID = env.PRIVATE_AUTHNET_API_LOGIN_ID;
const AUTHNET_TRANSACTION_KEY = env.PRIVATE_AUTHNET_TRANSACTION_KEY;
const AUTHNET_RETURN_URL = env.PRIVATE_SITE_URL;
const AUTHNET_ENDPOINT = 'https://api.authorize.net/xml/v1/request.api';
// Use 'https://apitest.authorize.net/xml/v1/request.api' for sandbox testing
// Use 'https://api.authorize.net/xml/v1/request.api' for production

// Validate input parameters
function validateLang(lang: unknown): lang is AllowedLang {
	return typeof lang === 'string' && ALLOWED_LANGS.includes(lang as AllowedLang);
}

function validateAmount(amount: unknown): number | null {
	const num = Number(amount);
	if (isNaN(num) || num <= 0 || num > 9999999) {
		return null;
	}
	return Math.round(num * 100) / 100; // round to 2 decimal places
}

export const POST: RequestHandler = async ({ request }) => {
	let body;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid request body' }, { status: 400 });
	}

	const { lang, amount } = body;

	if (!validateLang(lang)) {
		console.warn('Suspicious request with invalid lang:', {
			lang,
			ip: request.headers.get('x-forwarded-for')
		});
		return json({ error: 'Invalid language parameter' }, { status: 400 });
	}

	const validAmount = validateAmount(amount);
	if (validAmount === null) {
		return json({ error: 'Invalid amount' }, { status: 400 });
	}

	if (!AUTHNET_API_LOGIN_ID || !AUTHNET_TRANSACTION_KEY) {
		console.error('Missing Authorize.Net credentials');
		return json({ error: 'Payment service not configured' }, { status: 500 });
	}

	// Use object to avoid injection attacks
	const hostedPaymentReturnOptions = {
		showReceipt: true,
		url: `${AUTHNET_RETURN_URL}/${lang}/thank-you`,
		urlText: 'Continue',
		cancelUrl: `${AUTHNET_RETURN_URL}/${lang}/give`,
		cancelUrlText: 'Cancel'
	};

	const requestPayload = {
		getHostedPaymentPageRequest: {
			merchantAuthentication: {
				name: AUTHNET_API_LOGIN_ID,
				transactionKey: AUTHNET_TRANSACTION_KEY
			},
			transactionRequest: {
				transactionType: 'authCaptureTransaction',
				amount: validAmount.toFixed(2)
			},
			hostedPaymentSettings: {
				setting: [
					{
						settingName: 'hostedPaymentReturnOptions',
						settingValue: JSON.stringify(hostedPaymentReturnOptions)
					},
					{
						settingName: 'hostedPaymentButtonOptions',
						settingValue: JSON.stringify({ text: 'Donate' })
					},
					{
						settingName: 'hostedPaymentStyleOptions',
						settingValue: JSON.stringify({ bgColor: 'blue' })
					},
					{
						settingName: 'hostedPaymentPaymentOptions',
						settingValue: JSON.stringify({
							cardCodeRequired: true,
							showCreditCard: true,
							showBankAccount: true
						})
					},
					{
						settingName: 'hostedPaymentSecurityOptions',
						settingValue: JSON.stringify({ captcha: true })
					},
					{
						settingName: 'hostedPaymentShippingAddressOptions',
						settingValue: JSON.stringify({ show: false, required: false })
					},
					{
						settingName: 'hostedPaymentBillingAddressOptions',
						settingValue: JSON.stringify({ show: true, required: true })
					},
					{
						settingName: 'hostedPaymentCustomerOptions',
						settingValue: JSON.stringify({
							showEmail: true,
							requiredEmail: true,
							addPaymentProfile: false
						})
					},
					{
						settingName: 'hostedPaymentOrderOptions',
						settingValue: JSON.stringify({
							show: true,
							merchantName: 'Chinese Collegial Ministry Corp'
						})
					}
				]
			}
		}
	};

	try {
		// Make the API call to Authorize.Net
		const response = await axios.post(AUTHNET_ENDPOINT, requestPayload, {
			headers: {
				'Content-Type': 'application/json'
			},
			timeout: 10000 // 10 seconds timeout
		});

		let data = response.data;

		// Handle potential BOM in response
		if (typeof data === 'string') {
			data = data.replace(/^\uFEFF/, '').trim();
			try {
				data = JSON.parse(data);
			} catch (err) {
				console.error('Invalid JSON from Authorize.Net:', err);
				return json({ error: 'Invalid response from payment gateway' }, { status: 502 });
			}
		}

		if (data?.messages?.resultCode === 'Ok' && data?.token) {
			return json({ token: data.token });
		} else {
			const errorMessages = data?.messages?.message || [];
			const errorText = errorMessages[0]?.text || 'Unknown error';
			console.error('Authorize.Net API Error:', errorText);
			return json({ error: 'Payment gateway error' }, { status: 502 });
		}
	} catch (error) {
		console.error('Payment token request failed:', error);

		if (axios.isAxiosError(error)) {
			return json({ error: 'Unable to process payment' }, { status: 502 });
		}

		return json({ error: 'Payment service unavailable' }, { status: 503 });
	}
};
