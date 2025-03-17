export const insertMaskInZipCode = (zipCode: string): string => {
    if(zipCode){
        let sanitizedZipCode = zipCode.replace(/\D/g, '');
        return sanitizedZipCode.replace(/(\d{5})(\d{0,3}).*/, '$1-$2');
    }
    return '';
}
