import cnbClient from "./cnbClient";
import DataFormatError from "./errors/DataFormatError";

export async function getExchangeRates() {
    const ratesText = await cnbClient.getRates()
    const lines = ratesText.split('\n')
    const header = lines.slice(0, 2)
    const rateLines = lines.slice(2, lines.length - 1)

    if(!isHeaderRowsValid(header)) {
        throw new DataFormatError(`Invalid header`)
    }
    if(rateLines.length === 0) {
        throw new DataFormatError(`No rates found`)
    }

    return rateLines.map((line: string) => {
        if(!isLineValid(line)) throw new DataFormatError(`Invalid line: ${line}`)
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

/**
 * Examples of valid lines:
 * Australia|dollar|1|AUD|14.613
 * Australia|dollar|1|AUD|14
 */
function isLineValid(line: string): boolean {
    return /^(\w+(\s+\w+)*)\|(\w+(\s+\w+)*)\|(\d+)\|(\w+(\s+\w+)*)\|(\d+([.,]\d+)?)$/.test(line)
}

function isHeaderRowsValid(first2Lines: Array<String>): boolean {
    return first2Lines.length === 2 && first2Lines[1] === 'Country|Currency|Amount|Code|Rate'
}