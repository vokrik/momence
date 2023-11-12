

const API_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'

export function getExchangeRates() {
  return fetch(API_URL).then(response => response.text()).then(text => {
    const lines = text.split('\n')
    const rates = lines.slice(2, lines.length - 1).map(line => {
      const [country, currency, amount, code, rate] = line.split('|')
      return {
        country,
        currency,
        amount: parseInt(amount),
        code,
        rate: parseFloat(rate.replace(',', '.'))
      }
    })
    return rates
  })
}
