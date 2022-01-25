import React, {Fragment} from "react";
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

const UnauthorizedPage = () => {
    let navigate = useNavigate();
    return (
        <Fragment>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary" onClick={() => {
                    navigate("/")
                }}>Back Home</Button>}
            />
        </Fragment>
    );
};

export default UnauthorizedPage;