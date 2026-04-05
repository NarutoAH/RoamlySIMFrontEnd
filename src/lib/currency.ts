// Currency conversion config
// TODO: Replace with real-time API (e.g., exchangerate-api.com) in production
export const EXCHANGE_RATES = {
  USD: 1,
  PKR: 285,
} as const;

export type Currency = keyof typeof EXCHANGE_RATES;

export function convertToLocal(priceUsd: number, currency: Currency): number {
  return Math.round(priceUsd * EXCHANGE_RATES[currency]);
}

export function formatPrice(priceUsd: number, currency: Currency): string {
  const converted = convertToLocal(priceUsd, currency);
  if (currency === "PKR") {
    return `PKR ${converted.toLocaleString()}`;
  }
  return `$${priceUsd.toFixed(2)}`;
}
