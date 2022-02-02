import {Fragment, useEffect, useState} from "react";
import OntologyService from "../services/OntologyService";
import {Card, Form, message, Select, Tag} from "antd";
import store from "../store";
import {InfoCircleOutlined} from '@ant-design/icons';
import {setProperties, setSelectedClasses} from "../actions/mapping_actions";
import MappingService from "../services/MappingService";
import {useParams} from "react-router-dom";

const MappingClasses = () => {
    const ontologyService = new OntologyService();
    const mappingService = new MappingService();
    const params = useParams();
    const [classes, setClasses] = useState<any>([]);
    const [auxProperties, setAuxProperties] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const getMappingData = () => {
        mappingService.getMappingInstance(params['id']).then((res) => {
            store.dispatch(setProperties(
                res.data['mappings']['selectedColumns'].map((item: any, index: any) => {
                    return {key: index, columnName: item, ontology: []}
                })
            ));
        }).catch((err) => {
            message.error(err.toString())
        });
    }

    const getOntologyClasses = () => {
        ontologyService.getClasses().then((res) => {
            setClasses(res.data['data']);
            setLoading(false);
        }).catch((err) => {
            message.error(err.toString())
            setLoading(false);
        })
    }

    useEffect(() => {
        if (store.getState().mapping.properties.length === 0)
            getMappingData();
        getOntologyClasses();
    }, [])

    const onChange = (value: string) => {
        store.dispatch(setSelectedClasses(value));
    }

    store.subscribe(() => {
        setAuxProperties(store.getState().mapping.properties)
    })

    return (<Fragment>
        <Form layout="vertical" style={{width: "80%", marginLeft: "10%"}}
              initialValues={{select_classes: store.getState().mapping.classesSelected}}>
            <Form.Item label="Available Columns:" name="available_columns" style={{overflow: "auto", height: "5%"}}>
                <Card loading={setAuxProperties.length == 0}>
                    {store.getState().mapping.properties.map((item: any) => {
                        return <Tag key={item.key} color={"blue"}>{item.columnName}</Tag>
                    })}
                </Card>
            </Form.Item>
            <Form.Item label="Ontology Classes:" name="select_classes" rules={[{required: true}]}
                       tooltip={{title: 'Select the classes that will use.', icon: <InfoCircleOutlined/>}}>
                <Select loading={loading}
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