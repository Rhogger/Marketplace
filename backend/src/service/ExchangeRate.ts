class ExchangeRate {

    async convertCurrency() :Promise<any> {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/65208ed2d0d0015ddffd7972/latest/USD`);

        return response.json();
    }
}

export default ExchangeRate;