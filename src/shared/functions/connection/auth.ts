import { NavigateFunction } from "react-router-dom";


import { AUTHORIZATION_KEY, FIRST_NAME, LAST_NAME, USER_ID } from "../../constants/authorizationConstants";
import { removeItemStorage, setItemStorage } from "./storageProxy";
import { UserType } from "../../types/UserType";
import { LoginRoutesEnum } from "../../../modules/login/routes";


const unsetAuthorizationToken = () => {
    removeItemStorage(AUTHORIZATION_KEY);
    removeItemStorage(FIRST_NAME);
    removeItemStorage(LAST_NAME);
    removeItemStorage(USER_ID);
};

export const setAuthorizationToken = (token: string) => {
    if(token) setItemStorage(AUTHORIZATION_KEY, token)
};

export const setUserData = (user: UserType) => {
    if(user.first_name) setItemStorage(FIRST_NAME, user.first_name);
    if(user.last_name) setItemStorage(LAST_NAME, user.last_name);
    if(user.id) setItemStorage(USER_ID, String(user.id));
}

export const logout = (navigate: NavigateFunction) => {
    unsetAuthorizationToken();
    navigate(LoginRoutesEnum.LOGIN);
}