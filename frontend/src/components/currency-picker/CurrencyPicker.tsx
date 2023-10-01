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
  from: string;
  to: string;
  onFromChange: (currency: string) => void;
  onToChange: (currency: string) => void;
};

const CurrencyPicker = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <span className={styles.labelText}>From</span>
        <select
          className={styles.select}
          data-testid="currency-picker-from"
          value={props.from}
          onChange={(event) => props.onFromChange(event.target.value)}
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
          props.onFromChange(props.to);
          props.onToChange(props.from);
        }}
      />
      <label className={styles.label}>
        <span className={styles.labelText}>To</span>
        <select
          className={styles.select}
          data-testid="currency-picker-to"
          value={props.to}
          onChange={(event) => props.onToChange(event.target.value)}
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
