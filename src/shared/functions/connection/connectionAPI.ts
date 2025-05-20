import axios, { AxiosRequestConfig, ResponseType } from "axios";

import { ERROR_ACCESS_DANIED, ERROR_BAD_REQUEST, ERROR_GENERIC, ERROR_NOT_FOUND, ERROR_TOKEN_EXPIRES } from "../../constants/errosStatus";
import { MethodsEnum } from "../../enums/methods.enum";
import { getItemStorage } from "./storageProxy";
import { AUTHORIZATION_KEY } from "../../constants/authorizationConstants";


export type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete'; 

export default class ConnectionAPI {
    static async call<T>(url: string, method: MethodType, body?:unknown, responseType?: string): Promise<T>{
      
      const config:AxiosRequestConfig = {
          headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getItemStorage(AUTHORIZATION_KEY)}`
          }
        };
      config.responseType = (responseType ?? 'json') as ResponseType;

      switch (method) {
          case(MethodsEnum.POST):
          case(MethodsEnum.PATCH): 
          case(MethodsEnum.PUT):
              return (await axios[method]<T>(url, body, config)).data;
          case(MethodsEnum.GET):
          case(MethodsEnum.DELETE):
          default:
              return (await axios[method]<T>(url, config)).data;
      }
    }

    static async connect<T>(url: string, method: MethodType, body?:unknown, responseType?: string): Promise<T>{
        return ConnectionAPI.call<T>(url, method, body, responseType).catch((error) => {
            if(error.response){
                switch (error.response.status) {
                    case 401:
                        throw new Error(ERROR_TOKEN_EXPIRES);
                    case 403:
                        throw new Error(ERROR_ACCESS_DANIED);
                    case 404:
                        throw new Error(ERROR_NOT_FOUND);
                    case 400:
                        throw new Error(extractTextFromPTag(error.response.data));
                    default:
                        throw new Error(ERROR_GENERIC);
                }
            }
            throw new Error(ERROR_NOT_FOUND);
        });
    }
}

export const connectionAPIGet = async <T>(url: string): Promise<T> => {
    return ConnectionAPI.connect<T>(url, MethodsEnum.GET);
}

export const connectionAPIPost = async <T>(url:string, body:unknown): Promise<T> => {
    return ConnectionAPI.connect<T>(url, MethodsEnum.POST, body);
}

export const connectionAPIPut = async <T>(url:string, body:unknown): Promise<T> => {
    return ConnectionAPI.connect<T>(url, MethodsEnum.PUT, body);
}

export const connectionAPIDelete = async <T>(url:string, body:unknown): Promise<T> => {
    return ConnectionAPI.connect<T>(url, MethodsEnum.DELETE, body);
}

export const connectionAPIPath = async <T>(url:string, body:unknown): Promise<T> => {
    return ConnectionAPI.connect<T>(url, MethodsEnum.PATCH, body);
}


function extractTextFromPTag(htmlString: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const pTag = doc.querySelector('p');
    const response: string = pTag?.textContent != null ? pTag.textContent : ERROR_BAD_REQUEST;

    return response;
}