import {Fragment, useEffect, useState} from "react";
import {message, Transfer} from "antd";
import store from "../store";
import MappingService from "../services/MappingService";
import {setColumns, setSelectedColumns} from "../actions";

const SelectData = () => {
    const filename = store.getState().instance.file.name;
    const fileService = new MappingService();

    const [data, setData] = useState([{
        key: "init".toString(),
        title: "init",
        description: `description of content${"init" + 1}`,
        chosen: false
    }]);

    const [targetKeys, setTargetKeys] = useState(store.getState().instance.columnsSelected);

    useEffect(() => {
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
            message.success("The columns has been generated successfully.", 1);
        }).catch((err) => {
            message.error(err, 3)
        });
    }, []);

    const onChange = (newTargetKeys: any, direction: any, moveKeys: any) => {
        setTargetKeys(newTargetKeys);
        store.dispatch(setSelectedColumns(newTargetKeys))
    };

    return (
        <Fragment>
            <Transfer
                style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}
                titles={['Source', 'Target']}
                listStyle={{width: "55vh", height: "60vh"}}
                dataSource={data}
                targetKeys={targetKeys}
                onChange={onChange}
                render={item => item.title}/>
        </Fragment>
    );
}
export default SelectData;