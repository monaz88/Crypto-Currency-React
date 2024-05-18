import React, { useState } from "react";
import styles from "./Chart.module.css";
import { ConvertData } from "../../Helpers/ConvertData";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");
  console.log(chart);

  const typeHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      const type = e.target.innerText.toLowerCase();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
      <div className={styles.name}>
          <img className={chart.coin.image} />
          <p>{chart.coin.name}</p>
        </div>
      <div className={styles.graph}>
          <CharComponent data={ConvertData(chart, type)} type={type} />
        </div>
        <div className={styles.types} onClick={typeHandler}>
        <button className={type === "prices" ? styles.selected : null}>
            prices:
          </button>
          <button className={type === "market_caps" ? styles.selected : null}>
            market Caps:
          </button>
          <button className={type === "total_volumes" ? styles.selected : null}>
            total Volumes:
          </button>
        </div>




        <img className={chart.coin.image} />
        <div className={styles.details}>
          <div>
            <p>prices:</p>
            <span>${chart.coin.currency_price}</span>
          </div>
          <div>
            <p>ATH:</p>
            <span>${chart.coin.ath}</span>
          </div>
          <div>
            <p>market cap:</p>
            <span>{chart.coin.market_cap}</span>
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default Chart;
const CharComponent = ({ data, type }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={400} height={400} data={data}>
          <Line
            type={"monotone"}
            dataKey={type}
            stroke="#8884d8"
            strokeWidth="2px"
          />
          <CartesianGrid stroke="#404042" />
          <YAxis dataKey={type} domain={["auto", "auto"]} />
          <XAxis dataKey="data" hide />
          <Legend />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
