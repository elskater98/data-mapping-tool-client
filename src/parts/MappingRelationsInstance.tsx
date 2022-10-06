import {useEffect, useState} from "react";
import InstanceService from "../services/InstanceService";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Card, Col, Form, message, Row, Select, Space} from "antd";
import {useForm} from "antd/lib/form/Form";
import FileService from "../services/FileService";
import {ArrowRightOutlined} from '@ant-design/icons';

const MappingRelationsInstance = () => {

    const instanceService = new InstanceService();
    const fileService = new FileService();

    const {state} = useLocation();
    const navigate = useNavigate()
    const {_id, relation}: any = state;

    const [form] = useForm();

    const [instance, setInstance] = useState<any>({});
    const [fromOptions, setFromOptions] = useState<any>([]);
    const [toOptions, setToOptions] = useState<any>([]);
    const [loading, setLoading] = useState({instance: false})

    const getSample = (selected_file: string) => {
        return fileService.sample(selected_file).catch(err => message.error(err.toString()))
    }

    const getInstance = () => {
        setLoading({...loading, instance: true});
        instanceService.getInstance(_id).then((res) => {
            let aux_instance = res.data.data;
            setInstance(aux_instance)

            form.setFieldsValue({
                from_rel: aux_instance.relations[relation.relation].from_rel,
                to_rel: aux_instance.relations[relation.relation].to_rel
            })
            const to_file = aux_instance.mapping[relation.to].fileSelected
            const from_file = aux_instance.mapping[relation.from].fileSelected


            getSample(from_file).then((res) => {
                setFromOptions(res.data.columns.map((i: string) => {
                    return {value: i, label: i}
                }))
            })

            getSample(to_file).then((res) => {
                setToOptions(res.data.columns.map((i: string) => {
                    return {value: i, label: i}
                }))
            })
            setLoading({...loading, instance: false});
        }).catch((err) => {
            message.error(err.toString())
            setLoading({...loading, instance: false});

        })
    }


    const onFinish = () => {
        let newInstance = instance;
        newInstance.relations[relation.relation].from_rel = form.getFieldValue('from_rel')
        newInstance.relations[relation.relation].to_rel = form.getFieldValue('to_rel')
        instanceService.editInstances(_id, {relations: newInstance.relations}).catch(err => message.error(err.toString()))
        navigate(-1)
    }

    const back = () => {
        navigate(-1)
    }

    useEffect(() => {
        getInstance()
    }, [])

    return <>
        <Form form={form} onFinish={onFinish} layout={"vertical"}>
            <Space direction={"vertical"} size={"large"}>
                <Row>
                    <Space size={"large"}>
                        <Col>
                            <Card title={relation.from}>
                                <Form.Item name={"from_rel"} label={"From Variable"}>
                                    <Select options={fromOptions}/>
                                </Form.Item>
                            </Card>
                        </Col>

                        <Col>
                            <h3>{relation.relation}</h3>
                            <Button style={{marginLeft: "40%"}} type={"dashed"}
                                    size={"large"} shape={"circle"} icon={<ArrowRightOutlined/>}/>

                        </Col>

                        <Col>
                            <Card title={relation.to}>
                                <Form.Item name={"to_rel"} label={"To Variable"}>
                                    <Select options={toOptions}/>
                                </Form.Item>
                            </Card>

                        </Col>
                    </Space>
                </Row>
                <Row>
                    <Form.Item>
                        <Space>
                            <Button onClick={back}>Back</Button>
                            <Button type={"primary"} htmlType="submit">Submit</Button>
                        </Space>
                    </Form.Item>
                </Row>
            </Space>
        </Form>
    </>

}
export default MappingRelationsInstance;