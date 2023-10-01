import React from "react";
import styles from "./styles.module.css";

type Props = {
  className?: string;
  from: string;
  to: string;
  firstRateValue: number;
  lastRateValue: number;
  rangeString?: string;
};

const currencyTickerNames: { [key: string]: string } = {
  USD: "US Dollar",
  SGD: "Singapore Dollar",
  JPY: "Japanese Yen",
  EUR: "Euro",
};

const GainLossPercentage = (props: { value1: number; value2: number }) => {
  const gainLoss = ((props.value2 - props.value1) / props.value2) * 100;
  const isPositive = gainLoss > 0;

  const result = `${isPositive ? "+" : ""}${gainLoss.toFixed(3)}%`;

  return <span className={`${styles.gainLossText} ${isPositive ? styles.gain : styles.loss}`}>{result}</span>;
};

const Summary = (props: Props) => {
  return (
    <div className={`${styles.wrapper} ${props.className || ""}`}>
      <b className={styles.titleText}>
        {props.from} to {props.to} Chart
      </b>
      <wbr />
      &nbsp;
      <GainLossPercentage value1={props.firstRateValue} value2={props.lastRateValue} />
      &nbsp;
      {props.rangeString && <span className={styles.rangeText}>({props.rangeString})</span>}
      <br />
      <small>
        {currencyTickerNames[props.from]} to {currencyTickerNames[props.to]}
      </small>
    </div>
  );
};

export default Summary;
