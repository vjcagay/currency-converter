import React, { useEffect, useState } from "react";
import CurrencyPicker from "../../components/currency-picker/CurrencyPicker";
import DatePicker from "../../components/date-picker/DatePicker";
import LineGraph from "../../components/line-graph/LineGraph";
import styles from "./styles.module.css";

const HomeScreen = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("JPY");

  const [fromDate, setFromDate] = useState("2023-10-03");
  const [toDate, setToDate] = useState("2023-10-10");

  const [dates, setDates] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    setDates(["2023-09-24", "2023-09-25", "2023-09-26", "2023-09-27", "2023-09-28", "2023-09-29", "2023-09-30"]);

    setData([148.27651, 148.669237, 148.863744, 149.202733, 149.283613, 149.235416, 149.235416]);
  }, []);

  return (
    <>
      <CurrencyPicker
        className={styles.currencyPicker}
        from={fromCurrency}
        to={toCurrency}
        onChange={(value) => {
          setFromCurrency(value.from);
          setToCurrency(value.to);
        }}
      />
      <DatePicker
        className={styles.datePicker}
        from={fromDate}
        to={toDate}
        onChange={(value) => {
          setFromDate(value.from);
          setToDate(value.to);
        }}
      />
      <LineGraph
        labels={dates}
        datasets={[
          {
            label: "Exchange Rate",
            data,
            borderColor: "#0171eb",
            backgroundColor: "#0171eb",
            tension: 0.2,
          },
        ]}
      />
    </>
  );
};

export default HomeScreen;
