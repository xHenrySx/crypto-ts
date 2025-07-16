import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CryptoCurrency, CryptoPrice, Pair } from "./types";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoServices";

type CryptoStore = {
  cryptoCurrencies: CryptoCurrency[];
  cryptoPrice: CryptoPrice;
  loading: boolean;
  fetchCrypto: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
  devtools((set) => ({
    loading: false,
    cryptoCurrencies: [],
    cryptoPrice: {
      PRICE: "",
      LOWDAY: "",
      HIGHDAY: "",
      CHANGEPCT24HOUR: "",
      IMAGEURL: "",
      LASTUPDATE: "",
    },
    fetchCrypto: async () => {
      const cryptoCurrencies = await getCryptos();
      set(() => ({
        cryptoCurrencies: cryptoCurrencies,
      }));
    },

    fetchData: async (pair: Pair) => {
      set(() => ({ loading: true }));
      const cryptoPrice = await fetchCurrentCryptoPrice(pair);
      set(() => ({
        cryptoPrice: cryptoPrice,
        loading: false,
      }));
    },
  }))
);
