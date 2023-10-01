import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import localeEn from "air-datepicker/locale/en";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import CalendarIcon from "./assets/calendar.svg";
import ResetIcon from "./assets/reset.svg";

type Props = {
  className?: string;
  min?: string;
  max?: string;
  from: string;
  to: string;
  onChange: (range: { from: string; to: string }) => void;
};

type CalendarProps = {
  min?: string;
  max?: string;
  from: string;
  to: string;
  onChange: (range: { from: string; to: string }) => void;
  onCancel: () => void;
};

const formatDateString = (date: Date) => {
  // Month starts at zero so we +1
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString(10).padStart(2, "0")}-${date
    .getDate()
    .toString(10)
    .padStart(2, "0")}`;
};

const Calendar = (props: CalendarProps) => {
  const divRef = useRef<HTMLDivElement>();
  const calendarRef = useRef<AirDatepicker<HTMLDivElement>>();

  useEffect(() => {
    if (divRef.current) {
      calendarRef.current = new AirDatepicker(divRef.current, {
        classes: styles.calendar,
        inline: true,
        locale: localeEn,
        navTitles: {
          days: "MMM yyyy", // Day view title will show up as something like `Jan 2023`
        },
        range: true,
        buttons: [
          {
            content: "Cancel",
            onClick: props.onCancel,
          },
          {
            content: "Confirm",
            onClick(picker) {
              if (picker.selectedDates.length === 2) {
                props.onChange({
                  from: formatDateString(picker.selectedDates[0]),
                  to: formatDateString(picker.selectedDates[1]),
                });
              }
            },
          },
        ],
        onSelect(picker) {
          const confirmButton = picker.datepicker.$el.getElementsByClassName("air-datepicker-button").item(1);

          // Disable the `Confirm` button when only one date is selected
          if (Array.isArray(picker.date) && picker.date.length !== 2) {
            confirmButton.setAttribute("disabled", "true");
          } else {
            confirmButton.removeAttribute("disabled");
          }
        },
        minDate: props.min,
        maxDate: props.max,
        selectedDates: [props.from, props.to],
      });
    }

    return () => calendarRef.current.destroy();
  }, [divRef]);

  return <div ref={divRef} />;
};

const presetRanges = ["1W", "1M", "6M"];

const DatePicker = (props: Props) => {
  const [selectedPresetRange, setSelectedPresetRange] = useState("");

  useEffect(() => {
    if (selectedPresetRange) {
      const date = new Date();

      let from = "";
      let to = formatDateString(date);

      if (selectedPresetRange === "1W") {
        date.setDate(date.getDate() - 7);
      }

      if (selectedPresetRange === "1M") {
        date.setMonth(date.getMonth() - 1);
      }

      if (selectedPresetRange === "6M") {
        date.setMonth(date.getMonth() - 6);
      }

      from = formatDateString(date);

      props.onChange({ from, to });
    }
  }, [selectedPresetRange]);

  const [isCustomRangePickerOpen, setIsCustomRangePickerOpen] = useState(false);

  return (
    <div className={`${styles.wrapper} ${props.className || ""}`}>
      <fieldset className={`${styles.fieldset} ${styles.presetRangeFieldset}`}>
        {presetRanges.map((range) => (
          <label key={range} className={styles.presetRangeLabel} data-testid={`date-picker-range-${range}`}>
            <input
              type="radio"
              checked={selectedPresetRange === range}
              onChange={(event) => setSelectedPresetRange(range)}
            />
            <span>{range}</span>
          </label>
        ))}
      </fieldset>
      <fieldset className={`${styles.fieldset} ${styles.customRangeFieldset}`}>
        <button
          className={styles.customRangeFieldsetButton}
          data-testid="date-picker-open-calendar"
          onClick={() => setIsCustomRangePickerOpen(true)}
        >
          <img src={CalendarIcon} alt="calendar icon" />
        </button>
        {!selectedPresetRange && (
          <>
            <span
              className={styles.customRangeText}
              data-testid="date-picker-custom-range"
            >{`${props.from} - ${props.to}`}</span>
            <button
              className={`${styles.customRangeFieldsetButton} ${styles.customRangeResetButton}`}
              data-testid="date-picker-reset-range"
              onClick={() => setSelectedPresetRange("1W")}
            >
              <img src={ResetIcon} alt="reset icon" />
            </button>
          </>
        )}
      </fieldset>
      {isCustomRangePickerOpen && (
        <div className={styles.customRangeBackdrop}>
          <Calendar
            min={props.min}
            max={props.max}
            from={props.from}
            to={props.to}
            onCancel={() => setIsCustomRangePickerOpen(false)}
            onChange={(range) => {
              props.onChange(range);
              setIsCustomRangePickerOpen(false);
              setSelectedPresetRange("");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
