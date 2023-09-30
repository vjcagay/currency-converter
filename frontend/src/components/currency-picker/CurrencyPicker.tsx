import React from "react";
import styled from "styled-components";

import Arrows from "./assets/arrows.svg";
import Chevron from "./assets/chevron.svg";

const Wrapper = styled.div`
  fieldset {
    margin: 0;
    padding: 0;
    border: 0;
    position: relative;
  }

  label {
    span {
      display: block;
      color: var(--grey-950);
      font-size: .75rem;
      margin-bottom: var(--margin-small);
    }

    &::after {
      content: "";
      background-image: url(${Chevron});
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }

  select {
    display: block;
    appearance: none;
    color: inherit;
    background: transparent;
    border: 1px solid var(--grey-300);
    border-radius: 4px;
    padding: var(--padding-default);
    width: 100%;
    height: 40px;
  }

  button {
    appearance: none;
    width: 40px;
    height: 40px;
    background-image: url(${Arrows});
    border: 0;
    border-radius: 50%;
    cursor: pointer;
    margin: var(--margin-small) 0;
  }

  @media screen and (min-width: 640px) {
    & {
      display: grid;
      grid-template-columns: 1fr 40px 1fr;
      align-items: end;
      column-gap: 16px;
    }

    button {
      margin: 0;
    }
  }
`;

const currencies = [{
  label: "🇺🇸 USD - US Dollar",
  ticker: "USD",
}, {
  label: "🇸🇬 SGD - Singapore Dollar",
  ticker: "SGD",
}, {
  label: "🇯🇵 JPY - Japanese Yen",
  ticker: "JPY",
}, {
  label: "🇪🇺 EUR - Euro",
  ticker: "EUR",
},]

type Props = {
  from: string;
  to: string;
  onFromChange: (currency: string) => void;
  onToChange: (currency: string) => void;
}

const CurrencyPicker = (props: Props) => {
  return (
    <Wrapper>
      <fieldset>
        <label>
          <span>From</span>
          <select
            data-testid="currency-picker-from"
            value={props.from}
            onChange={(event) => props.onFromChange(event.target.value)}
          >
            {currencies.map(currency => (
              <option key={currency.ticker} value={currency.ticker}>{currency.label}</option>
            ))}
          </select>
        </label>
      </fieldset>
      <button data-testid="currency-picker-reverse" onClick={() => {
        props.onFromChange(props.to);
        props.onToChange(props.from);
      }} />
      <fieldset>
        <label>
          <span>To</span>
          <select
            data-testid="currency-picker-to"
            value={props.to}
            onChange={(event) => props.onToChange(event.target.value)}
          >
            {currencies.map(currency => (
              <option key={currency.ticker} value={currency.ticker}>{currency.label}</option>
            ))}
          </select>
        </label>
      </fieldset>
    </Wrapper>
  );
};

export default CurrencyPicker;
