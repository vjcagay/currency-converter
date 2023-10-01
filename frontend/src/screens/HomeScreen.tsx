import React, { useState } from "react";
import CurrencyPicker from "../components/currency-picker/CurrencyPicker";

const HomeScreen = () => {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("JPY");

  return (
    <>
      <CurrencyPicker from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
    </>
  );
};

export default HomeScreen;
