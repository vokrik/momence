
export const fetchRates = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/exchange-rates`);
    return response.json()
}