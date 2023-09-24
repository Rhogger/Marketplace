class ViaCep {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    public async buscarCep(cep: string): Promise<any> {
        try {
            const response = await fetch(`${this.apiUrl}${cep}/json`);

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar CEP: ${error.message}`);
            } else {
                throw new Error("Erro desconhecido ao buscar CEP");
            }
        }
    }
}

export default ViaCep;