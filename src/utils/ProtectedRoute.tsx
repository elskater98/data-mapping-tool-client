import React from 'react';
import {Roles} from "./Roles";
import AuthService from "../services/AuthService";

const ProtectedRoute = ({children, roles}: { children: JSX.Element, roles: Array<Roles> }) => {
    // TODO: Manage if the user is logged in and roles
    const authService = new AuthService()
    authService.getUserInfo().then((res) => {
        console.log(res.data.claims)
    })
    return children;
}
export default ProtectedRoute;