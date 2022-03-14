import {graphlib, layout} from "dagrejs";
import {isNode, Position} from "react-flow-renderer";

const dagreGraph = new graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (elements: any[], direction = 'TB', nodeWidth: number = 172, nodeHeight = 36) => {

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

export {getLayoutedElements};