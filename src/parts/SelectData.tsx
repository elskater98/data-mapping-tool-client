import {Fragment, useEffect, useState} from "react";
import {Col, message, Row, Table, Transfer} from "antd";
import store from "../store";
import MappingService from "../services/MappingService";
import {handleSampleStep, setColumns, setSelectedColumns} from "../actions/instances_actions";

const SelectData = () => {
    const filename = store.getState().instance.file.name;
    const fileService = new MappingService();
    const [tableData, setTableData] = useState<any>([]);
    const [columns, setTableColumns] = useState<any>([]);

    const [data, setData] = useState([{
        key: "init".toString(),
        title: "init",
        description: `description of content${"init" + 1}`,
        chosen: false
    }]);

    const [targetKeys, setTargetKeys] = useState(store.getState().instance.columnsSelected);

    const getSample = () => {
        fileService.getSample(filename).then((res) => {
            setTableData(res.data['data']);
            message.info("The data has been loaded successfully.", 1);
            store.dispatch(handleSampleStep(true))
        }).catch((err) => {
            message.error(err, 3)
        })

        fileService.getColumns(filename).then((res) => {
            let cols = res.data['columns'].map((i: string, index: number) => {
                return {title: i, dataIndex: i, key: index}
            });
            setTableColumns(cols);
        }).catch((err) => {
            message.error(err, 3)
        });
    }

    const getColums = () => {
        fileService.getColumns(filename).then((res) => {
            let cols = res.data['columns'].map((i: string) => {
                return {
                    key: i.toString(),
                    title: i,
                    description: `description of content${i + 1}`,
                    chosen: true
                };
            })
            setData(cols);
            store.dispatch(setColumns(res.data['columns']));
        }).catch((err) => {
            message.error(err, 3)
        });

    }

    useEffect(() => {
        getSample();
        getColums();

    }, []);

    const onChange = (newTargetKeys: any, direction: any, moveKeys: any) => {
        setTargetKeys(newTargetKeys);
        store.dispatch(setSelectedColumns(newTargetKeys))
    };

    return (
        <Fragment>
            <Row>
                <Col span={1}/>
                <Col span={10}>
                    <Table columns={columns} size={"small"} dataSource={tableData} scroll={{x: "10vh"}}
                           bordered={true}/>
                </Col>
                <Col span={1}/>
                <Col span={11}>
                    <Transfer
                        titles={['Source', 'Target']}
                        listStyle={{width: "55vh", height: "60vh"}}
                        dataSource={data}
                        targetKeys={targetKeys}
                        onChange={onChange}
                        render={item => item.title}/>
                </Col>
            </Row>


        </Fragment>
    );
}
export default SelectData;