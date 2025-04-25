import { ImportFileData } from "../../dto/ImportFileData.dto";
import { InsertUser } from "../../dto/InsertUser.dto";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateUser = (user: InsertUser): Partial<InsertUser> => {
    const errors: Partial<InsertUser> = {};

    if(user.first_name == '' || user.first_name == undefined || user.first_name.length < 3) errors.first_name = 'Precisa ser preenchido, mínimo 3 digitos';
    if(user.last_name == '' || user.last_name == undefined || user.last_name.length < 2) errors.last_name = 'Precisa ser preenchido, mínimo 2 digitos';
    if(user.email == '' || user.email == undefined ||  !emailRegex.test(user.email)) errors.email = 'Precisa preencher, ex:( maria@exemplo.com )';

    return errors;
}

export const validateImportFileData = (obj: ImportFileData): Partial<ImportFileData> => {
    const errors: Partial<ImportFileData> = {};
    let typesPermited: string[] = ['csv_sql', 'csv_nosql', 'inmet', 'cities_coordinates']
    if(obj.csv == undefined || obj.csv == '') errors.csv = 'CSV não definido!';
    if(obj.typeData == undefined || obj.typeData == '') errors.typeData = 'Tipo não definido!';
    if(obj.typeData !== undefined && !typesPermited.includes(obj.typeData)) errors.typeData = 'Tipo não está padronizado!';

    return errors;
}