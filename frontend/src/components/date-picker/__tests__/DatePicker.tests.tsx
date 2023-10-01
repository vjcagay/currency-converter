import { fireEvent, render } from "@testing-library/react";
import React from "react";
import DatePicker from "../DatePicker";

// When selecting the preset ranges, DatePicker selects the current date as the `to` value
// Since we are mocking the Date object, `to` will be 2023 Oct 10.
jest.useFakeTimers();
jest.setSystemTime(new Date("2023-10-10").getTime());

afterAll(() => {
  jest.useRealTimers();
});

describe("<DatePicker />", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<DatePicker from="2022-10-03" to="2022-10-10" onChange={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should return the correct `from` and `to` dates when selecting the preset ranges", async () => {
    const onChangeMock = jest.fn();

    const { findByTestId } = render(<DatePicker from="2023-01-01" to="2023-12-31" onChange={onChangeMock} />);

    fireEvent.click(await findByTestId("date-picker-range-1W"));
    expect(onChangeMock).toHaveBeenCalledWith({ from: "2023-10-03", to: "2023-10-10" });

    fireEvent.click(await findByTestId("date-picker-range-1M"));
    expect(onChangeMock).toHaveBeenCalledWith({ from: "2023-09-10", to: "2023-10-10" });

    fireEvent.click(await findByTestId("date-picker-range-6M"));
    expect(onChangeMock).toHaveBeenCalledWith({ from: "2023-04-10", to: "2023-10-10" });
  });

  it("should return the correct `from` and `to` dates when selecting the ranges using the calendar", async () => {
    const onChangeMock = jest.fn();

    const { findByTestId, findByText } = render(
      <DatePicker from="2023-01-01" to="2023-12-31" onChange={onChangeMock} />,
    );

    fireEvent.click(await findByTestId("date-picker-open-calendar"));
    fireEvent.click((await findByText("Confirm")).parentElement);
    expect(onChangeMock).toHaveBeenCalledWith({ from: "2023-01-01", to: "2023-12-31" });
    expect((await findByTestId("date-picker-custom-range")).textContent).toBe("2023-01-01 - 2023-12-31");
  });

  it("should revert to 1w range when clicking the reset button", async () => {
    const onChangeMock = jest.fn();

    const { findByTestId, findByText } = render(
      <DatePicker from="2023-01-01" to="2023-12-31" onChange={onChangeMock} />,
    );

    fireEvent.click(await findByTestId("date-picker-open-calendar"));
    fireEvent.click((await findByText("Confirm")).parentElement);
    fireEvent.click(await findByTestId("date-picker-reset-range"));
    expect(onChangeMock).toHaveBeenCalledWith({ from: "2023-10-03", to: "2023-10-10" });
  });
});
