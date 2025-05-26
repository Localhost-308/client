import { useState } from "react";

import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";
import { connectionAPIPost } from "../../../shared/functions/connection/connectionAPI";
import { NotificationEnum } from "../../../shared/types/NotificationType";
import { InsertTerms } from "../../../shared/dto/InsertTerms.dto";
import { URL_TERMS } from "../../../shared/constants/urls";


export const useInsertTerms = () => {
    const {setNotification} = useGlobalReducer();
    const [terms, setTerms] = useState<InsertTerms>({
        text: ''
    });

    const handleInsertTerms = (setLoading: any) => {
        setLoading(true);
        connectionAPIPost(`${URL_TERMS}`, terms)
        .then(() => {
            setLoading(false);
            resetFormInsert();
            setNotification('Termo Cadastrado', NotificationEnum.SUCCESS);
        })
        .catch((error: Error) => {
            setLoading(false);
            setNotification(error.message, NotificationEnum.ERROR);
        });
    }

    // INPUT EVENT
    const onChangeInsert = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
        setTerms({
            ...terms,
            [nameObject]: event.target.value
        })
    }

    const resetFormInsert = () => {
        setTerms({
            text: ''
        })
    }
    return{
        terms,
        setTerms,
        onChangeInsert,
        resetFormInsert,
        handleInsertTerms
    }
}