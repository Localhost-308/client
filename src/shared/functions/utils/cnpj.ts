export const insertMaskInCnpj= (cnpj:string): string => {
    if(cnpj){
        return cnpj
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    }
    return '';
}

export function isCNPJValid(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;

    const t = cnpj.length - 2;
    const d = cnpj.substring(t);
    const d1 = parseInt(d.charAt(0));
    const d2 = parseInt(d.charAt(1));
    const calc = (x: number) => {
        const n = cnpj.substring(0, x);
        let y = x - 7;
        let s = 0;
        for (let i = x; i >= 1; i--) {
            s += parseInt(n.charAt(x - i)) * y--;
            if (y < 2) y = 9;
        }
        return s;
    };
    const dv1 = (calc(t) % 11) < 2 ? 0 : 11 - (calc(t) % 11);
    const dv2 = (calc(t + 1) % 11) < 2 ? 0 : 11 - (calc(t + 1) % 11);

    return dv1 === d1 && dv2 === d2;
}