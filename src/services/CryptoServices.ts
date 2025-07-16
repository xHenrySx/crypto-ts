import axios from "axios";
import { safeParse } from "valibot";
import {
  CryptoPriceResponseSchema,
  CryptosCurrenciesResponseSchema,
} from "../schemas/crypto-schema";
import { Pair } from "../types";

export async function getCryptos() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";

  const {
    data: { Data },
  } = await axios(url);

  const result = safeParse(CryptosCurrenciesResponseSchema, Data);

  if (result.success) {
    return result.output;
  } else {
    throw new Error("Error al obtener las criptomonedas");
  }
}

export async function fetchCurrentCryptoPrice(pair: Pair) {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.crypto}&tsyms=${pair.currency}`;

  const {
    data: { DISPLAY },
  } = await axios(url);

  const result = safeParse(
    DISPLAY[pair.crypto][pair.currency],
    CryptoPriceResponseSchema
  );

  if (result.success) {
    return result.output;
  } else {
    throw new Error("Error al obtener el precio de la criptomoneda");
  }
}
