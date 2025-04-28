import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { connectionAPIPost } from "../../../shared/functions/connection/connectionAPI";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";
import { InsertUser } from "../../../shared/dto/InsertUser.dto";
import { validateUser } from "../../../shared/functions/formValidation/formValidation";
import { URL_USER } from "../../../shared/constants/urls";
import { NotificationEnum } from "../../../shared/types/NotificationType";

export const useInsertUsers = () => {
    const { setNotification } = useGlobalReducer();
    const [errors, setErrors] = useState<Partial<InsertUser>>({});
    const [userInsert, setUserInsert] = useState<InsertUser>({
        first_name: "",
        last_name: "",
        email: "",
        password: "", 
        cargo: ""
    });

    const navigate = useNavigate();

    const handleInsert = async (
        event: React.FormEvent,
        setLoading: (value: boolean) => void,
        resetForm: () => void
    ) => {
        event.preventDefault();

        const validationForm = validateUser(userInsert);
        if (Object.keys(validationForm).length > 0) {
            setErrors(validationForm);
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            await connectionAPIPost(URL_USER, userInsert);
            resetForm();
            setNotification("Usuário Cadastrado", NotificationEnum.SUCCESS);

            navigate("/usuarios"); 
        } catch (error: any) {
            if (error.message.includes("psycopg2")) {
                setNotification("Falha ao salvar no banco de dados", NotificationEnum.ERROR);
            } else {
                setNotification(error.message, NotificationEnum.ERROR);
            }
        } finally {
            setLoading(false);
        }
    };

    // INPUT EVENT
    const onChange = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
        setUserInsert({
            ...userInsert,
            [nameObject]: event.target.value
        });
    };

    // SELECT EVENT
    const handleChangeSelect = (value: string, nameObject: string) => {
        setUserInsert({
            ...userInsert,
            [nameObject]: nameObject === "company_id" ? Number(value) : value
        });
    };

    return {
        userInsert,
        setUserInsert,
        errors,
        handleInsert,
        onChange,
        handleChangeSelect
    };
};