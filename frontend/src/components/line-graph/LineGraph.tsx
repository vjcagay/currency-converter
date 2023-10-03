import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";

type Dataset = {
  label?: string;
  data: number[];
  fill?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  tension?: number;
};

type Props = {
  className?: string;
  labels: string[];
  datasets: Dataset[];
};

const LineGraph = (props: Props) => {
  const wrapperRef = useRef<HTMLCanvasElement>();
  const chartRef = useRef<Chart>();

  useEffect(() => {
    chartRef.current = new Chart(wrapperRef.current, {
      type: "line",
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        interaction: {
          intersect: false,
        },
        datasets: {
          line: {
            borderWidth: 1,
            pointStyle: "circle",
            tension: 0.1,
            pointRadius: 0,
            pointHoverRadius: 2,
          },
        },
        scales: {
          x: {
            grid: {
              tickColor: "#666666",
              color: "transparent",
            },
            border: {
              display: true,
              color: "#666666",
            },
            alignToPixels: true,
            ticks: {
              align: "inner",
              autoSkip: true,
              maxRotation: 0,
              autoSkipPadding: 40,
            },
          },
          y: {
            beginAtZero: false,
            position: "right",
            alignToPixels: true,
            border: {
              display: false,
              dash: [4, 4],
              width: 1,
            },
            ticks: {
              align: "end",
            },
          },
        },
        plugins: {
          tooltip: {
            backgroundColor: "#ffffff",
            borderColor: "#eaecf0",
            borderWidth: 1,
            bodyColor: "#0c111d",
            titleColor: "#0c111d",
            titleMarginBottom: 8,
            callbacks: {
              title(ctx) {
                // Exchange rate value
                return (ctx[0].raw as number).toString(10);
              },
              label(ctx) {
                const date = new Date(ctx.label);
                const parts = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).formatToParts(date);
                return parts.reduce((acc, part) => {
                  if (part.type === "month" || part.type === "day" || part.type === "year") {
                    acc += part.value;
                    acc += part.type === "day" ? "," : ""; // Add a comma after the date.
                    acc += " ";
                  }

                  return acc;
                }, "");
              },
            },
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    if (props.labels && props.datasets) {
      chartRef.current.data.labels = props.labels;
      chartRef.current.data.datasets = props.datasets;
      chartRef.current.update();
    }
  }, [props.labels, props.datasets]);

  return <canvas ref={wrapperRef} className={`${styles.wrapper} ${props.className || ""}`}></canvas>;
};

export default LineGraph;
