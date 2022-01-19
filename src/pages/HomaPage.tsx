import React, {Fragment} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "antd";
import {BlockOutlined} from '@ant-design/icons';
import store from "../store";
import {initStepper} from "../actions";

const HomaPage = (props: any) => {
    let navigate = useNavigate();
    // TODO: If the user is not logged in forbidden upload file

    const initMappingPage = () => {
        store.dispatch(initStepper());
        navigate('/mapping');
    }

    return (
        <Fragment>
            <Button shape="round" icon={<BlockOutlined/>} block={true} type={"primary"} onClick={initMappingPage}>Mapping
                Data</Button>
        </Fragment>
    );
}

export default HomaPage;