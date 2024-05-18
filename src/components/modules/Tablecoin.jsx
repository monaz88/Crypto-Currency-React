import React from "react";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { RotatingLines } from "react-loader-spinner";
import styles from "./Tablecoin.module.css";
import { marketChart } from "../../services/cryptoapi";

function Tablecoin({ Coins, isLoading, setChart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines strokeColor="#5f27cd" strokeWidth="2" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>coin</th>
              <th>name</th>
              <th>price</th>
              <th>24h</th>
              <th>total volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Coins.map((coin) => (
              <TableRow coin={coin} key={coin.id} setChart={setChart} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Tablecoin;

export function TableRow({coin, setChart }) {
  const {
    id,
    name,
    image,
    symbol,
    current_price,
    price_change_percentage_24h,
    total_volume,
  } = coin;
  const showHandler = async () => {
    try {
      const response = await fetch(marketChart(id));
      const json = await response.json();
      setChart({...json,coin:coin});
    } catch (error) {
      setChart(null);
    }
  };
  return (
    <>
      <tr>
        <td>
          <div className={styles.symbol} onClick={showHandler}>
            <img src={image} />
            <span>{symbol.toUpperCase()}</span>
          </div>
        </td>
        <td>{name}</td>
        <td>${current_price.toLocaleString()}</td>
        <td
          className={
            price_change_percentage_24h > 0 ? styles.success : styles.error
          }
        >
          {price_change_percentage_24h.toFixed(2)}%
        </td>
        <td>{total_volume.toLocaleString()}</td>
        <td>
          <img
            src={price_change_percentage_24h > 0 ? chartUp : chartDown}
            alt=""
          />
        </td>
      </tr>
    </>
  );
}
