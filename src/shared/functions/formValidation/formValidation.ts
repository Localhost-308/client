import { ImportFileData } from "../../dto/ImportFileData.dto";
import { InsertUser } from "../../dto/InsertUser.dto";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

export const validateUser = (user: InsertUser): Partial<InsertUser> => {
    const errors: Partial<InsertUser> = {};

    if (!user.first_name || user.first_name.trim().length < 3) {
        errors.first_name = 'O nome precisa ser preenchido e ter pelo menos 3 caracteres.';
    }

    if (!user.last_name || user.last_name.trim().length < 2) {
        errors.last_name = 'O sobrenome precisa ser preenchido e ter pelo menos 2 caracteres.';
    }

    if (!user.email || !emailRegex.test(user.email)) {
        errors.email = 'O email é inválido.';
    }

    if (!user.password ) {
        errors.password = 'A senha deve ter pelo menos 6 caracteres, incluindo uma letra e um número.';
    }

    if (!user.cargo) {
        errors.cargo = 'O cargo deve ser selecionado.';
    }

    return errors;

};

export const validateImportFileData = (data: ImportFileData): Partial<ImportFileData> => {
    const errors: Partial<ImportFileData> = {};

    if (!data.csv) {
        errors.csv = 'O arquivo CSV deve ser fornecido.';
    }

    // if (data.typeData && !['csv', 'json'].includes(data.typeData)) {
    //     errors.typeData = 'O tipo de dado é inválido. Deve ser "csv".';
    // }

    return errors;
};