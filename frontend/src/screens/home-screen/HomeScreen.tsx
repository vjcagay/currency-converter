import React, { useState } from "react";
import CurrencyPicker from "../../components/currency-picker/CurrencyPicker";
import DatePicker from "../../components/date-picker/DatePicker";
import styles from "./styles.module.css";

const HomeScreen = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("JPY");

  const [fromDate, setFromDate] = useState("2023-10-03");
  const [toDate, setToDate] = useState("2023-10-10");

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
    </>
  );
};

export default HomeScreen;
