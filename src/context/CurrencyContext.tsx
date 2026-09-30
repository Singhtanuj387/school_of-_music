"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  CurrencyCode,
  CurrencyConfig,
  SUPPORTED_CURRENCIES,
  DEFAULT_CURRENCY,
  CURRENCY_COOKIE_NAME,
  convertCoursePrice,
  ConvertedPriceResult,
  detectBrowserCurrency,
} from "@/lib/currency";

interface CurrencyContextValue {
  currency: CurrencyCode;
  currencyConfig: CurrencyConfig;
  setCurrency: (code: CurrencyCode) => void;
  convertPrice: (
    priceMinorUnitsINR: number,
    options?: { roundToWhole?: boolean }
  ) => ConvertedPriceResult;
  isInternational: boolean;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export function CurrencyProvider({
  children,
  initialCurrency,
}: {
  children: React.ReactNode;
  initialCurrency?: CurrencyCode;
}) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(
    initialCurrency || DEFAULT_CURRENCY
  );

  useEffect(() => {
    // 1. Check if user already chose a preference in localStorage
    try {
      const stored = localStorage.getItem(CURRENCY_COOKIE_NAME) as CurrencyCode | null;
      if (stored && SUPPORTED_CURRENCIES[stored]) {
        setCurrencyState(stored);
        return;
      }
    } catch {
      // LocalStorage unavailable
    }

    // 2. If no initial currency was provided by server (or server defaulted to INR)
    // and no localStorage preference exists, run auto-detection
    if (!initialCurrency || initialCurrency === DEFAULT_CURRENCY) {
      const detected = detectBrowserCurrency();
      if (detected !== currency) {
        setCurrencyState(detected);
        // Persist detected currency
        try {
          document.cookie = `${CURRENCY_COOKIE_NAME}=${detected}; path=/; max-age=31536000; SameSite=Lax`;
          localStorage.setItem(CURRENCY_COOKIE_NAME, detected);
        } catch {
          // Ignore
        }
      }
    }
  }, [initialCurrency]);

  const setCurrency = useCallback((newCode: CurrencyCode) => {
    if (!SUPPORTED_CURRENCIES[newCode]) return;
    setCurrencyState(newCode);

    try {
      document.cookie = `${CURRENCY_COOKIE_NAME}=${newCode}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem(CURRENCY_COOKIE_NAME, newCode);
    } catch {
      // Ignore
    }
  }, []);

  const convertPrice = useCallback(
    (priceMinorUnitsINR: number, options?: { roundToWhole?: boolean }) => {
      return convertCoursePrice(priceMinorUnitsINR, currency, options);
    },
    [currency]
  );

  const currencyConfig = useMemo(
    () => SUPPORTED_CURRENCIES[currency] || SUPPORTED_CURRENCIES.INR,
    [currency]
  );

  const isInternational = currency !== "INR";

  const value = useMemo(
    () => ({
      currency,
      currencyConfig,
      setCurrency,
      convertPrice,
      isInternational,
    }),
    [currency, currencyConfig, setCurrency, convertPrice, isInternational]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Safe fallback if used outside CurrencyProvider
    const fallbackConfig = SUPPORTED_CURRENCIES.INR;
    return {
      currency: "INR",
      currencyConfig: fallbackConfig,
      setCurrency: () => {},
      convertPrice: (priceMinorUnitsINR: number, options?: { roundToWhole?: boolean }) =>
        convertCoursePrice(priceMinorUnitsINR, "INR", options),
      isInternational: false,
    };
  }
  return context;
}
