import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const Terms = lazy(() => import("./screens/Terms"));

export enum TermsRoutesEnum{
    TERMS = '/termos'
}

export const termsRoutes: RouteObject[] = [
    {
        path: TermsRoutesEnum.TERMS,
        element: (
            <Suspense>
                <Terms />
            </Suspense>
        )
    }
]
   