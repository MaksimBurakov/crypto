import type { ExchangeRateParams } from './apiTypes';

export const fetchExchangeRate = async ({
  from,
  to,
  amount,
}: ExchangeRateParams) => {
  if (!from || !to || amount <= 0) return null;

  const response = await fetch(
    `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&access_key=${
      import.meta.env.VITE_EXCHANGE_RATE_KEY
    }`
  );
  const data = await response.json();
  return data.result;
};
