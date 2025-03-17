import { InsertUser } from "../../dto/InsertUser.dto";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateUser = (user: InsertUser): Partial<InsertUser> => {
    const errors: Partial<InsertUser> = {};

    if(user.first_name == '' || user.first_name == undefined || user.first_name.length < 3) errors.first_name = 'Precisa ser preenchido, mínimo 3 digitos';
    if(user.last_name == '' || user.last_name == undefined || user.last_name.length < 2) errors.last_name = 'Precisa ser preenchido, mínimo 2 digitos';
    if(user.email == '' || user.email == undefined ||  !emailRegex.test(user.email)) errors.email = 'Precisa preencher, ex:( maria@exemplo.com )';

    return errors;
}