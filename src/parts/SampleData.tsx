import {Fragment, useEffect, useState} from "react";
import store from "../store";
import FileService from "../services/FileService";
import {message, Table} from "antd";

const SampleData = () => {

    const filename = store.getState().mapping.file.name
    const fileService = new FileService();
    const [tableData, setTableData] = useState([]);
    const [columns, setTableColumns] = useState<any>([]);


    const getSample = () => {
        fileService.getSample(filename).then((res) => {
            setTableData(res.data['data']);
            console.log(res.data['data'])

            let cols = Object.keys(res.data['data'][0]).map((i) => {
                return {title: i, dataIndex: i, key: i}
            });

            setTableColumns(cols);
            message.success("The data has been loaded successfully.", 1);
        }).catch((err) => {
            message.error(err, 3)
        })
    }

    useEffect
    (() => {
        getSample();
    }, []);

    return (<Fragment>
        <Table columns={columns} dataSource={tableData} scroll={{x: "50vh"}} bordered={true}>

        </Table>
    </Fragment>);
}

export default SampleData;