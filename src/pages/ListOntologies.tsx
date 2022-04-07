import React, {Fragment, useEffect, useState} from "react";
import OntologyService from "../services/OntologyService";
import {Button, Col, Form, Input, message, Modal, Popconfirm, Row, Select, Space, Table, Tooltip, Upload} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    GlobalOutlined,
    InboxOutlined,
    LockOutlined,
    PlusOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons";
import {useForm} from "antd/lib/form/Form";
import {Option} from "antd/es/mentions";
import ConfigService from "../services/ConfigService";
import AuthService from "../services/AuthService";

const {Dragger} = Upload;
const {Column} = Table;

const ListOntologies = () => {
    const ontologyService = new OntologyService();
    const authService = new AuthService();
    const configService = new ConfigService().getConfig();

    const [dataSource, setDataSource] = useState<any>([])
    const [loading, setLoading] = useState<any>({ontologies: false})
    const [fileAccess, setFileAccess] = useState<any>("")

    const [createOntology, setCreateOntology] = useState<boolean>(false)
    const [createForm] = useForm();

    const gatherOntologies = () => {
        setLoading({...loading, ontologies: true})

        ontologyService.getOntologies().then((res) => {
            setDataSource(res.data.data)
            setLoading({...loading, ontologies: false})
        }).catch(err => {
            message.error(err.toString())
            setLoading({...loading, ontologies: false})
        })

    }

    const create = () => {
        setCreateOntology(true)
    }

    const closeCreateModal = () => {
        createForm.resetFields()
        setCreateOntology(false);
        gatherOntologies()
    }

    const onFinishCreateForm = () => {
        closeCreateModal();
    }

    const onChangeDragger = (info: any) => {
        const {status} = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`, 2);
        }
    }

    const remove = (id: string) => {
        ontologyService.removeOntology(id).then(res => gatherOntologies()).catch(err => message.error(err.toString()))
    }

    useEffect(() => {
        gatherOntologies()
    }, [])

    return (<>

        <Modal visible={createOntology} onCancel={closeCreateModal} onOk={createForm.submit} width={"100vh"}>
            <Form form={createForm} layout={"vertical"} onFinish={onFinishCreateForm}
                  initialValues={{visibility: "private"}}>
                <Row>
                    <Col span={10}>
                        <Form.Item name={"ontology_name"} label={"Name"} rules={[{required: true}]} hasFeedback>
                            <Input placeholder={"Ontology Name"} onChange={() => {
                                setFileAccess(createForm.getFieldValue("ontology_name"))
                            }}/>
                        </Form.Item>
                    </Col>
                    <Col span={2}/>
                    <Col span={10}>
                        <Form.Item name={"file"} label={"Upload Ontology"}
                                   rules={[{required: true}]}>
                            <Dragger accept={".owl"}
                                     disabled={fileAccess == ""}
                                     action={configService.api_url + "/ontology/" + createForm.getFieldValue("ontology_name")}
                                     headers={{Authorization: "Bearer " + authService.hasCredentials()}}
                                     onChange={onChangeDragger}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined/>
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">
                                    Support for a single or bulk upload. Strictly prohibit from uploading company
                                    data or other
                                    band files.
                                </p>
                            </Dragger>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </Modal>

        <Row>
            <Col span={23}/>
            <Col span={1}>
                <Button type={"primary"} shape="circle" icon={<PlusOutlined/>} onClick={create}/>
            </Col>
        </Row>
        <Row style={{marginTop: "3vh"}}>
            <Col span={24}>
                <Table size={"middle"} dataSource={dataSource}
                       loading={loading.ontologies}
                       pagination={{defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10]}}
                       bordered={true}
                       rowKey={record => record._id.$oid}
                       scroll={{x: 1300}}>
                    <Column align={"center"} title="Ontology Name" dataIndex="ontology_name" key="ontology_name"/>
                    <Column align={"center"} title="Description" dataIndex="description" key="description"/>
                    <Column align={"center"} title="Visibility" dataIndex="visibility" key="visibility"
                            render={(value, record, index) => {
                                return value === 'private' ? <LockOutlined/> : <GlobalOutlined/>

                            }}/>

                    <Column align={"center"} title="Actions" fixed={"right"}
                            render={(value, record, index) => (
                                <Fragment>
                                    <Space size={"large"}>

                                        <Tooltip title="Edit">
                                            <Button shape="circle" icon={<EditOutlined/>} onClick={() => {

                                            }}/>
                                        </Tooltip>

                                        <Popconfirm title="Are you sure？" onConfirm={() => {
                                            remove(value._id.$oid)
                                        }}
                                                    icon={<QuestionCircleOutlined style={{color: 'red'}}/>}>
                                            <a href="#"><Button shape="circle" icon={<DeleteOutlined/>}/></a>
                                        </Popconfirm>
                                    </Space>
                                </Fragment>)}/>
                </Table>

            </Col>
        </Row>
    </>)
}

export default ListOntologies;