import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import data from "./data";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/history", (req, res) => {
  const { from, to, start, end } = req.query;

  if (!from || !to || !start || !end) {
    res.statusCode = 400;
    res.json({
      message: "There are missing parameters. Please check your request.",
    });
    return;
  }

  if (Array.isArray(from) || Array.isArray(to) || Array.isArray(start) || Array.isArray(end)) {
    res.statusCode = 400;
    res.json({
      message: "Parameters can only accept one value at a time. Please check your request.",
    });
    return;
  }

  const dateRegex = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/;

  if (!dateRegex.test(start.toString()) || !dateRegex.test(end.toString())) {
    res.statusCode = 400;
    res.json({
      message: "Date format incorrect. Please check your request.",
    });
    return;
  }

  const startTimestamp = new Date(start.toString()).getTime();
  const endTimestamp = new Date(end.toString()).getTime();

  if (startTimestamp > endTimestamp) {
    res.statusCode = 400;
    res.json({
      message: "Start date should not be greater than end date. Please check your request.",
    });
    return;
  }

  const supportedCurrencies = ["USD", "SGD", "JPY", "EUR"];
  const fromUpperCase = from.toString().toUpperCase();
  const toUpperCase = to.toString().toUpperCase();

  if (!supportedCurrencies.includes(fromUpperCase) || !supportedCurrencies.includes(toUpperCase)) {
    res.statusCode = 400;
    res.json({
      message: "Unsupported currency. Please check your request.",
    });
    return;
  }

  const processedData = data.reduce((acc: { date: string; rate: number }[], item) => {
    const timestamp = new Date(item.date).getTime();

    if (timestamp >= startTimestamp && timestamp <= endTimestamp) {
      let rate = 0;

      if (fromUpperCase === toUpperCase) {
        rate = 1;
      }

      if (fromUpperCase === "USD" && toUpperCase !== "USD") {
        rate = item.quotes[`USD${toUpperCase}`];
      }

      if (fromUpperCase !== "USD" && toUpperCase === "USD") {
        // e is for exponent, 1e3 means 1000
        rate = Math.round((1 / item.quotes[`USD${fromUpperCase}`]) * 1e6) / 1e6;
      }

      // Rate calculations will use USD as the base
      if (fromUpperCase !== "USD" && toUpperCase !== "USD") {
        const fromRate = item.quotes[`USD${fromUpperCase}`];
        const toRate = item.quotes[`USD${toUpperCase}`];
        rate = Math.round((toRate / fromRate) * 1e6) / 1e6;
      }

      acc.push({
        date: item.date,
        rate,
      });
    }

    return acc;
  }, []);

  let gainLossPercentage = 0;

  if (fromUpperCase !== toUpperCase) {
    const endRate = processedData[processedData.length - 1].rate;
    const startRate = processedData[0].rate;
    // Round to the nearest thousandth decimal
    // 100,000 is just 100 (for %) * 1000 (for dividing to 1000)
    gainLossPercentage = Math.round(((startRate - endRate) / endRate) * 1e5) / 1e3;
  }

  res.json({
    start,
    end,
    from: fromUpperCase,
    to: toUpperCase,
    gainLossPercentage,
    data: processedData,
  });
});

// Routes not matching any of the above will be 404s
app.all("*", (_, res) => {
  res.statusCode = 404;
  res.json({ message: "Invalid route." });
});

export default app;
