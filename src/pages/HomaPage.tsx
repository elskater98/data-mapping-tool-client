import React, {Fragment} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Row} from "antd";
import {PlusOutlined, BlockOutlined} from '@ant-design/icons';
import store from "../store";
import {initStepper} from "../actions";

const HomaPage = (props: any) => {
    let navigate = useNavigate();
    // TODO: If the user is not logged in forbidden upload file

    const initInstancePage = () => {
        store.dispatch(initStepper());
        navigate('/instance');
    }

    const initMyConfig = () => {
        navigate('/config');
    }

    return (
        <Fragment>
            <Row>
                <Button shape="round" icon={<PlusOutlined/>} block={true} type={"primary"} onClick={initInstancePage}>Create
                    Mapping Configuration</Button>
            </Row>
            <Row style={{marginTop: "2%"}}>
                <Button shape="round" icon={<BlockOutlined/>} block={true} type={"primary"} onClick={initMyConfig}>My
                    Configs</Button>
            </Row>

        </Fragment>
    );
}

export default HomaPage;