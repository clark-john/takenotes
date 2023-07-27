import { retryExchange } from '@urql/exchange-retry';

export const retry = retryExchange({
	initialDelayMs: 1000,
	maxDelayMs: 5000,
	randomDelay: true,
	maxNumberAttempts: 4
});
