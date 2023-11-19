import { fetchRates } from "./exchangeRatesClient";
import fetch from "jest-fetch-mock";

describe("exchangeRatesClient", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("should fetch rates", async () => {
    fetch.mockResponse(JSON.stringify({ rates: [{ some: "rate" }] }));
    expect(await fetchRates()).toEqual({ rates: [{ some: "rate" }] });
  });

  it("should throw error on API error", async () => {
    fetch.mockReject(new Error());
    await expect(fetchRates()).rejects.toThrowError();
  });
});
