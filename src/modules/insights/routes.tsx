import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const Insights = lazy(() => import("./screens/Insights"));

export enum InsigthsRoutesEnum{
    INSIGHTS = '/insights-ia'
}

export const predictRoutes: RouteObject[] = [
    {
        path: InsigthsRoutesEnum.INSIGHTS,
        element: (
            <Suspense>
                <Insights/>
            </Suspense>
        )
    }
]
   