import { fireEvent, render } from "@testing-library/react";
import React from "react";

import CurrencyPicker from "../CurrencyPicker";

describe("<CurrencyPicker />", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <CurrencyPicker from="USD" to="JPY" onFromChange={() => {}} onToChange={() => {}}  />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should invoke callbacks when selecting different values", async () => {
    const onFromChangeMock = jest.fn();
    const onToChangeMock = jest.fn();

    const { findByTestId } = render(
      <CurrencyPicker from="USD" to="JPY" onFromChange={onFromChangeMock} onToChange={onToChangeMock}  />
    );

    fireEvent.change(await findByTestId("currency-picker-from"), { target: { value: "JPY" } })
    fireEvent.change(await findByTestId("currency-picker-to"), { target: { value: "USD" } })

    expect(onFromChangeMock).toHaveBeenCalledWith("JPY");
    expect(onToChangeMock).toHaveBeenCalledWith("USD");
  });

  it("should reverse props values when clicking the reverse button", async () => {
    const onFromChangeMock = jest.fn();
    const onToChangeMock = jest.fn();

    const { findByTestId } = render(
      <CurrencyPicker from="USD" to="JPY" onFromChange={onFromChangeMock} onToChange={onToChangeMock}  />
    );

    fireEvent.click(await findByTestId("currency-picker-reverse"));

    expect(onFromChangeMock).toHaveBeenCalledWith("JPY");
    expect(onToChangeMock).toHaveBeenCalledWith("USD");
  });
});
