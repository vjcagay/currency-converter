import { fireEvent, render } from "@testing-library/react";
import React from "react";
import CurrencyPicker from "../CurrencyPicker";

describe("<CurrencyPicker />", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<CurrencyPicker from="USD" to="JPY" onChange={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should invoke callbacks when selecting different values", async () => {
    const onChangeMock = jest.fn();

    const { findByTestId, rerender } = render(<CurrencyPicker from="USD" to="JPY" onChange={onChangeMock} />);
    fireEvent.change(await findByTestId("currency-picker-from"), { target: { value: "JPY" } });
    expect(onChangeMock).toHaveBeenCalledWith({ from: "JPY", to: "JPY" });

    rerender(<CurrencyPicker from="JPY" to="JPY" onChange={onChangeMock} />);
    fireEvent.change(await findByTestId("currency-picker-to"), { target: { value: "USD" } });
    expect(onChangeMock).toHaveBeenCalledWith({ from: "JPY", to: "USD" });
  });

  it("should reverse props values when clicking the reverse button", async () => {
    const onChangeMock = jest.fn();

    const { findByTestId } = render(<CurrencyPicker from="USD" to="JPY" onChange={onChangeMock} />);

    fireEvent.click(await findByTestId("currency-picker-reverse"));

    expect(onChangeMock).toHaveBeenCalledWith({ from: "JPY", to: "USD" });
  });
});
