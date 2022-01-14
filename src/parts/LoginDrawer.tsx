import {Button, Col, Drawer, Form, Input, Row} from 'antd';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';
import React, {Fragment, useState} from "react";
import {useCookies} from 'react-cookie';
import AuthService from "../services/AuthService";

const LoginDrawer = () => {
    const authService = new AuthService();

    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token']);
    const [visible, setVisible] = useState(false);
    const [isLogged, setIsLogged] = useState(typeof cookies.access_token != 'undefined');
    const [credentials, setCredentials] = useState({email: "", password: ""});

    const [form] = Form.useForm();

    const logOut = () => {
        removeCookie('access_token');
        removeCookie('refresh_token');
        setIsLogged(false);
    }

    const logIn = () => {
        authService.getCredentials(credentials.email, credentials.password).then((data) => {
            setCookie('access_token', data.data['access_token'], {path: '/'});
            setCookie('refresh_token', data.data['access_token'], {path: '/'});
            setIsLogged(true);
            onClose();
        }).catch((err) => {
            console.log(err);
        })
    };

    const showDrawer = () => {
        if (isLogged) {
            logOut();
        } else {
            setVisible(true);
        }
    };

    const onClose = () => {
        form.resetFields();
        setVisible(false);
    };

    const onFinish = (values: any) => {
        setCredentials(values);
        logIn();
    }


    return (
        <Fragment>
            <Button type="primary" onClick={showDrawer}
                    icon={!isLogged ? <UserOutlined/> : <LogoutOutlined/>}>
                {!isLogged ? "Log In" : "Log Out"}
            </Button>

            <Drawer
                title={!isLogged ? "Log In" : "Log Out"}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{paddingBottom: 80}}>

                <Form
                    layout="vertical"
                    hideRequiredMark
                    form={form}
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{required: true, type: "email"}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{required: true}]}>
                                <Input.Password/>
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>

                        <Col span={3}>
                            <Form.Item>
                                <Button type="default" onClick={
                                    onClose
                                }>
                                    Close
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </Fragment>
    );

}

export default LoginDrawer;