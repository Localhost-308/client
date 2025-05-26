const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const URL_USER = `${BASE_API_URL}/users`;
export const URL_AUTH = `${URL_USER}/login`;
export const URL_AREA_INFORMATION = `${BASE_API_URL}/area-information`;
export const URL_AREA_INFORMATION_TREE = `${BASE_API_URL}/area-information/tree`;
export const URL_AREA = `${BASE_API_URL}/areas`;
export const URL_IMPORT =`${BASE_API_URL}/import`;
export const URL_THREATS = `${BASE_API_URL}/threats`;
export const URL_MACHINE_LEARN = `${BASE_API_URL}/machine_learning`;
export const URL_NOTIFY__LGPD_INCIDENT = `${URL_USER}/notify-lgpd-incident`;
export const URL_TERMS = `${URL_USER}/terms-and-conditions`;
export const URL_REPORT = `${BASE_API_URL}/report`;
