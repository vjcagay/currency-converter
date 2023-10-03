import React, { useEffect, useState } from "react";
import CurrencyPicker from "../../components/currency-picker/CurrencyPicker";
import DatePicker from "../../components/date-picker/DatePicker";
import LineGraph from "../../components/line-graph/LineGraph";
import Summary from "../../components/summary/Summary";
import styles from "./styles.module.css";

type FetchResponseJSON = {
  start: string;
  end: string;
  from: string;
  to: string;
  gainLossPercentage: number;
  data: { date: string; rate: string }[];
};

const HomeScreen = () => {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("JPY");

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [dates, setDates] = useState<string[]>([]);
  const [rates, setRates] = useState<number[]>([]);

  const [presetRange, setPresetRange] = useState("1W");
  const [gainLoss, setGainLoss] = useState(0);

  useEffect(() => {
    if (from && to && start && end) {
      fetch(`http://localhost:8081/history?from=${from}&to=${to}&start=${start}&end=${end}`)
        .then((results) => {
          return results.json();
        })
        .then((json: FetchResponseJSON) => {
          const { dates, rates } = json.data.reduce(
            (acc, item) => {
              acc.dates.push(item.date);
              acc.rates.push(item.rate);

              return acc;
            },
            { dates: [], rates: [] },
          );

          setDates(dates);
          setRates(rates);
          setGainLoss(json.gainLossPercentage);
        });
    }
  }, [from, to, start, end]);

  return (
    <>
      <CurrencyPicker
        className={styles.currencyPicker}
        from={from}
        to={to}
        onChange={(value) => {
          setFrom(value.from);
          setTo(value.to);
        }}
      />
      <Summary className={styles.summary} from={from} to={to} gainLossPercentage={gainLoss} rangeString={presetRange} />
      <DatePicker
        className={styles.datePicker}
        start={start}
        end={end}
        onChange={(value, rangeName) => {
          setStart(value.start);
          setEnd(value.end);
          setPresetRange(rangeName);
        }}
      />
      <LineGraph
        labels={dates}
        datasets={[
          {
            label: "Exchange Rate",
            data: rates,
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
