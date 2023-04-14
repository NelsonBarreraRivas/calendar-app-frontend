import { RouteObject } from "react-router-dom";
import { AuthRoutes } from "../auth";
import { CalendarRoutes } from "../calendar";

export const routesConfig: RouteObject[] = [
    ...AuthRoutes,
    ...CalendarRoutes
]