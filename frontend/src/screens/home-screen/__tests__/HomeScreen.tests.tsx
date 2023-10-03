import { render, waitFor } from "@testing-library/react";
import React from "react";
import HomeScreen from "../HomeScreen";

(global as any).fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        start: "2023-09-26",
        end: "2023-09-30",
        from: "USD",
        to: "JPY",
        gainLossPercentage: -0.032,
        data: [
          {
            date: "2023-09-30",
            rate: 149.235416,
          },
          {
            date: "2023-09-29",
            rate: 149.235416,
          },
          {
            date: "2023-09-28",
            rate: 149.283613,
          },
        ],
      }),
  }),
);

// Used by Chart.js
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("<HomeScreen />", () => {
  it("should render correctly with a gain percentage", async () => {
    const { asFragment } = render(<HomeScreen />);

    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
