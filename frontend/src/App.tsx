import React from "react";
import { createRoot } from "react-dom/client";
import { createGlobalStyle } from "styled-components";

import HomeScreen from "./screens/HomeScreen";

const GlobalStyle = createGlobalStyle`
  :root {
    --blue: #2760f4;
    --white: #ffffff;
    --grey-300: #d0d5dd;
    --grey-500: #667085;
    --grey-700: #344054;
    --grey-950: #0c111d;
    --success-dark: #099d5f;
    --padding-default: 8px;
    --padding-small: 4px;
    --margin-default: 8px;
    --margin-small: 4px;
  }

  body {
    background: var(--white);
    color: var(--grey-950);
    padding: 40px;
  }

  main {
    max-width: 960px;
    margin: auto;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <main>
        <HomeScreen />
      </main>
    </>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);
