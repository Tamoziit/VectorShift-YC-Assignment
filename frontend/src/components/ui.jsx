import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../context/store';
import { shallow } from 'zustand/shallow';
import InputNode from './nodes/InputNode';
import LLMNode from './nodes/LLMNode';
import OutputNode from './nodes/OutputNode';
import TextNode from './nodes/TextNode';
import SlackNode from './nodes/SlackNode';
import { getNodeColor } from '../constants/nodeColours';

import 'reactflow/dist/style.css';
import edgeOptions from '../constants/edgeOptions';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  slack: SlackNode
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const getInitNodeData = (nodeID, type) => {
  return { id: nodeID, nodeType: `${type}` };
};

const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        //check if the dropped element is valid 
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type); const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };
        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  console.log(nodes, edges)

  return (
    <div ref={reactFlowWrapper} className="w-full h-[82vh] bg-linear-to-b from-slate-900 via-slate-900 to-black pb-3">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType='smoothstep'
        defaultEdgeOptions={edgeOptions}
      >
        <Background color="#38bdf8" gap={gridSize} />
        <Controls />
        <MiniMap
          className="w-50"
          nodeColor={n => getNodeColor(n.type)}
          maskColor="rgba(0, 0, 0, 0.9)"
          nodeBorderRadius={1}
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
};

export default PipelineUI;