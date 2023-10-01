import React from "react";
import { createRoot } from "react-dom/client";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <main>
      <HomeScreen />
    </main>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);
