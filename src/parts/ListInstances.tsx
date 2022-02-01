import {Fragment, useEffect, useState} from "react";
import {Button, Col, Input, message, Popconfirm, Progress, Row, Table, Tag, Tooltip} from "antd";
import MappingService from "../services/MappingService";
import {
    CaretRightOutlined,
    DeleteOutlined,
    DownloadOutlined,
    QuestionCircleOutlined,
    SearchOutlined
} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {alphabeticalSort} from "../utils/sorter";
import store from "../store";
import {init} from "../actions/mapping_actions";

const {Column} = Table;

const MyInstancesPage = () => {
    const [data, setData] = useState<any>([]);
    const [dataSource, setDataSource] = useState<any>([]);
    const mappingService = new MappingService();
    const navigate = useNavigate();
    const create = (ref: string) => {
        store.dispatch(init());
        navigate("/mapping/" + ref)
    }
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        mappingService.getMappingInstances().then((res) => {
            let _data = res.data["mappings"].map((i: any, index: number) => {
                i['key'] = i['ref']
                i['index'] = index
                return i
            });
            setData(_data);
            setDataSource(_data);
        }).catch((err) => {
            message.error(err.toString())
        });
    }, [])

    const deleteInstance = (ref: string) => {
        mappingService.deleteMappingInstance(ref).then((res) => {
            message.success("The " + ref + "has been deleted successfully.")
        }).catch((err) => {
            message.error(err.toString())
        });
        setDataSource(dataSource.filter((i: any) => i['ref'] != ref))
    }

    const handleSearch = (value: string) => {
        value === '' ? setDataSource(data) : setDataSource(data.filter((i: any) => i.ref.includes(value)))
    }

    return (<Fragment>
        <Table size={"middle"} dataSource={dataSource}
               bordered={true}
               scroll={{x: 1300}}
               expandable={{
                   expandedRowRender: record => <p style={{margin: 0}}>Created
                       at: <b>{record['createdAt']} </b> by <b>{record['createdBy']}</b></p>,
               }}>
            <Column align={"center"} title="Ref." dataIndex="ref" key="ref"
                    sortDirections={['descend', 'ascend']}
                    sorter={{compare: (a: any, b: any) => alphabeticalSort(a.ref, b.ref), multiple: 3}}
                    filterIcon={() => <SearchOutlined/>}
                    filterDropdown={() => {
                        return (
                            <div style={{padding: 8}}>
                                <Input.Search
                                    allowClear={true}
                                    onSearch={ref => handleSearch(ref)}
                                    defaultValue={searchInput}
                                    placeholder={`Search Reference`}
                                    style={{marginBottom: 8, display: 'block'}}
                                />
                            </div>
                        );
                    }}
            />
            <Column align={"center"} title="Filename" dataIndex="filename" key="filename"
                    sortDirections={['descend', 'ascend']}
                    sorter={{compare: (a: any, b: any) => alphabeticalSort(a.filename, b.filename), multiple: 3}}/>
            {/*<Column align={"center"} title="Raw Columns" dataIndex="rawColumns" key="rawColumns"
                    render={(i) => (<Fragment>{i.slice(0, 5).map((j: any) => (
                        <Tag color="blue" key={j}>{j}</Tag>))}{i.length > 5 ? "..." : ""}</Fragment>)}/>*/}
            <Column align={"center"} title="Selected Columns" dataIndex="selectedColumns" key="selectedColumns"
                    render={(i) => (<Fragment>{i.slice(0, 5).map((j: any) => (
                        <Tag color="green" key={j}>{j}</Tag>))}{i.length > 5 ? "..." : ""}</Fragment>)}/>
            <Column align={"center"} title="Status" dataIndex="finished" key="finished"
                    render={(i) => (
                        <Fragment>{i ? <Progress percent={100} steps={5} size="small" strokeColor="#52c41a"/> :
                            <Progress percent={50} steps={5} size="small" strokeColor="#ff4d4f"
                                      status="exception"/>}</Fragment>)}
                    onFilter={(value, record) => record.finished === value}
                    filters={[{text: "True", value: true}, {text: "False", value: false}]}
                    sortDirections={['descend', 'ascend']}
                    sorter={{
                        compare: (a: any, b: any) => alphabeticalSort(a.finished.toString(), b.finished.toString()),
                        multiple: 3
                    }}/>
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