
export const fetchRates = async () => {
    const response = await fetch("http://localhost:8080/exchange-rates");
    return response.json()
}