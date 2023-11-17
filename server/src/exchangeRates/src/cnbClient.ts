import axios from 'axios'
import {ExternalResourceUnavailableError} from "./ExternalResourceUnavailableError";

async function getRates(): Promise<string> {
    try {
         const response = await axios.get(`${process.env.API_URL}/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt`);

         return response.data
    } catch (err) {
        console.error(err);
        throw new ExternalResourceUnavailableError()
    }
}

export default {
    getRates
}