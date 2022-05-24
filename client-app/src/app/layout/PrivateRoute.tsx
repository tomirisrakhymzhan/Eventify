import { Navigate, Outlet } from "react-router-dom";

interface Props {
    isLoggedIn: boolean;
    redirectPath?: string ;
    children?: React.ReactElement | null;
}

export default function PrivateRoute({
    isLoggedIn,
    redirectPath = '/',
    children,
  }:Props) {
    if(!isLoggedIn) {
        return <Navigate to={redirectPath} replace/>;
    }
    return children ? children : <Outlet/>;
}
