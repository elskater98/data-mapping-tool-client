import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import OntologyService from "../services/OntologyService";
import {Card, Col, message, Progress, Row, Table, Tag} from "antd";
import InstanceService from "../services/InstanceService";
import {SettingOutlined} from '@ant-design/icons';

const {Column} = Table;
const {Meta} = Card;
const MappingPage = () => {
    const params = useParams();
    const ontologyService = new OntologyService();
    const instanceService = new InstanceService();
    const [classes, setClasses] = useState<any>([]);
    const [instance, setInstance] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const getInstanceInfo = () => {
        setLoading(true)
        instanceService.getInstance(params.id).then((res) => {
            setInstance(res.data['data'])
            setLoading(false);
        }).catch((err) => {
            message.error(err.toString())
            setLoading(false);
        })
    }

    const editInstance = () => {
        console.log(params.id)
        console.log(instance)
    }

    useEffect(() => {
        getInstanceInfo();
    }, []);

    return (<>
        <Row>
            <Col span={1}/>
            <Col span={10}>
                <Table>

                </Table>
            </Col>
            <Col span={2}/>
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