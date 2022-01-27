import {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import MappingService from "../services/MappingService";
import {message, Select, Table} from "antd";
import OntologyService from "../services/OntologyService";

const {Column} = Table;
const CreateMapping = () => {
    const params = useParams();

    const mappingService = new MappingService();
    const ontologyService = new OntologyService();

    const [dataSource, setDataSource] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<any>([]);


    const getMappingData = () => {
        setLoading(true);
        mappingService.getMappingInstance(params['id']).then((res) => {
            setDataSource(
                res.data['mappings']['selectedColumns'].map((item: any, index: any) => {
                    return {key: index, columnName: item, ontology: []}
                })
            );
            setLoading(false);
        }).catch((err) => {
            message.error(err.toString())
            setLoading(false)
        });
    }

    const getOntology = () => {
        ontologyService.getProperties("data").then((res) => {
            setOptions(res.data['data'])
        }).catch((err) => {
            message.error(err.toString())
        })
    }

    useEffect(() => {
        getMappingData();
        getOntology();
    }, [])

    const onChange = (value: string, record: any) => {
        let newDataSource = [...dataSource];
        newDataSource[record.key].ontology = value
        setDataSource(newDataSource)
    }

    return (
        <Fragment>
            <Table size={"middle"} dataSource={dataSource}
                   bordered={true}
                   loading={loading}
                   scroll={{x: 1300}}>
                <Column align={"center"} title={"Column"} dataIndex={"columnName"} key={"key"} width={"25%"}/>
                <Column align={"center"} title={"Data Properties"} dataIndex={"ontologyValue"} key={"key"}
                        render={(value, record: any, index) => (
                            <Select
                                mode="multiple"
                                showSearch={true}
                                allowClear={true}
                                value={dataSource[record.key].ontology}
                                options={options}
                                style={{width: "80%"}}
                                onChange={(value: string) => onChange(value, record)}
                            >
                            </Select>
                        )}/>
            </Table>
        </Fragment>
    );
}
export default CreateMapping;