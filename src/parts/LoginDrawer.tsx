import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space} from 'antd';
import {UserOutlined, LogoutOutlined} from '@ant-design/icons';
import React from "react";

const {Option} = Select;

class LoginDrawer extends React.Component {
    state = {visible: false};
    isLogged = true;
    // sessionStorage, Redux ContextAPI

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {

        return (
            <>
                <Button type="primary" onClick={this.showDrawer}
                        icon={!this.isLogged ? <UserOutlined/> : <LogoutOutlined/>}>
                    {!this.isLogged ? "Log In" : "Log Out"}
                </Button>

                <Drawer
                    title={!this.isLogged ? "Log In" : "Log Out"}
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{paddingBottom: 80}}>

                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{required: true, message: 'Please enter user name'}]}
                                >
                                    <Input placeholder="Please enter user name"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="url"
                                    label="Url"
                                    rules={[{required: true, message: 'Please enter url'}]}
                                >
                                    <Input
                                        style={{width: '100%'}}
                                        addonBefore="http://"
                                        addonAfter=".com"
                                        placeholder="Please enter url"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="owner"
                                    label="Owner"
                                    rules={[{required: true, message: 'Please select an owner'}]}
                                >
                                    <Select placeholder="Please select an owner">
                                        <Option value="xiao">Xiaoxiao Fu</Option>
                                        <Option value="mao">Maomao Zhou</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="type"
                                    label="Type"
                                    rules={[{required: true, message: 'Please choose the type'}]}
                                >
                                    <Select placeholder="Please choose the type">
                                        <Option value="private">Private</Option>
                                        <Option value="public">Public</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="approver"
                                    label="Approver"
                                    rules={[{required: true, message: 'Please choose the approver'}]}
                                >
                                    <Select placeholder="Please choose the approver">
                                        <Option value="jack">Jack Ma</Option>
                                        <Option value="tom">Tom Liu</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="dateTime"
                                    label="DateTime"
                                    rules={[{required: true, message: 'Please choose the dateTime'}]}
                                >
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter url description',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="please enter url description"/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </>
        );
    }
}

export default LoginDrawer;