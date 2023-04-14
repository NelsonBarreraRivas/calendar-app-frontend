import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks";

interface privateRouteProps {
    children: JSX.Element | JSX.Element[]
}

export const PrivateRoute: FC<privateRouteProps> = ({ children }) => {

    const { status } = useAuthStore()

    return status == 'authenticated' ? <>{children}</> : <Navigate to={"/auth/login"} />;
};
