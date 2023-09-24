class ExchangeRate {
    private apiUrl: string;
    TOKEN = process.env.API_EXCHANGE_RATE_TOKEN

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async convertCurrency(baseCurrency: string) {
        const response = await fetch(`${this.apiUrl}${this.TOKEN}/latest/${baseCurrency}`);

        return response;
    }
}

export default ExchangeRate;