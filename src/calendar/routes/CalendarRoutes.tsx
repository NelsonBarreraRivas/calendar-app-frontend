import { Navigate, RouteObject } from "react-router-dom";
import { CalendarLayout } from "../layout/CalendarLayout"
import { CalendarPage } from "../pages/CalendarPage";
import { PrivateRoute } from "../../router";


export const CalendarRoutes : RouteObject[] = [
    {
        path: '/',
        element: <PrivateRoute><CalendarLayout /></PrivateRoute>,
        children: [
            { path: '/', element: <CalendarPage /> },
            { path: '/*',element: <Navigate to={'/'} /> }
        ]
    }
]