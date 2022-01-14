import {Button, Col, Drawer, Form, Input, Row, message} from 'antd';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';
import React, {Fragment, useState} from "react";
import {useCookies} from 'react-cookie';
import AuthService from "../services/AuthService";

const LoginDrawer = () => {
    const authService = new AuthService();

    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token']);
    const [visible, setVisible] = useState(false);
    const [isLogged, setIsLogged] = useState(typeof cookies.access_token != 'undefined');

    const [form] = Form.useForm();

    const logOut = () => {
        removeCookie('access_token');
        removeCookie('refresh_token');
        setIsLogged(false);
    }

    const logIn = (values: any) => {
        authService.getCredentials(values.email, values.password).then((data) => {
            setCookie('access_token', data.data['access_token'], {path: '/'});
            setCookie('refresh_token', data.data['access_token'], {path: '/'});
            setIsLogged(true);
            onClose();
            message.success("Successful log In.", 0.5)
        }).catch((err) => {
            console.log(err);
            message.error("Failed log In.", 0.5)
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
        logIn(values);
    }


    return (
        <Fragment>
            <Button type="primary" onClick={showDrawer}
                    icon={!isLogged ? <UserOutlined/> : <LogoutOutlined/>}>
                {!isLogged ? "Log In" : "Log Out"}
            </Button>

            <Drawer
                title={!isLogged ? "Log In" : "Log Out"}
                width={400}
                onClose={onClose}
                visible={visible}
                bodyStyle={{paddingBottom: 80}}>

                <Form
                    layout="vertical"
                    hideRequiredMark
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{required: true, type: "email"}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true}]}>
                        <Input.Password/>
                    </Form.Item>

                    <Row>
                        <Col span={20}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
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