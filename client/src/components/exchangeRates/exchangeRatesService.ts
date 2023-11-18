import {fetchRates} from "./exchangeRatesClient";

const POPULAR_CODES = ["USD", "EUR", "GBP"]

export type ExchangeRateInfo = {
    country: string,
    currency: string,
    code: string,
} & ExchangeRate

export type ExchangeRate = {
    amount: number,
    rate: number
}

export type PrioritizedRates = {
    popular: Array<ExchangeRateInfo>
    other: Array<ExchangeRateInfo>
}

export const getRates = async (): Promise<PrioritizedRates>=> {
    const allRates: Array<ExchangeRateInfo> = (await fetchRates()).rates

    const popular = allRates.filter((rate) => POPULAR_CODES.includes(rate.code)).sort((a, b) => {
        return POPULAR_CODES.indexOf(a.code) - POPULAR_CODES.indexOf(b.code)
    })

    const other = allRates.filter((rate: ExchangeRateInfo) => !POPULAR_CODES.includes(rate.code)).sort((a, b) => {
        return a.code.localeCompare(b.code)
    })

    return {
        popular,
        other
    }
}

export const convertToCurrency = (amountCzk: number, exchangeRate: ExchangeRate ): number => {
    return (amountCzk / exchangeRate.rate ) * exchangeRate.amount
}