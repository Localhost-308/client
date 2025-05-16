import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import NotifyIncident from "./screens/IncidentLgpd";

const User = lazy(() => import("./screens/User"));
const UserInsert = lazy(() => import("./screens/UserInsert"));

export enum UserRoutesEnum{
    USER = '/usuarios',
    USER_INSERT = '/usuarios/inserir',
    INCIDENT_LGPD = '/usuarios/incidente_lgpd'
}

export const userRoutes: RouteObject[] = [
    {
        path: UserRoutesEnum.USER,
        element: (
            <Suspense>
                <User />
            </Suspense>
        )
    },
    {
        path: UserRoutesEnum.USER_INSERT,
        element: (
            <Suspense>
                <UserInsert />
            </Suspense>
        )
    },
    {
        path: UserRoutesEnum.INCIDENT_LGPD,
        element: (
            <Suspense>
                <NotifyIncident />
            </Suspense>
        )
    }
]
   
