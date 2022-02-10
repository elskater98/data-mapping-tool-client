import {useLocation, useNavigate} from "react-router-dom";
import {Button, Col, message, Row, Select, Steps, Table} from "antd";
import {useEffect, useState} from "react";
import InstanceService from "../services/InstanceService";
import FileService from "../services/FileService";
import OntologyService from "../services/OntologyService";

const {Column} = Table;

const MappingInstance = (props: any) => {

    const {state} = useLocation();
    const navigate = useNavigate()
    const {ref, _class, files, current_file}: any = state;

    const [selectedFile, setSelectedFile] = useState(current_file);

    const instanceService = new InstanceService();
    const ontologyService = new OntologyService();
    const fileService = new FileService();

    const [columns, setColumns] = useState<any>([])
    const [instance, setInstance] = useState<any>({})
    const [properties, setProperties] = useState<any>([])
    const [mapping, setMapping] = useState<any>({})


    const getSample = (filename: string) => {
        fileService.sample(filename).then((res) => {
            setColumns(res.data.columns.map((i: any) => {
                return {value: i, label: i}
            }))
        }).catch((err) => {
            message.error(err.toString())
        })
    }

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
        newInstance.mapping[_class].fileSelected = selectedFile
        instanceService.editInstances(ref, newInstance).catch((err) => {
            message.error(err.toString())
        })
        navigate(-1);
    }

    const onChangeTable = (selectedValue: any, ontology_value: any) => {
        setMapping({...mapping, ...mapping[ontology_value.name], [ontology_value.name]: selectedValue});
    }

    const onChangeSelectFile = (value: string) => {
        setSelectedFile(value);
        getSample(value);
    }
    useEffect(() => {
        getOntology()
        getSample(current_file)
        getInstance()
    }, [])

    return (
        <>
            <Row style={{marginBottom: "3vh"}}>
                <Col span={24}>
                    <Select style={{width: "50vh"}} options={files} loading={files.length === 0} value={selectedFile}
                            onChange={(value: string) => onChangeSelectFile(value)}/>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Table bordered={true} loading={properties.length === 0} dataSource={properties}>
                        <Column title={"Property"} dataIndex={"value"}/>
                        <Column title={"Column"} render={(ontology_value, record, index) => {
                            return (<>
                                <Select mode={"multiple"} style={{width: "50vh"}}
                                        loading={columns.length === 0}
                                        value={mapping[ontology_value.name]}
                                        options={columns} onChange={(selectedValue, option) => {
                                    onChangeTable(selectedValue, ontology_value)
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