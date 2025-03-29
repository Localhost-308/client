import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const ImportCSV = lazy(() => import("./screens/ImportCSV"));

export enum ImportCSVRoutesEnum{
    IMPORT_CSV = '/importar-dados'
}

export const importCSVRoutes: RouteObject[] = [
    {
        path: ImportCSVRoutesEnum.IMPORT_CSV,
        element: (
            <Suspense>
                <ImportCSV/>
            </Suspense>
        )
    }
]
   