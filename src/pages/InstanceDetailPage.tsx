import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import OntologyService from "../services/OntologyService";
import {Button, Card, Col, Form, List, message, Modal, Progress, Row, Select, Tag} from "antd";
import InstanceService from "../services/InstanceService";
import {DownOutlined, PlusOutlined, SettingOutlined} from '@ant-design/icons';
import {useForm} from "antd/lib/form/Form";

const {Meta} = Card;
const InstanceDetailPage = () => {
    const params = useParams();

    const ontologyService = new OntologyService();
    const instanceService = new InstanceService();

    const [classes, setClasses] = useState<any>([]);
    const [instance, setInstance] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const [form] = useForm();
    const navigate = useNavigate();

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
        setInstance({...instance, classes_to_map: values});

        let aux_map: any = instance.mapping;
        if (Object.keys(instance.mapping).length == 0) {
            for (let i of classes) {
                aux_map[i.label] = {status: false, fileSelected: null, columns: {}}
            }
            setInstance({...instance, mapping: aux_map})
        }

        instanceService.editInstances(params.id, {
            classes_to_map: values,
            mapping: aux_map
        }).then((res) => {
            closeModal();
            setInstance({...instance, classes_to_map: values})
        }).catch((err) => {
            message.error(err.toString())
        })
    }

    const startMapping = (_class: string) => {
        navigate('mapping', {
            state: {
                ref: params.id, _class: _class, files: instance.filenames.map((i: any) => {
                    return {value: i, label: i}
                })
            }
        });
    }

    return (<>
        <Modal visible={visible} onCancel={closeModal} onOk={form.submit}>
            <Form layout={"vertical"} form={form} onFinish={onFinish}>
                <Form.Item name={"select"} label={"Classes"} rules={[{required: true}]}
                           initialValue={instance.classes_to_map}>
                    <Select mode="multiple" placeholder="Select the class/es that you would like to map."
                            options={classes}/>
                </Form.Item>
            </Form>
        </Modal>

        <Row>
            <Col span={1}/>
            <Col span={10} style={{scrollBehavior: "smooth", overflow: "auto", height: "75vh"}}>
                <div style={{width: "50vh"}}>
                    <List itemLayout={"vertical"}
                          size={"small"}
                          dataSource={instance.classes_to_map}
                          renderItem={(item: any) => (
                              <List.Item>
                                  <Row>
                                      <Col span={12}>{item}:</Col>
                                      <Col span={12}>
                                          <Button size={"small"} shape={"circle"} icon={<PlusOutlined/>}
                                                  onClick={() => startMapping(item)}/>
                                          {/*{instance.ref?.toString()}*/}
                                      </Col>
                                  </Row>
                              </List.Item>)
                          }>
                    </List>
                </div>

            </Col>
            <Col span={2} style={{paddingLeft: "2%"}}>
                <Button type={"primary"} shape="circle" icon={<DownOutlined/>} onClick={showModal}/>
            </Col>
            <Col span={10}>
                <Card loading={loading} title={"Ref.: " + params.id}
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
export default InstanceDetailPage;