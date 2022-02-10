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
    const [sample, setSample] = useState<any>({})
    const [columns, setColumns] = useState<any>([])
    const [instance, setInstance] = useState<any>({})
    const [properties, setProperties] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [mapping, setMapping] = useState<any>({})

    const getSample = () => {
        setLoading(true)
        fileService.sample(files[0]).then((res) => {
            setSample(res.data)
            setColumns(res.data.columns.map((i: any) => {
                return {value: i, label: i}
            }))
        }).catch((err) => {
            message.error(err.toString())
        })
    }

    const getInstance = () => {
        setLoading(true)
        instanceService.getInstance(ref).then((res) => {
            setInstance(res.data.data);
            console.log(res.data.data)
            setLoading(false);
        }).catch((err) => {
            message.error(err.toString());
            setLoading(false)
        })
    }

    const getOntology = () => {
        setLoading(true)
        ontologyService.getProperties("data", {classes: _class}).then((res) => {
            setProperties(res.data.data)
            setLoading(false);
        }).catch((err) => {
            message.error(err.toString())
            setLoading(false);
        })
    }

    const back = () => {
        navigate(-1)
    }

    const submit = () => {
        let newInstance = instance;
        newInstance.mapping[_class].columns = mapping
        instanceService.editInstances(ref, newInstance)
        // setInstance({...instance,mapping:{...instance.mapping,[_class]:{...instance.mapping[_class],columns:mapping}}})
    }

    const onChange = (selectedValue: any, ontology_value: any) => {
        let newMapping = mapping;
        newMapping[ontology_value.name] = selectedValue
        setMapping(newMapping);
    }

    useEffect(() => {
        getOntology()
        getSample()
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
                                <Select mode={"multiple"} style={{width: "50vh"}} loading={columns.length === 0}
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