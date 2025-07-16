import { array, object, string } from "valibot";

export const CurrencySchema = object({
  code: string(),
  name: string(),
});

export const CryptoCurrencyResponseSchema = object({
  CoinInfo: object({
    FullName: string(),
    Name: string(),
  }),
});

export const CryptosCurrenciesResponseSchema = array(
  CryptoCurrencyResponseSchema
);

export const PairSchema = object({
  currency: string(),
  crypto: string(),
});

export const CryptoPriceResponseSchema = object({
  IMAGEURL: string(),
  PRICE: string(),
  HIGHDAY: string(),
  LOWDAY: string(),
  CHANGEPCT24HOUR: string(),
  LASTUPDATE: string(),
});
