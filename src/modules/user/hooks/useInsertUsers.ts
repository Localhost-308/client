import { useState } from "react";

import { connectionAPIPost } from "../../../shared/functions/connection/connectionAPI";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";
import { InsertUser } from "../../../shared/dto/InsertUser.dto";
import { validateUser } from "../../../shared/functions/formValidation/formValidation";
import { URL_USER } from "../../../shared/constants/urls";
import { NotificationEnum } from "../../../shared/types/NotificationType";


export const useInsertUsers = () => {
    const {setNotification} = useGlobalReducer();
    const [errors, setErrors] = useState<Partial<InsertUser>>({});
    const [userInsert, setUserInsert] = useState<InsertUser>({
        first_name: "",
        last_name: "",
        email: "",
        role:""
    });

    const handleInsert = (e: React.FormEvent, setLoading: any, resetForm: any) => {
        e.preventDefault();
        const validationForm = validateUser(userInsert);
        if(Object.keys(validationForm).length > 0){
            setErrors(validationForm);
            return;
        }
        setLoading(true);
        setErrors({});
        connectionAPIPost(URL_USER, userInsert)
        .then(() => {
            setLoading(false);
            resetForm();
            setNotification('Usuário Cadastrado', NotificationEnum.SUCCESS)
        })
        .catch((error: Error) => {
            setLoading(false);
            if(error.message.includes('psycopg2')){
                setNotification('Falha ao salvar no banco de dados', NotificationEnum.ERROR)
            }else{
                setNotification(error.message, NotificationEnum.ERROR)
            }
           
        })
    }

    // INPUT EVENT
    const onChange = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
        setUserInsert({
            ...userInsert,
            [nameObject]: event.target.value
        })
    }

    // SELECT EVENT
    const handleChangeSelect = (value: string, nameObject: string) => {
        setUserInsert({
            ...userInsert,
            [nameObject]: nameObject == 'company_id' ? Number(value) : value
        })
    } 


    return{
        userInsert,
        setUserInsert,
        errors,
        handleInsert,
        onChange,
        handleChangeSelect
    }
}