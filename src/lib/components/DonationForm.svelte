<script lang="ts">
	import { tick } from 'svelte';
	import axios from 'axios';

	import { page } from '$app/state';
	$: lang = page.params.lang;

	let isLoading = false;
	let token = '';
	let amountInput: string = '10.00';
	let amount: number = 10.0;
	let formElement: HTMLFormElement;

	interface TokenResponse {
		token: string;
		error?: string;
	}

	async function processPayment() {
		isLoading = true;

		try {
			const response = await axios.post('/api/get-payment-token', { lang, amount });

			const data: TokenResponse = response.data;

			if (data && data.token) {
				token = data.token;

				await tick();

				formElement.submit();
			} else {
				throw new Error(data.error || 'Unable to obtain a valid payment token from the server.');
			}
		} catch (error) {
			console.error('Payment preparation failed:', error);

			if (axios.isAxiosError(error)) {
				alert(`Payment Failed: ${error.response?.data?.message || error.message}`);
			} else {
				alert('Payment preparation failed, please try again later or contact support.');
			}
		} finally {
			isLoading = false;
		}
	}

	function onAmountInput(e: Event) {
		const target = e.target as HTMLInputElement;
		let v = target.value || '';

		// remove invalid chars, allow only digits and dot
		v = v.replace(/[^0-9.]/g, '');

		// keep only first dot and limit decimals to 2
		const parts = v.split('.');
		console.log(parts);
		if (parts.length > 1) {
			const intPart = parts.shift() || '0';
			const decPart = parts.join('').slice(0, 2);
			v = `${intPart}.${decPart}`;
		}

		// normalize leading dot
		if (v.startsWith('.')) v = '0' + v;

		// avoid multiple leading zeros like "00"
		if (/^0[0-9]/.test(v)) v = String(parseInt(v, 10));

		amountInput = v;
		amount = parseFloat(v || '0') || 0;
	}

	function onAmountBlur() {
		// ensure two decimals on blur
		const n = parseFloat(amountInput || '0') || 0;
		amount = Math.round(n * 100) / 100;
		amountInput = amount.toFixed(2);
	}

	// Use 'https://test.authorize.net/payment/payment' for sandbox testing
	// Use https://accept.authorize.net/payment/payment for production
	const AUTHNET_PAYMENT_URL = 'https://accept.authorize.net/payment/payment';
</script>

<div
	class="mx-auto mt-2 max-w-md rounded-lg border border-gray-300 bg-white p-6 text-center shadow-lg"
>
	<form bind:this={formElement} action={AUTHNET_PAYMENT_URL} method="post">
		<input type="hidden" name="token" bind:value={token} />
		<input type="hidden" name="amount" value={amount.toFixed(2)} />

		<label for="donation-amount" class="mb-1 block text-sm font-medium text-gray-700">
			Amount (USD)
		</label>

		<input
			id="donation-amount"
			type="text"
			inputmode="decimal"
			bind:value={amountInput}
			on:input={onAmountInput}
			on:blur={onAmountBlur}
			class="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-center focus:ring-2 focus:ring-[rgb(var(--website-theme-color2))] focus:outline-none"
			placeholder="10.00"
		/>

		<button
			type="button"
			on:click={processPayment}
			disabled={isLoading}
			class="w-full rounded-md bg-[rgb(var(--website-theme-color1))] px-6 py-3 text-lg font-medium text-white transition-colors duration-200 hover:opacity-95 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
		>
			{#if lang === 'zh-Hans'}
				{isLoading ? '处理中...' : '捐赠'}
			{:else}
				{isLoading ? 'Processing...' : 'Donate'}
			{/if}
		</button>
	</form>
</div>
