import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const SearchArea = lazy(() => import("./screens/SearchArea"));

export enum SearchAreaRoutesEnum{
    SEARCH_AREA = '/search-area'
}

export const searchAreaRoutes: RouteObject[] = [
    {
        path: SearchAreaRoutesEnum.SEARCH_AREA,
        element: (
            <Suspense>
                <SearchArea />
            </Suspense>
        )
    }
]
   