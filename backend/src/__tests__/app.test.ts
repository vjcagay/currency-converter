import request from "supertest";

import app from "../app";

jest.mock("../data", () => {
  return [
    {
      date: "2023-09-30",
      quotes: {
        USDJPY: 149.235416,
      },
    },
    {
      date: "2023-09-29",
      quotes: {
        USDJPY: 149.235416,
      },
    },
    {
      date: "2023-09-28",
      quotes: {
        USDJPY: 149.283613,
      },
    },
  ];
});

describe("Given app.ts", () => {
  describe("Basic routing", () => {
    it("should handle invalid routes", async () => {
      const response = await request(app).get("/some-random-route");

      expect(response.statusCode).toBe(404);
      expect(response.body).toStrictEqual({ message: "Invalid route." });
    });
  });

  describe("Handling GET requests", () => {
    it("should look for required fields", async () => {
      const response = await request(app).get("/history");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({ message: "There are missing parameters. Please check your request." });
    });

    it("validate fields to only accept a single value", async () => {
      const response = await request(app).get(
        "/history?from=usd&from=sgd&to=jpy&to=eur&start=2022-10-01&start=2022-10-02&end=2023-09-29&end=2023-09-30",
      );

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({
        message: "Parameters can only accept one value at a time. Please check your request.",
      });
    });

    it("should accept only supported currencies", async () => {
      const response = await request(app).get("/history?from=aaa&to=bbb&start=2022-10-01&end=2023-09-30");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({ message: "Unsupported currency. Please check your request." });
    });

    it("should send valid data", async () => {
      const response = await request(app).get("/history?from=usd&to=jpy&start=2023-09-26&end=2023-09-30");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({
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
      });
    });
  });
});
