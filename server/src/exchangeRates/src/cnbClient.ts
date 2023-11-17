import axios from 'axios'
import ExternalResourceUnavailableError from "./errors/ExternalResourceUnavailableError";

export const DAILY_RATES_PATH = `/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt`
async function getRates(): Promise<string> {
    try {
         const response = await axios.get(`${process.env.API_URL}${DAILY_RATES_PATH}`);

         return response.data
    } catch (err) {
        console.error(err);
        throw new ExternalResourceUnavailableError()
    }
}

export default {
    getRates
}