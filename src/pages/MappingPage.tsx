import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import OntologyService from "../services/OntologyService";
import {Button, Card, Col, Form, message, Modal, Progress, Row, Select, Table, Tag} from "antd";
import InstanceService from "../services/InstanceService";
import {PlusCircleOutlined, SettingOutlined} from '@ant-design/icons';
import {useForm} from "antd/lib/form/Form";

const {Column} = Table;
const {Meta} = Card;
const MappingPage = () => {
    const params = useParams();
    const ontologyService = new OntologyService();
    const instanceService = new InstanceService();
    const [classes, setClasses] = useState<any>([]);
    const [instance, setInstance] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [form] = useForm();
    const [selected, setSelected] = useState<any>([]);

    const getInstanceInfo = () => {
        setLoading(true)
        instanceService.getInstance(params.id).then((res) => {
            setInstance(res.data.data)
            setLoading(false);
        }).catch((err) => {
            message.error(err.toString())
            setLoading(false);
        })
    }

    const getClasses = () => {
        ontologyService.getClasses().then((res) => {
            let data = res.data.data;
            setClasses(data);
        }).catch((err) => {
            message.error(err.toString())
        });
    }

    const editInstance = () => {
        console.log(params.id)
        console.log(instance)
    }

    useEffect(() => {
        getInstanceInfo();
        getClasses();
    }, []);

    const closeModal = () => {
        setVisible(false);
        form.resetFields();
    }

    const showModal = () => {
        setVisible(true);
    }

    const onFinish = () => {
        let values = form.getFieldValue('select');
        instanceService.editInstances(params.id, {classes_to_map: values}).then((res) => {
            setInstance({...instance, classes_to_map: values})
            closeModal();
        }).catch((err) => {
            message.error(err.toString())
        })
    }


    return (<>
        <Modal visible={visible} onCancel={closeModal} onOk={form.submit}>
            <Form layout={"vertical"} form={form} onFinish={onFinish}>
                <Form.Item name={"select"} label={"Classes"} rules={[{required: true}]}>
                    <Select mode="multiple" placeholder="Select the class/es that you would like to map."
                            options={classes} defaultValue={instance.classes_to_map}/>
                </Form.Item>
            </Form>
        </Modal>


        <Row>
            <Col span={1}/>
            <Col span={10}>

            </Col>
            <Col span={2} style={{paddingLeft: "2%"}}>
                <Button shape={"circle"} icon={<PlusCircleOutlined/>} onClick={showModal}/>
            </Col>
            <Col span={10}>
                <Card loading={loading} title={"Instance ref.: " + params.id}
                      actions={[<SettingOutlined onClick={editInstance} key="setting"/>]}>
                    <Meta title={<b>{instance.name}</b>}/>
                    <div style={{marginTop: "1%"}}>
                        <h4><b>{instance.createdAt}</b></h4>
                        <h4>Created By: <b>{instance.createdBy}</b></h4>
                        <Progress percent={instance.status} strokeColor="#52c41a"/>
                        <Card style={{marginTop: "1%"}} loading={loading}>
                            {instance.filenames?.map((i: any) => {
                                return <Tag key={i} color={"blue"}>{i}</Tag>
                            })}
                        </Card>
                    </div>
                </Card>
            </Col>
            <Col span={1}/>
        </Row>

    </>)

}
export default MappingPage;