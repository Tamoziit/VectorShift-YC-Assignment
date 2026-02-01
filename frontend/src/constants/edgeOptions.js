import { MarkerType } from "reactflow";

const edgeOptions = {
    type: 'smoothstep',
    animated: true,
    style: {
        stroke: '#60a5fa',
        strokeWidth: 2,
    },
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#93c5fd',
    },
};

export default edgeOptions;