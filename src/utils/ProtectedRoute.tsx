import React, {Fragment} from 'react';
import {Roles} from "./Roles";
import AuthService from "../services/AuthService";

const ProtectedRoute = ({children, roles}: { children: JSX.Element, roles: Array<Roles> }) => {

    const authService = new AuthService()
    if (authService.hasCredentials()) {
        /*authService.getUserInfo().then((res) => {
            //console.log(res.data.claims) // Manage if the user has permissions
        })*/
        return children;
    }

    return (<Fragment>
        <h1>ERROR 401 : Unauthorized</h1>
    </Fragment>)


}
export default ProtectedRoute;