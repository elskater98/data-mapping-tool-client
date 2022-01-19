import React, {Fragment} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "antd";
import {BlockOutlined} from '@ant-design/icons';

const HomaPage = (props: any) => {
    let navigate = useNavigate();
    // TODO: If the user is not logged in forbidden upload file
    return (
        <Fragment>
            <Button shape="round" icon={<BlockOutlined/>} block={true} type={"primary"} onClick={() => {
                navigate('/mapping')
            }}>Mapping Data</Button>
        </Fragment>
    );
}

export default HomaPage;