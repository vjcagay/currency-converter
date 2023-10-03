import { fireEvent, render } from "@testing-library/react";
import React from "react";
import DatePicker from "../DatePicker";

// When selecting the preset ranges, DatePicker selects the current date as the `end` value
// Since we are mocking the Date object, `end` will be 2023 Oct 10.
jest.useFakeTimers();
jest.setSystemTime(new Date("2023-10-10").getTime());

afterAll(() => {
  jest.useRealTimers();
});

describe("<DatePicker />", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<DatePicker start="2022-10-03" end="2022-10-10" onChange={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should return the correct `start` and `end` dates when selecting the preset ranges", async () => {
    const onChangeMock = jest.fn();

    const { findByTestId } = render(<DatePicker start="2023-01-01" end="2023-12-31" onChange={onChangeMock} />);

    fireEvent.click(await findByTestId("date-picker-range-1W"));
    expect(onChangeMock).toHaveBeenCalledWith({ start: "2023-10-03", end: "2023-10-10" }, "1W");

    fireEvent.click(await findByTestId("date-picker-range-1M"));
    expect(onChangeMock).toHaveBeenCalledWith({ start: "2023-09-10", end: "2023-10-10" }, "1M");

    fireEvent.click(await findByTestId("date-picker-range-6M"));
    expect(onChangeMock).toHaveBeenCalledWith({ start: "2023-04-10", end: "2023-10-10" }, "6M");
  });

  it("should return the correct `start` and `end` dates when selecting the ranges using the calendar", async () => {
    const onChangeMock = jest.fn();

    const { findByTestId, findByText } = render(
      <DatePicker start="2023-01-01" end="2023-12-31" onChange={onChangeMock} />,
    );

    fireEvent.click(await findByTestId("date-picker-open-calendar"));
    fireEvent.click((await findByText("Confirm")).parentElement);
    expect(onChangeMock).toHaveBeenCalledWith({ start: "2023-01-01", end: "2023-12-31" });
    expect((await findByTestId("date-picker-custom-range")).textContent).toBe("2023-01-01 - 2023-12-31");
  });

  it("should revert end 1w range when clicking the reset button", async () => {
    const onChangeMock = jest.fn();

    const { findByTestId, findByText } = render(
      <DatePicker start="2023-01-01" end="2023-12-31" onChange={onChangeMock} />,
    );

    fireEvent.click(await findByTestId("date-picker-open-calendar"));
    fireEvent.click((await findByText("Confirm")).parentElement);
    fireEvent.click(await findByTestId("date-picker-reset-range"));
    expect(onChangeMock).toHaveBeenCalledWith({ start: "2023-10-03", end: "2023-10-10" }, "1W");
  });
});
