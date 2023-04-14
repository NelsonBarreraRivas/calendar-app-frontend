import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks";


interface publicRouteProps {
    children: JSX.Element | JSX.Element[]
}
export const PublicRoute: FC<publicRouteProps> = ({ children }) => {
    
    const { status } = useAuthStore()

    return status != 'authenticated' ? <>{children}</> : <Navigate to={"/"} />;
};