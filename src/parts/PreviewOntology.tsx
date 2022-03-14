import OntologyService from "../services/OntologyService";
import {useEffect, useState} from "react";
import {Col, message, Row} from "antd";
import ReactFlow, {
    addEdge,
    Background,
    Connection,
    Controls,
    Edge,
    Elements,
    MiniMap,
    removeElements
} from "react-flow-renderer";
import {getLayoutedElements} from "../utils/ReactFlowUtils";

const PreviewOntology = () => {

    const ontologyService = new OntologyService();
    const [elements, setElements] = useState<any>([]);

    const onConnect = (params: Edge<any> | Connection) =>
        setElements((els: Elements<any>) =>
            addEdge({...params, type: 'smoothstep', animated: true}, els)
        );

    const onElementsRemove = (elementsToRemove: any) =>
        setElements((els: Elements<any>) => removeElements(elementsToRemove, els));

    useEffect(() => {
        ontologyService.getOntologyPreview().then((res) => {
            setElements(getLayoutedElements(res.data.classes.concat(res.data.relations), 'TB', 200, 50));
        }).catch(err => message.error(err.toString()))
    }, []);

    return (
        <>
            <Row style={{height: "100%"}}>
                <Col span={24}>
                    <ReactFlow elements={elements} onConnect={onConnect} onElementsRemove={onElementsRemove}
                               key="edges">
                        <Controls/>
                        <MiniMap/>
                        <Background color="#aaa" gap={16}/>
                    </ReactFlow>
                </Col>
            </Row>
        </>
    );

}

export default PreviewOntology;