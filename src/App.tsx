import { Suspense } from "react";
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import type { Router as RemixRouter} from "@remix-run/router";

import './main.css';
import { loginRoutes } from './modules/login/routes';
import { firstScreenRoutes } from "./modules/firstScreen/routes";
import { useNotification } from "./shared/hooks/useNotification";
import { userRoutes } from "./modules/user/routes";
import { dashboardRoutes } from "./modules/dashboard/routes";
import { importCSVRoutes } from "./modules/importCSV/routes";

const routes: RouteObject[] = [...loginRoutes];
const routesLoggedIn: RouteObject[] = [
  ...importCSVRoutes,
  ...dashboardRoutes,
  ...userRoutes,
  ...firstScreenRoutes
]

const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);

function App() {
  const { contextHolder } = useNotification();

  return(
    <>
      {contextHolder}
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}
export default App