import {
  getRates,
  splitByPopularity,
  convertToCurrency,
} from "./exchangeRatesService";
import * as exchangeRatesClient from "./exchangeRatesClient";

describe("exchangeRatesService", () => {
  describe("getRates", () => {
    it("should fetch exchange rates", async () => {
      const rates = [
        {
          country: "USA",
          currency: "dollar",
          code: "USD",
          amount: 1,
          rate: 22.547,
        },
      ];
      jest.spyOn(exchangeRatesClient, "fetchRates").mockResolvedValue({
        rates,
      });
      expect(await getRates()).toEqual(rates);
    });
    it("should pass through client errors", async () => {
      jest
        .spyOn(exchangeRatesClient, "fetchRates")
        .mockRejectedValue(new Error());
      await expect(getRates()).rejects.toBeInstanceOf(Error);
    });
  });

  describe("splitByPopularity", () => {
    it("should split rates by popularity", () => {
      const allRates = [
        {
          country: "USA",
          currency: "dollar",
          code: "USD",
          amount: 1,
          rate: 22.547,
        },
        {
          country: "Indonesia",
          currency: "rupiah",
          amount: 1000,
          code: "IDR",
          rate: 1.45,
        },
      ];
      expect(splitByPopularity(allRates)).toEqual({
        popular: [allRates[0]],
        other: [allRates[1]],
      });
    });

    it("should order popular rates by static order", () => {
      const allRates = [
        {
          country: "United Kingdom",
          currency: "pound",
          amount: 1,
          code: "GBP",
          rate: 27.945,
        },
        {
          country: "USA",
          currency: "dollar",
          code: "USD",
          amount: 1,
          rate: 22.547,
        },
        {
          country: "EMU",
          currency: "euro",
          amount: 1,
          code: "EUR",
          rate: 24.45,
        },
      ];
      expect(splitByPopularity(allRates)).toEqual({
        popular: [allRates[1], allRates[2], allRates[0]],
        other: [],
      });
    });

    it("should order other rates by code ASC", () => {
      const allRates = [
        {
          country: "Philippines",
          currency: "peso",
          amount: 100,
          code: "PHP",
          rate: 40.472,
        },
        {
          country: "Norway",
          currency: "krone",
          amount: 1,
          code: "NOK",
          rate: 2.077,
        },

        {
          country: "Poland",
          currency: "zloty",
          amount: 1,
          code: "PLN",
          rate: 5.593,
        },
      ];
      expect(splitByPopularity(allRates)).toEqual({
        popular: [],
        other: [allRates[1], allRates[0], allRates[2]],
      });
    });
    it("should return empty popular and other rates when there are no rates", () => {
      expect(splitByPopularity([])).toEqual({
        popular: [],
        other: [],
      });
    });
  });

  describe("convertToCurrency", () => {
    it("should convert to specified currency", () => {
      expect(convertToCurrency(100, { amount: 1, rate: 2 })).toEqual(50);
    });
    it("should  convert negative numbers to specified currency", () => {
      expect(convertToCurrency(-100, { amount: 1, rate: 2 })).toEqual(-50);
    });
    it("should consider exchange rate amount in calculation", () => {
      expect(convertToCurrency(100, { amount: 100, rate: 2 })).toEqual(5000);
    });
    it("should return Infinity when rate is 0", () => {
      expect(convertToCurrency(100, { amount: 100, rate: 0 })).toEqual(
        Number.POSITIVE_INFINITY,
      );
    });
  });
});
