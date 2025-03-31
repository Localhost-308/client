import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const LoginScreen = lazy(() => import("./screens/LoginScreen"));

export enum LoginRoutesEnum{
  LOGIN = '/login'
}

export const loginRoutes: RouteObject[] = [
    {
      path: LoginRoutesEnum.LOGIN,
      element: (
        <Suspense>
          <LoginScreen/>
        </Suspense>
      ),
    }
];