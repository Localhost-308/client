import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ConnectionAPI, { connectionAPIPost, MethodType } from "../functions/connection/connectionAPI";
import { URL_AUTH } from "../constants/urls";
import { ERROR_AUTH } from "../constants/errosStatus";
import { setAuthorizationToken, setUserData } from "../functions/connection/auth";
import { AuthType } from "../types/AuthType";
import { useGlobalReducer } from "../../store/reducers/globalReducer/useGlobalReducer";
import { NotificationEnum } from "../types/NotificationType";
import { DashboardRoutesEnum } from "../../modules/dashboard/routes";
import useAuthInterceptor from "./useAuthInterceptor";


export const useRequests = () => {
    const [loading] = useState(false);
    const { setNotification, setUser } = useGlobalReducer();
    useAuthInterceptor();

    const request = async <T>(
        url: string, 
        method: MethodType, 
        saveGlobal?: (object: T) => void,
        body?: unknown,
    ):Promise<T | undefined> => {
        const response: T | undefined = await ConnectionAPI.connect<T>(url, method, body)
            .then((data) => {
                if(saveGlobal){
                    saveGlobal(data);
                }
                return data;
            }).catch((error: Error) => {
                if(error.message.includes('is not allowed to trigger')){
                    setNotification('Usuário não tem permissão!', NotificationEnum.ERROR);
                }
                else if(error.message.includes('not allowed')){
                    setNotification('Usuário não tem permissão!', NotificationEnum.ERROR);
                }
                else setNotification(error.message, NotificationEnum.ERROR);
                return undefined;
            });
        return response;
    }

    const authRequest = async (body: unknown, navigate: ReturnType<typeof useNavigate>): Promise<void>  => {
        await connectionAPIPost<AuthType>(URL_AUTH, body)
        .then((data) => {
            setUser(data.user);
            setUserData(data.user);
            setAuthorizationToken(data.access_token);
            navigate(DashboardRoutesEnum.DASHBOARD);
        })
        .catch((error: Error) => {
            console.log(error.message);
            setNotification(ERROR_AUTH, NotificationEnum.ERROR);
            return undefined;
        });
    }

    const authRequestLink = async (body: unknown): Promise<void>  => {
        await connectionAPIPost<AuthType>(`${URL_AUTH}/link`, body)
        .then((data) => {
            setUser(data.user);
            setUserData(data.user);
            setAuthorizationToken(data.access_token);
        })
        .catch((error: Error) => {
            console.log(error.message);
            setNotification(ERROR_AUTH, NotificationEnum.ERROR);
            return undefined;
        });
    }

    return {
        loading,
        request,
        authRequest,
        authRequestLink
    }
}