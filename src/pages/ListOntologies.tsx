import React, {Fragment, useEffect, useState} from "react";
import OntologyService from "../services/OntologyService";
import {Button, Col, message, Modal, Popconfirm, Row, Space, Table, Tooltip} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    GlobalOutlined,
    LockOutlined,
    PlusOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons";

const {Column} = Table;

const ListOntologies = () => {
    const ontologyService = new OntologyService();

    const [dataSource, setDataSource] = useState<any>([])
    const [loading, setLoading] = useState<any>({ontologies: false})

    const [createOntology, setCreateOntology] = useState<boolean>(false)

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
        setCreateOntology(false);
    }

    useEffect(() => {
        gatherOntologies()
    }, [])

    return (<>

        <Modal visible={createOntology} onCancel={closeCreateModal}>

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
                    <Column align={"center"} title="Ontology Name" dataIndex="ontology_name" key="ontology_name"/>
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