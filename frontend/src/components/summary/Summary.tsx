import React from "react";
import styles from "./styles.module.css";

type Props = {
  className?: string;
  from: string;
  to: string;
  gainLossPercentage: number;
  rangeString?: string;
};

const currencyTickerNames: { [key: string]: string } = {
  USD: "US Dollar",
  SGD: "Singapore Dollar",
  JPY: "Japanese Yen",
  EUR: "Euro",
};

const Summary = (props: Props) => {
  return (
    <div className={`${styles.wrapper} ${props.className || ""}`}>
      <b className={styles.titleText}>
        {props.from} to {props.to} Chart
      </b>
      <wbr />
      &nbsp;
      <span className={`${styles.gainLossText} ${props.gainLossPercentage >= 0 ? styles.gain : styles.loss}`}>
        {`${props.gainLossPercentage >= 0 ? "+" : ""}${props.gainLossPercentage}`}%
      </span>
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
