import React from 'react';
import {Roles} from "./Roles";
import AuthService from "../services/AuthService";
import UnauthorizedPage from "../pages/UnauthorizedPage";

import jwt_decode from "jwt-decode";

const ProtectedRoute = ({children, roles}: { children: JSX.Element, roles: Array<Roles> }) => {

    const authService = new AuthService()

    let access_token = authService.hasCredentials();
    if (access_token) {
        let decoded: any = jwt_decode(access_token);
        return decoded.roles.some((r: any) => roles.includes(r)) ? children : <UnauthorizedPage/>;
    }

    return (<UnauthorizedPage/>)


}
export default ProtectedRoute;