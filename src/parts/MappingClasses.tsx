import {Fragment, useEffect, useState} from "react";
import OntologyService from "../services/OntologyService";
import {Form, message, Select} from "antd";
import store from "../store";
import {setSelectedClasses} from "../actions/mapping_actions";

const MappingClasses = () => {
    const ontologyService = new OntologyService();
    const [classes, setClasses] = useState<any>([]);


    useEffect(() => {
        ontologyService.getClasses().then((res) => {
            setClasses(res.data['data']);
        }).catch((err) => {
            message.error(err.toString())
        })
    }, [])

    const onChange = (value: string) => {
        store.dispatch(setSelectedClasses(value));
    }

    return (<Fragment>
        <Form layout="vertical">
            <Form.Item label="Select Classes:" name="select_classes" rules={[{ required: true }]} style={{width:"80%",marginLeft:"10%"}}>
                <Select
                    defaultValue={store.getState().mapping.classesSelected}
                    mode="multiple"
                    showSearch={true}
                    allowClear={true}
                    options={classes}

                    onChange={onChange}
                />
            </Form.Item>
        </Form>

    </Fragment>)
}
export default MappingClasses;