import express from "express";
import { getExchangeRates } from "./exchangeRatesService";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json({ rates: await getExchangeRates() });
  } catch (err) {
    next(err);
  }
});

export { router };
