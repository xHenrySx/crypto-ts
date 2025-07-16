import { InferInput } from "valibot";
import {
  CryptoCurrencyResponseSchema,
  CryptoPriceResponseSchema,
  CurrencySchema,
  PairSchema,
} from "../schemas/crypto-schema";

export type Currency = InferInput<typeof CurrencySchema>;

export type CryptoCurrency = InferInput<typeof CryptoCurrencyResponseSchema>;

export type Pair = InferInput<typeof PairSchema>;

export type CryptoPrice = InferInput<typeof CryptoPriceResponseSchema>;
