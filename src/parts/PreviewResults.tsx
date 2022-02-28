import {useLocation} from "react-router-dom";
import ReactFlow, {
    addEdge, Background, Connection, Controls, Edge, Elements,
    isNode, MiniMap,
    Position, removeElements
} from 'react-flow-renderer';
import {useCallback, useEffect, useState} from "react";
import {graphlib, layout} from "dagrejs";

const dagreGraph = new graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (elements: any[], direction = 'TB') => {

    dagreGraph.setGraph({rankdir: direction});

    elements.forEach((el) => {
        if (isNode(el)) {
            dagreGraph.setNode(el.id, {width: nodeWidth, height: nodeHeight});
        } else {
            dagreGraph.setEdge(el.source, el.target);
        }
    });

    layout(dagreGraph);

    return elements.map((el) => {
        if (isNode(el)) {
            const nodeWithPosition = dagreGraph.node(el.id);

            el.targetPosition = Position.Left
            el.sourcePosition = Position.Right

            el.position = {
                x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
                y: nodeWithPosition.y - nodeHeight / 2,
            };
        }
        return el;
    });
};

const PreviewResults = () => {
    const {state} = useLocation();
    const {instance, relations}: any = state;
    const [elements, setElements] = useState<any>([]);

    const onConnect = (params: Edge<any> | Connection) =>
        setElements((els: Elements<any>) =>
            addEdge({...params, type: 'smoothstep', animated: true}, els)
        );

    const onElementsRemove = (elementsToRemove: any) =>
        setElements((els: Elements<any>) => removeElements(elementsToRemove, els));


    useEffect(() => {
        let class_aux = instance.classes_to_map.map((value: string, indx: number) => {
            return {
                id: value,
                data: {label: value},
                position: {x: 0, y: 0}
            }
        });


        let rel_aux = relations.map((i: any) => {
            return {
                id: i.relation,
                source: i.from,
                target: i.to,
                label: i.relation,
                type: 'smooth',
                style: {stroke: instance.relations[i.relation].selected ? 'green' : 'red'},
                arrowHeadType: 'arrowclosed',
                animated: true
            };
        });

        setElements(getLayoutedElements(class_aux.concat(rel_aux)));
    }, []);

    return (
        <>
            <ReactFlow elements={elements} onConnect={onConnect} onElementsRemove={onElementsRemove} key="edges">
                <Controls/>
                <MiniMap/>
                <Background color="#aaa" gap={16}/>
            </ReactFlow>

        </>
    );

}

export default PreviewResults;