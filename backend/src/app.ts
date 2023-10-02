import bodyParser from "body-parser";
import express from "express";

import data from "./data";

const app = express();

app.use(bodyParser.json());

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

  const startTimestamp = new Date(start.toString()).getTime();
  const endTimestamp = new Date(end.toString()).getTime();

  const processedData = data.reduce((acc: { date: string; rate: number }[], item) => {
    const timestamp = new Date(item.date).getTime();

    if (timestamp >= startTimestamp && timestamp <= endTimestamp) {
      acc.push({
        date: item.date,
        rate: item.quotes[`${fromUpperCase}${toUpperCase}`],
      });
    }

    return acc;
  }, []);

  const endRate = processedData[processedData.length - 1].rate;
  const startRate = processedData[0].rate;

  // Round to the nearest thousandth decimal
  // 100,000 is just 100 (for %) * 1000 (for dividing to 1000)
  // e is for exponent, 1e3 means 1000 etc
  const gainLossPercentage = Math.round(((startRate - endRate) / endRate) * 1e5) / 1e3;

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
