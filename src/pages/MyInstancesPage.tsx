import {Fragment, useEffect, useState} from "react";
import {Button, Col, message, Row, Table, Tag} from "antd";
import MappingService from "../services/MappingService";
import {Progress} from 'antd';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';

const {Column} = Table;

const MyInstancesPage = () => {
    const [data, setData] = useState<any>([]);
    const mappingService = new MappingService();

    useEffect(() => {
        mappingService.getMappingInstances().then((res) => {
            let _data = res.data["mappings"].map((i: any, index: number) => {
                i['key'] = i['ref']
                i['index'] = index
                return i
            });
            setData(_data);
        }).catch((err) => {
            message.error(err.toString())
        });
    }, [])

    console.log(data);

    return (<Fragment>
        <Table size={"middle"} dataSource={data}
               bordered={true}
               scroll={{x: 1300}}
               expandable={{
                   expandedRowRender: record => <p style={{margin: 0}}>Created
                       at: <b>{record['createdAt']} </b> by <b>{record['createdBy']}</b></p>,
               }}>
            <Column title="Ref." dataIndex="ref" key="ref"/>
            <Column title="Filename" dataIndex="filename" key="filename"/>
            <Column title="Raw Columns" dataIndex="rawColumns" key="rawColumns"
                    render={i => (<Fragment>{i.slice(0, 5).map((j: any) => (
                        <Tag color="blue" key={j}>{j}</Tag>))}{i.length > 5 ? "..." : ""}</Fragment>)}/>
            <Column title="Selected Columns" dataIndex="selectedColumns" key="selectedColumns"
                    render={i => (<Fragment>{i.slice(0, 5).map((j: any) => (
                        <Tag color="green" key={j}>{j}</Tag>))}{i.length > 5 ? "..." : ""}</Fragment>)}/>
            <Column title="Status" dataIndex="finished" key="finished"
                    render={i => (
                        <Fragment>{i ? <Progress percent={100} steps={5} size="small" strokeColor="#52c41a"/> :
                            <Progress percent={50} steps={5} size="small" strokeColor="#ff4d4f"
                                      status="exception"/>}</Fragment>)}/>
            <Column title="Actions" key="operation" fixed={"right"}
                    render={(i, record: any) => (
                        <Fragment>
                            <Row>
                                <Col span={5}>
                                    <Button shape="circle" icon={<EditOutlined/>} onClick={() => {
                                    }}/>
                                </Col>
                                <Col span={5}>
                                    <Button shape="circle" icon={<DeleteOutlined/>} onClick={() => {
                                    }}/>
                                </Col>
                            </Row>

                        </Fragment>)}/>

        </Table>
    </Fragment>)

}

export default MyInstancesPage;