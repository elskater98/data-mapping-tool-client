import {Button, Col, Divider, Drawer, Form, Input, message, Modal, Row, Space, Switch} from 'antd';
import {EditOutlined, LockOutlined, LogoutOutlined, UserOutlined, KeyOutlined} from '@ant-design/icons';
import React, {Fragment, useState} from "react";
import {useCookies} from 'react-cookie';
import AuthService from "../services/AuthService";
import store from "../store";
import {setUserInfo} from "../actions/main_actions";
import UserService from "../services/UserService";
import {useForm} from "antd/lib/form/Form";
import {PasswordInput} from "antd-password-input-strength";

const CustomHeader = () => {
    const authService = new AuthService();
    const userService = new UserService();

    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token']);
    const [visible, setVisible] = useState(false);
    const [userInfoVisible, setUserInfoVisible] = useState(false);
    const [isLogged, setIsLogged] = useState(typeof cookies.access_token != 'undefined');
    const [isEditable, setIsEditable] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    const [form] = useForm();
    const [userForm] = useForm();
    const [passwordForm] = useForm();

    const logOut = () => {
        removeCookie('access_token', {path: '/'});
        removeCookie('refresh_token', {path: '/'});
        setIsLogged(false);
        window.location.reload();
    }

    const logIn = (values: any) => {
        authService.getCredentials(values.email, values.password).then((data) => {
            setCookie('access_token', data.data['access_token'], {path: '/', maxAge: 259200});
            setCookie('refresh_token', data.data['access_token'], {path: '/', maxAge: 259200});
            setIsLogged(true);
            onClose();
            window.location.reload();

        }).catch((err) => {
            console.log(err);
            message.error("Failed log In.", 1)
        })
    };

    const getUserInfo = () => {
        if (Object.keys(store.getState().main.user).length === 0) {
            authService.getProfile().then((res) => {
                let user = res.data.data;
                store.dispatch(setUserInfo(user));
            }).catch(err => message.error(err.toString()))
        }
    }

    let unsubscribe = store.subscribe(() => {
        userForm.setFieldsValue(store.getState().main.user);
    })


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

    const showUserDrawer = () => {
        setUserInfoVisible(true)
        getUserInfo()
    }

    const closeUser = () => {
        setIsHidden(true);
        setIsEditable(false);
        userForm.resetFields();
        userForm.setFieldsValue(store.getState().main.user)

        passwordForm.resetFields();
        setUserInfoVisible(false)
    }

    const onFinishUser = () => {
        let user = store.getState().main.user;
        userService.editUser(user.username, userForm.getFieldsValue()).then((res) => {
            store.dispatch(setUserInfo(res.data.user));
            message.success("Your changes have been saved successfully.")
            closeUser()
        }).catch(err => message.error(err.toString()))
    }

    const onFinishPassword = () => {
        let user = store.getState().main.user;
        userService.changePassword(user.username, passwordForm.getFieldsValue()).then((res) => {
            message.success("Your changes have been saved successfully.")
            closeUser();
        }).catch((err) => {
            let error = err.response.data;
            let _message = `${error.error} Password require at least: ${error.password_requirements}.`
            message.error(_message)
        })

    }


    return (
        <Fragment>
            <Space size={"large"}>
                <Button hidden={!isLogged} type="primary" icon={<UserOutlined/>} shape={"circle"}
                        onClick={showUserDrawer}/>

                <Button type="primary" onClick={showDrawer}
                        icon={!isLogged ? <UserOutlined/> : <LogoutOutlined/>}>
                    {!isLogged ? "Log In" : "Log Out"}
                </Button>
            </Space>

            <Modal visible={userInfoVisible}
                   onCancel={closeUser} onOk={isEditable ? userForm.submit : closeUser}>

                <Form layout={"vertical"} form={userForm} onFinish={onFinishUser}>
                    <h3><b>User Profile</b></h3>
                    <Form.Item label={"First Name"} name={"firstName"}>
                        <Input disabled={!isEditable}/>
                    </Form.Item>

                    <Form.Item label={"Last Name"} name={"lastName"}>
                        <Input disabled={!isEditable}/>
                    </Form.Item>
                    <Space>
                        <Switch checked={isEditable} onClick={() => {
                            setIsEditable(!isEditable)
                        }}/>
                        <EditOutlined/>
                    </Space>
                </Form>
                <Divider/>

                <Space>
                    <Switch checked={!isHidden} onClick={() => {
                        setIsHidden(!isHidden)
                    }}/>
                    <KeyOutlined/>
                </Space>


                <Form style={{marginTop: "5%"}} layout={"vertical"} form={passwordForm} hidden={isHidden}
                      onFinish={onFinishPassword}>

                    <Form.Item label={"Current Password"} name={"currentPassword"} hasFeedback>
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label={"New Password"}
                        name={"newPassword"}
                        rules={[
                            {
                                required: !isHidden,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback>
                        <PasswordInput/>
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={['newPassword']}
                        hasFeedback
                        rules={[
                            {
                                required: !isHidden,
                                message: 'Please confirm your password!',
                            },
                            ({getFieldValue}) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Button htmlType={"submit"} type={"primary"}>Change Password</Button>
                </Form>


            </Modal>


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
                        rules={[{required: true, message: 'Please input your Email!'}]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Email"/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your Password!'}]}>
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}/>
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

export default CustomHeader;