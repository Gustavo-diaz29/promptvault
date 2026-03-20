import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type CurrencyCodes = 'USD' | 'EUR' | 'GBP' | 'MXN' | 'COP';

interface Currency {
  code: CurrencyCodes;
  symbol: string;
  rate: number; // Base USD
}

const currencies: Record<CurrencyCodes, Currency> = {
  USD: { code: 'USD', symbol: '$', rate: 1 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
  MXN: { code: 'MXN', symbol: '$', rate: 16.70 },
  COP: { code: 'COP', symbol: '$', rate: 3900 },
};

interface CurrencyContextType {
  currency: Currency;
  setCurrencyCode: (code: CurrencyCodes) => void;
  formatPrice: (priceInUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCodes>(() => {
    const saved = localStorage.getItem('promptvault_currency');
    return (saved as CurrencyCodes) || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('promptvault_currency', currencyCode);
  }, [currencyCode]);

  const currency = currencies[currencyCode];

  const formatPrice = (priceInUSD: number) => {
    if (priceInUSD === 0) return 'Free';
    const converted = priceInUSD * currency.rate;
    
    // For large numbers like COP, we don't need decimals as much
    const fractionDigits = currencyCode === 'COP' ? 0 : 2;
    
    return `${currency.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    })} ${currency.code !== 'USD' ? currency.code : ''}`.trim();
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrencyCode, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
