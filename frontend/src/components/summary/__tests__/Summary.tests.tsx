import { render } from "@testing-library/react";
import React from "react";
import Summary from "../Summary";

describe("<Summary />", () => {
  it("should render correctly with a gain percentage", () => {
    const { asFragment } = render(
      <Summary from="USD" to="JPY" firstRateValue={146.942966} lastRateValue={147.470418} rangeString="1W" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with a loss percentage", () => {
    const { asFragment } = render(
      <Summary from="USD" to="JPY" firstRateValue={147.470418} lastRateValue={146.942966} rangeString="1W" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
