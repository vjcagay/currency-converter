import React from "react";
import styles from "./styles.module.css";

const currencies = [
  {
    label: "🇺🇸 USD - US Dollar",
    ticker: "USD",
  },
  {
    label: "🇸🇬 SGD - Singapore Dollar",
    ticker: "SGD",
  },
  {
    label: "🇯🇵 JPY - Japanese Yen",
    ticker: "JPY",
  },
  {
    label: "🇪🇺 EUR - Euro",
    ticker: "EUR",
  },
];

type Props = {
  className?: string;
  from: string;
  to: string;
  onChange: (rate: { from: string; to: string }) => void;
};

const CurrencyPicker = (props: Props) => {
  return (
    <div className={`${styles.wrapper} ${props.className || ""}`}>
      <label className={styles.label}>
        <span className={styles.labelText}>From</span>
        <select
          className={styles.select}
          data-testid="currency-picker-from"
          value={props.from}
          onChange={(event) => {
            props.onChange({ from: event.target.value, to: props.to });
          }}
        >
          {currencies.map((currency) => (
            <option key={currency.ticker} value={currency.ticker}>
              {currency.label}
            </option>
          ))}
        </select>
      </label>
      <button
        data-testid="currency-picker-reverse"
        className={styles.button}
        onClick={() => {
          props.onChange({ from: props.to, to: props.from });
        }}
      />
      <label className={styles.label}>
        <span className={styles.labelText}>To</span>
        <select
          className={styles.select}
          data-testid="currency-picker-to"
          value={props.to}
          onChange={(event) => {
            props.onChange({ from: props.from, to: event.target.value });
          }}
        >
          {currencies.map((currency) => (
            <option key={currency.ticker} value={currency.ticker}>
              {currency.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default CurrencyPicker;
