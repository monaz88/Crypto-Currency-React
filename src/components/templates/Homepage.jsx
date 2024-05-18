import React from "react";
import { useEffect, useState } from "react";
import TableCoin from "../modules/Tablecoin";
import { getCoinList } from "../../services/cryptoapi";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

function HomePage() {
  const [Coin, setCoin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(getCoinList(page, currency));
        const data = await response.json();
        setCoin(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:");
      }
    };

    fetchData();
  }, [page, currency]);
  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin Coins={Coin} isLoading={isLoading} setChart={setChart} />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </div>
  );
}

export default HomePage;
