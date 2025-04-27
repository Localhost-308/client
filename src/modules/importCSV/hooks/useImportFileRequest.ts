import { useState } from "react";
import axios from "axios";

import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";
import { ImportFileData } from "../../../shared/dto/ImportFileData.dto";
import { validateImportFileData } from "../../../shared/functions/formValidation/formValidation";
import { getItemStorage } from "../../../shared/functions/connection/storageProxy";
import { AUTHORIZATION_KEY } from "../../../shared/constants/authorizationConstants";
import { NotificationEnum } from "../../../shared/types/NotificationType";
import { URL_IMPORT } from "../../../shared/constants/urls";

export const useImportFileData = () => {
    const {setNotification} = useGlobalReducer();
    const [errors, setErrors] = useState<Partial<ImportFileData>>({});
    const [importFile, setImportFile] = useState<ImportFileData>({
        csv: undefined,
        typeData: ''
    });

    const handleImport = async (e: React.FormEvent, setLoading: any) => {
        e.preventDefault();
        const validationForm = validateImportFileData(importFile);
        if(Object.keys(validationForm).length > 0){
            setErrors(validationForm);
            return;
        }
        setErrors({});
        setLoading(true);
        const formData = new FormData();
        if (importFile.csv instanceof Blob) {
            formData.append('file.csv', importFile.csv);
        }
        await axios.post(`${URL_IMPORT}/${importFile.typeData}`, formData,{
        headers:{
            'Content-Type': 'multipart/form-data', 
            'Authorization': `Bearer ${getItemStorage(AUTHORIZATION_KEY)}`
        }})
        .then(() => {
            setLoading(false);
            setNotification('Importado com Sucesso', NotificationEnum.SUCCESS);
        })
        .catch((error: Error) => {
            setLoading(false);
            setNotification(error.message, NotificationEnum.ERROR);
        });
    }

    // INPUT EVENT
    const onChange = (file: File) => {
        setImportFile({
            ...importFile,
            ['csv']: file,
        });
    }

    return{
        errors,
        importFile, 
        onChange,
        handleImport,
        setImportFile,
    }
}