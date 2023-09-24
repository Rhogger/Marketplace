export default function validarCEP(cep: string): boolean {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
        return false;
    }

    if (!/^\d+$/.test(cepLimpo)) {
        return false;
    }

    return true;
}