import { jest, describe, expect, it, beforeEach } from "@jest/globals";
import cnbClient from "../src/cnbClient";
import { getExchangeRates } from "../src/exchangeRatesService";
import DataFormatError from "../src/errors/DataFormatError";

import {
  successResponseMock,
  missingDateMock,
  missingColumnHeadersMock,
  missingHeaderMock,
  extraNewLinesHeaderMock,
  extraNewLinesInRatesMock,
  extraNewLinesAfterRatesMock,
  malformedAmountMock,
  negativeAmountMock,
  negativeRateMock,
  malformedRateMock,
  tooManyColumnsMock,
  emptyRatesMock,
  emptyResponseMockMock,
  tooLittleColumnsMock,
} from "./mocks/cnbClient";

const testCases: Array<{
  name: string;
  cnbResponse: string;
}> = [
  {
    name: "should trow DataFormatError when date is missing",
    cnbResponse: missingDateMock,
  },
  {
    name: "should trow DataFormatError when column headers are missing",
    cnbResponse: missingColumnHeadersMock,
  },
  {
    name: "should trow DataFormatError when header is missing",
    cnbResponse: missingHeaderMock,
  },
  {
    name: "should trow DataFormatError when there are extra new lines in header",
    cnbResponse: extraNewLinesHeaderMock,
  },
  {
    name: "should trow DataFormatError when there are extra new lines in rates",
    cnbResponse: extraNewLinesInRatesMock,
  },
  {
    name: "should trow DataFormatError when there are extra new lines after rates",
    cnbResponse: extraNewLinesAfterRatesMock,
  },
  {
    name: "should trow DataFormatError when amount is malformed",
    cnbResponse: malformedAmountMock,
  },
  {
    name: "should trow DataFormatError when amount is negative",
    cnbResponse: negativeAmountMock,
  },
  {
    name: "should trow DataFormatError when rate is negative",
    cnbResponse: negativeRateMock,
  },
  {
    name: "should trow DataFormatError when rate is malformed",
    cnbResponse: malformedRateMock,
  },
  {
    name: "should trow DataFormatError when there are too many columns",
    cnbResponse: tooManyColumnsMock,
  },
  {
    name: "should trow DataFormatError when there are too little columns",
    cnbResponse: tooLittleColumnsMock,
  },
  {
    name: "should trow DataFormatError when there are empty rates",
    cnbResponse: emptyRatesMock,
  },
  {
    name: "should trow DataFormatError when there is empty response",
    cnbResponse: emptyResponseMockMock,
  },
];

describe("exchangeRatesService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("getExchangeRates", () => {
    it("should return rates", async () => {
      jest.spyOn(cnbClient, "getRates").mockResolvedValue(successResponseMock);
      expect(await getExchangeRates()).toEqual([
        {
          amount: 1,
          code: "AUD",
          country: "Australia",
          currency: "dollar",
          rate: 14.613,
        },
        {
          amount: 1,
          code: "USD",
          country: "USA",
          currency: "dollar",
          rate: 22.547,
        },
        {
          amount: 1,
          code: "ILS",
          country: "Israel",
          currency: "new shekel",
          rate: 5.974,
        },
      ]);
    });

    it.each(testCases)("$name", async ({ cnbResponse }) => {
      jest.spyOn(cnbClient, "getRates").mockResolvedValue(cnbResponse);
      await expect(getExchangeRates()).rejects.toBeInstanceOf(DataFormatError);
    });

    it("should pass through cnb client errors", async () => {
      jest.spyOn(cnbClient, "getRates").mockRejectedValue(new Error());
      await expect(getExchangeRates()).rejects.toBeInstanceOf(Error);
    });
  });
});
