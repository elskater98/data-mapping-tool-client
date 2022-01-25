import React, {Fragment} from 'react';
import {Roles} from "./Roles";
import AuthService from "../services/AuthService";
import UnauthorizedPage from "../pages/UnauthorizedPage";

const ProtectedRoute = ({children, roles}: { children: JSX.Element, roles: Array<Roles> }) => {

    const authService = new AuthService()
    if (authService.hasCredentials()) {
        /*authService.getUserInfo().then((res) => {
            //console.log(res.data.claims) // Manage if the user has permissions
        })*/
        return children;
    }

    return (<UnauthorizedPage></UnauthorizedPage>)


}
export default ProtectedRoute;