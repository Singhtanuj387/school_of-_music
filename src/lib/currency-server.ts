import { cookies, headers } from "next/headers";
import {
  CurrencyCode,
  countryCodeToCurrency,
  DEFAULT_CURRENCY,
  CURRENCY_COOKIE_NAME,
  SUPPORTED_CURRENCIES,
} from "./currency";

/**
 * Server-side helper to determine visitor currency from cookies or geo headers (Cloudflare, Vercel).
 */
export async function getServerCurrency(): Promise<CurrencyCode> {
  try {
    const cookieStore = await cookies();
    const saved = cookieStore.get(CURRENCY_COOKIE_NAME)?.value as CurrencyCode | undefined;
    if (saved && SUPPORTED_CURRENCIES[saved]) {
      return saved;
    }

    const reqHeaders = await headers();
    const country =
      reqHeaders.get("cf-ipcountry") ||
      reqHeaders.get("x-vercel-ip-country") ||
      reqHeaders.get("x-country-code");

    if (country) {
      return countryCodeToCurrency(country);
    }
  } catch {
    // Headers / cookies not available in static prerender
  }

  return DEFAULT_CURRENCY;
}
