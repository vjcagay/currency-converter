import { render } from "@testing-library/react";
import React from "react";
import LineGraph from "../LineGraph";

// Used by Chart.js
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("<LineGraph />", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<LineGraph labels={["A", "B", "C"]} datasets={[{ data: [1, 2, 3] }]} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
