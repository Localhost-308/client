import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const Dashboard = lazy(() => import("./screens/Dashboard"));

export enum DashboardRoutesEnum{
    DASHBOARD = '/dashboard'
}

export const dashboardRoutes: RouteObject[] = [
    {
        path: DashboardRoutesEnum.DASHBOARD,
        element: (
            <Suspense>
                <Dashboard />
            </Suspense>
        )
    }
]
   