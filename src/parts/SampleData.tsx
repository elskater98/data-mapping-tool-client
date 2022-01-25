import {Fragment, useEffect, useState} from "react";
import store from "../store";
import MappingService from "../services/MappingService";
import {message, Table} from "antd";
import {handleSampleStep} from "../actions";

const SampleData = () => {

    const filename = store.getState().mapping.file.name
    const fileService = new MappingService();
    const [tableData, setTableData] = useState<any>([]);
    const [columns, setTableColumns] = useState<any>([]);


    const getSample = () => {
        fileService.getSample(filename).then((res) => {
            setTableData(res.data['data']);
            message.success("The data has been loaded successfully.", 1);
            store.dispatch(handleSampleStep(true))
        }).catch((err) => {
            message.error(err, 3)
        })

        fileService.getColumns(filename).then((res) => {
            let cols = res.data['columns'].map((i: string) => {
                return {title: i, dataIndex: i, key: i}
            });
            setTableColumns(cols);
        }).catch((err) => {
            message.error(err, 3)
        });
    }

    useEffect
    (() => {
        getSample();
    }, []);

    return (<Fragment>
        <Table columns={columns} size={"middle"} dataSource={tableData} scroll={{x: "35vh"}} bordered={true}/>
    </Fragment>);
}

export default SampleData;