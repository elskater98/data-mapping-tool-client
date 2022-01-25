import React, {Fragment} from "react";
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

const NoFound = () => {
    let navigate = useNavigate();
    return (
        <Fragment>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button onClick={() => {
                    navigate("/")
                }} type="primary">Back Home</Button>}
            />
        </Fragment>
    );
};

export default NoFound;