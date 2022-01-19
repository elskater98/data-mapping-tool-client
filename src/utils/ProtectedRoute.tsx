import React from 'react';
import {Roles} from "./Roles";

const ProtectedRoute = ({children, roles}: { children: JSX.Element, roles: Array<Roles> }) => {
    // TODO: Manage if the user is logged in and roles
    return children;
}
export default ProtectedRoute;