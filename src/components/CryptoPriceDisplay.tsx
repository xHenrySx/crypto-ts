import { useMemo } from "react";
import { useCryptoStore } from "../store";
import Spinner from "./Spinner";

const CryptoPriceDisplay = () => {
  const cryptoPrice = useCryptoStore((state) => state.cryptoPrice);
  const loading = useCryptoStore((state) => state.loading);

  const hasPrice = useMemo(
    () => !Object.values(cryptoPrice).includes(""),
    [cryptoPrice]
  );

  if (!hasPrice) {
    return null;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="result-container">
      <h2>Cotización</h2>
      <div className="result">
        <img
          src={`https://www.cryptocompare.com${cryptoPrice.IMAGEURL}`}
          alt={`Imagen de ${cryptoPrice.PRICE}`}
        />
        <div>
          <p>
            El precio es de: <span>{cryptoPrice.PRICE}</span>
          </p>
          <p>
            El precio más alto del día es de: <span>{cryptoPrice.HIGHDAY}</span>
          </p>
          <p>
            El precio más bajo del día es de: <span>{cryptoPrice.LOWDAY}</span>
          </p>
          <p>
            El cambio en las últimas 24 horas es de:{" "}
            <span>{cryptoPrice.CHANGEPCT24HOUR}</span>
          </p>
          <p>
            Última actualización: <span>{cryptoPrice.LASTUPDATE}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoPriceDisplay;
