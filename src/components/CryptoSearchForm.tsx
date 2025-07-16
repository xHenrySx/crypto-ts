import { useCryptoStore } from "../store";
import { currencies } from "../data";
import { ChangeEvent, FormEvent, useState } from "react";
import { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";

const CryptoSearchForm = () => {
  const cryptoCurrencies = useCryptoStore((state) => state.cryptoCurrencies);
  const fetchData = useCryptoStore((state) => state.fetchData);

  const [pair, setPair] = useState<Pair>({
    currency: "",
    crypto: "",
  });

  const [error, setError] = useState<string>("");

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;

    setPair((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pair.currency.trim() === "" || pair.crypto.trim() === "") {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError("");
    fetchData(pair);
  };

  return (
    <form className="form" onSubmit={onSubmitForm}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="field">
        <label htmlFor="currency">Moneda:</label>
        <select
          name="currency"
          id="currency"
          aria-label="Seleccione una moneda"
          onChange={handleSelectChange}
          value={pair.currency}
        >
          <option value="">-- Seleccione una opción --</option>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="crypto">Criptomoneda:</label>
        <select
          name="crypto"
          id="crypto"
          aria-label="Seleccione una criptomoneda"
          onChange={handleSelectChange}
          value={pair.crypto}
        >
          <option value="">-- Seleccione una opción --</option>
          {cryptoCurrencies.map((crypto) => (
            <option key={crypto.CoinInfo.Name} value={crypto.CoinInfo.Name}>
              {crypto.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" value="Cotizar" />
    </form>
  );
};

export default CryptoSearchForm;
