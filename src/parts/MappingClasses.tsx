import {Fragment, useEffect, useState} from "react";
import OntologyService from "../services/OntologyService";
import {Form, message, Select} from "antd";
import store from "../store";
import {InfoCircleOutlined} from '@ant-design/icons';
import {setSelectedClasses} from "../actions/mapping_actions";

const MappingClasses = () => {
    const ontologyService = new OntologyService();
    const [classes, setClasses] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        ontologyService.getClasses().then((res) => {
            setClasses(res.data['data']);
            setLoading(false);
        }).catch((err) => {
            message.error(err.toString())
            setLoading(false);
        })
    }, [])

    const onChange = (value: string) => {
        store.dispatch(setSelectedClasses(value));
    }

    return (<Fragment>
        <Form layout="vertical">
            <Form.Item label="Ontology Classes:" name="select_classes" rules={[{required: true}]}
                       style={{width: "80%", marginLeft: "10%"}}
                       tooltip={{title: 'Select the classes that will use.', icon: <InfoCircleOutlined/>}}>
                <Select loading={loading}
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