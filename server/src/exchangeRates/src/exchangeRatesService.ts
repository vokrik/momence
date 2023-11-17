import cnbClient from "./cnbClient";

export async function getExchangeRates() {
    const ratesText = await cnbClient.getRates()
    const lines = ratesText.split('\n')

    /**
     * Skip first two lines (date, column headers) and last line (empty)
     */
    return lines.slice(2, lines.length - 1).map((line: string) => {
        const [country, currency, amount, code, rate] = line.split('|')
        return {
            country,
            currency,
            amount: parseInt(amount),
            code,
            rate: parseFloat(rate.replace(',', '.'))
        }
    })

}