import {Fragment, useEffect, useState} from "react";
import {Button, Col, message, Popconfirm, Progress, Row, Table, Tag, Tooltip} from "antd";
import MappingService from "../services/MappingService";
import {CaretRightOutlined, DeleteOutlined, DownloadOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {alphabeticalSort} from "../utils/sorter";

const {Column} = Table;

const MyInstancesPage = () => {
    const [data, setData] = useState<any>([]);
    const mappingService = new MappingService();
    const navigate = useNavigate();

    const getInstances = () => {
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
    }

    const create = (ref: string) => {
        navigate("/mapping/create/" + ref)
    }

    const sortCol = (a: any, b: any) => {
        console.log(a, b)
    }

    useEffect(() => {
        getInstances();
    }, [])

    const deleteInstance = (ref: string) => {
        mappingService.deleteMappingInstance(ref).then((res) => {
            message.success("The " + ref + "has been deleted successfully.")
        }).catch((err) => {
            message.error(err.toString())
        });
        setData(data.filter((i: any) => i['ref'] != ref))
    }

    return (<Fragment>
        <Table size={"middle"} dataSource={data}
               bordered={true}
               scroll={{x: 1300}}
               expandable={{
                   expandedRowRender: record => <p style={{margin: 0}}>Created
                       at: <b>{record['createdAt']} </b> by <b>{record['createdBy']}</b></p>,
               }}>
            <Column align={"center"} title="Ref." dataIndex="ref" key="ref"
                    sortDirections={['descend', 'ascend']} sorter={(a: any, b: any) => alphabeticalSort(a.ref, b.ref)}/>
            <Column align={"center"} title="Filename" dataIndex="filename" key="filename"
                    sortDirections={['descend', 'ascend']}
                    sorter={(a: any, b: any) => alphabeticalSort(a.filename, b.filename)}/>
            <Column align={"center"} title="Raw Columns" dataIndex="rawColumns" key="rawColumns"
                    render={(i) => (<Fragment>{i.slice(0, 5).map((j: any) => (
                        <Tag color="blue" key={j}>{j}</Tag>))}{i.length > 5 ? "..." : ""}</Fragment>)}/>
            <Column align={"center"} title="Selected Columns" dataIndex="selectedColumns" key="selectedColumns"
                    render={(i) => (<Fragment>{i.slice(0, 5).map((j: any) => (
                        <Tag color="green" key={j}>{j}</Tag>))}{i.length > 5 ? "..." : ""}</Fragment>)}/>
            <Column align={"center"} title="Status" dataIndex="finished" key="finished"
                    render={(i) => (
                        <Fragment>{i ? <Progress percent={100} steps={5} size="small" strokeColor="#52c41a"/> :
                            <Progress percent={50} steps={5} size="small" strokeColor="#ff4d4f"
                                      status="exception"/>}</Fragment>)}
                    sorter={(a: any, b: any) => alphabeticalSort(a.finished.toString(), b.finished.toString())}
            />
            <Column align={"center"} title="Actions" fixed={"right"}
                    render={(i) => (
                        <Fragment>
                            <Row>
                                <Col span={5}>
                                    <Tooltip title="Start Mapping">
                                        <Button shape="circle" icon={<CaretRightOutlined/>} onClick={() => {
                                            create(i['ref']);
                                        }}/>
                                    </Tooltip>
                                </Col>
                                {/*<Col span={5}>
                                    <Tooltip title="Edit">
                                        <Button shape="circle" icon={<EditOutlined/>} onClick={() => {
                                            console.log(i);
                                        }}/>
                                    </Tooltip>
                                </Col>*/}
                                <Col span={5}>
                                    <Popconfirm title="Are you sure？" onConfirm={() => {
                                        deleteInstance(i['ref'])
                                    }}
                                                icon={<QuestionCircleOutlined style={{color: 'red'}}/>}>
                                        <a href="#"><Button shape="circle" icon={<DeleteOutlined/>}/></a>
                                    </Popconfirm>
                                </Col>
                                <Col span={5}>
                                    <Tooltip title="Download">
                                        <Button shape="circle" icon={<DownloadOutlined/>} onClick={() => {
                                        }}/>
                                    </Tooltip>
                                </Col>
                            </Row>
                        </Fragment>)}/>

        </Table>
    </Fragment>)

}

export default MyInstancesPage;