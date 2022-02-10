import {useLocation, useNavigate} from "react-router-dom";
import {Button, Col, message, Row, Select, Table} from "antd";
import {useEffect, useState} from "react";
import InstanceService from "../services/InstanceService";
import FileService from "../services/FileService";
import OntologyService from "../services/OntologyService";

const {Column} = Table;

const MappingInstance = (props: any) => {

    const {state} = useLocation();
    const navigate = useNavigate()
    const {ref, _class, files}: any = state;

    const instanceService = new InstanceService();
    const ontologyService = new OntologyService();
    const fileService = new FileService();

    const [columns, setColumns] = useState<any>([])
    const [instance, setInstance] = useState<any>({})
    const [properties, setProperties] = useState<any>([])
    const [mapping, setMapping] = useState<any>({})


    const getInstance = () => {

        instanceService.getInstance(ref).then((res) => {
            setInstance(res.data.data);
            setMapping(res.data.data.mapping[_class].columns);
        }).catch((err) => {
            message.error(err.toString());
        })
    }

    const getOntology = () => {

        ontologyService.getProperties("data", {classes: _class}).then((res) => {
            setProperties(res.data.data)
        }).catch((err) => {
            message.error(err.toString())
        })
    }

    const back = () => {
        navigate(-1)
    }

    const submit = () => {
        let newInstance = instance;
        newInstance.mapping[_class].columns = mapping
        instanceService.editInstances(ref, newInstance)
    }

    const onChange = (selectedValue: any, ontology_value: any) => {
        let newMapping = mapping;
        newMapping[ontology_value.name] = selectedValue
        setMapping(newMapping);
    }

    useEffect(() => {
        getOntology()
        getInstance()
    }, [])

    return (
        <>
            <Row>
                <Col span={24}>
                    <Table bordered={true} loading={properties.length === 0} dataSource={properties}>
                        <Column title={"Property"} dataIndex={"value"}/>
                        <Column title={"Column"} render={(ontology_value, record, index) => {
                            return (<>
                                <Select mode={"multiple"} style={{width: "50vh"}}
                                        loading={columns.length === 0 && Object.keys(mapping).length === 0}
                                        defaultValue={mapping[ontology_value.name]}
                                        options={columns} onChange={(selectedValue, option) => {
                                    onChange(selectedValue, ontology_value)
                                }}/>
                            </>)
                        }}/>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={back}>Back</Button>
                    <Button style={{marginLeft: "1vh"}} onClick={submit}>Submit</Button>
                </Col>
            </Row>


        </>
    )

}
export default MappingInstance;