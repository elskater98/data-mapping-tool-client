import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space} from 'antd';
import {UserOutlined, LogoutOutlined} from '@ant-design/icons';
import React, {Fragment, useState} from "react";
import {useCookies, Cookies} from 'react-cookie';
import AuthService from "../services/AuthService";

const {Option} = Select;


const LoginDrawer = () => {
    const authService = new AuthService();
    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token']);
    const [visible, setVisible] = useState(false);
    const [isLogged, setIsLogged] = useState(typeof cookies.access_token == 'undefined');
    const [credentials, setCredentials] = useState({username: "", password: ""})
    const logOut = () => {
        removeCookie('access_token');
        removeCookie('refresh_token');
        setIsLogged(false);
    }

    const logIn = () => {
        authService.getCredentials(credentials.username, credentials.password).then((data) => {
            setCookie('access_token', data.data['access_token'], {path: '/'});
            setCookie('refresh_token', data.data['access_token'], {path: '/'});
            setIsLogged(true);
        }).catch((err) => {
            console.log(err);
        })
    }

    const showDrawer = () => {
        if (isLogged) {
            logOut();
        } else {
            setVisible(true);
        }
    };

    const onClose = () => {
        setVisible(false);
    };

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

                {/*<Form layout="vertical" hideRequiredMark>*/}
                {/*    <Row gutter={16}>*/}
                {/*        <Col span={12}>*/}
                {/*            <Form.Item*/}
                {/*                name="name"*/}
                {/*                label="Name"*/}
                {/*                rules={[{required: true, message: 'Please enter user name'}]}*/}
                {/*            >*/}
                {/*                <Input placeholder="Please enter user name"/>*/}
                {/*            </Form.Item>*/}
                {/*        </Col>*/}
                {/*        <Col span={12}>*/}
                {/*            <Form.Item*/}
                {/*                name="url"*/}
                {/*                label="Url"*/}
                {/*                rules={[{required: true, message: 'Please enter url'}]}*/}
                {/*            >*/}
                {/*                <Input*/}
                {/*                    style={{width: '100%'}}*/}
                {/*                    addonBefore="http://"*/}
                {/*                    addonAfter=".com"*/}
                {/*                    placeholder="Please enter url"*/}
                {/*                />*/}
                {/*            </Form.Item>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*    <Row gutter={16}>*/}
                {/*        <Col span={12}>*/}
                {/*            <Form.Item*/}
                {/*                name="owner"*/}
                {/*                label="Owner"*/}
                {/*                rules={[{required: true, message: 'Please select an owner'}]}*/}
                {/*            >*/}
                {/*                <Select placeholder="Please select an owner">*/}
                {/*                    <Option value="xiao">Xiaoxiao Fu</Option>*/}
                {/*                    <Option value="mao">Maomao Zhou</Option>*/}
                {/*                </Select>*/}
                {/*            </Form.Item>*/}
                {/*        </Col>*/}
                {/*        <Col span={12}>*/}
                {/*            <Form.Item*/}
                {/*                name="type"*/}
                {/*                label="Type"*/}
                {/*                rules={[{required: true, message: 'Please choose the type'}]}*/}
                {/*            >*/}
                {/*                <Select placeholder="Please choose the type">*/}
                {/*                    <Option value="private">Private</Option>*/}
                {/*                    <Option value="public">Public</Option>*/}
                {/*                </Select>*/}
                {/*            </Form.Item>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*    <Row gutter={16}>*/}
                {/*        <Col span={12}>*/}
                {/*            <Form.Item*/}
                {/*                name="approver"*/}
                {/*                label="Approver"*/}
                {/*                rules={[{required: true, message: 'Please choose the approver'}]}*/}
                {/*            >*/}
                {/*                <Select placeholder="Please choose the approver">*/}
                {/*                    <Option value="jack">Jack Ma</Option>*/}
                {/*                    <Option value="tom">Tom Liu</Option>*/}
                {/*                </Select>*/}
                {/*            </Form.Item>*/}
                {/*        </Col>*/}
                {/*        <Col span={12}>*/}
                {/*            <Form.Item*/}
                {/*                name="dateTime"*/}
                {/*                label="DateTime"*/}
                {/*                rules={[{required: true, message: 'Please choose the dateTime'}]}*/}
                {/*            >*/}
                {/*            </Form.Item>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*    <Row gutter={16}>*/}
                {/*        <Col span={24}>*/}
                {/*            <Form.Item*/}
                {/*                name="description"*/}
                {/*                label="Description"*/}
                {/*                rules={[*/}
                {/*                    {*/}
                {/*                        required: true,*/}
                {/*                        message: 'please enter url description',*/}
                {/*                    },*/}
                {/*                ]}*/}
                {/*            >*/}
                {/*                <Input.TextArea rows={4} placeholder="please enter url description"/>*/}
                {/*            </Form.Item>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</Form>*/}
            </Drawer>
        </Fragment>
    );

}

export default LoginDrawer;