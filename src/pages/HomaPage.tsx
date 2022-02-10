import React, {Fragment} from "react";
import {Outlet} from "react-router-dom";

const HomaPage = (props: any) => {
    return (
        <Fragment>
            <Outlet/>
        </Fragment>
    );
}
export default HomaPage;