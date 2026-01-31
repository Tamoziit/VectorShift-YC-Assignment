import { Position } from 'reactflow';
import BaseNode from './BaseNode';

const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      handles={[
        {
          id: "system",
          type: "target",
          position: Position.Left,
          style: { top: '33%' }
        },
        {
          id: "prompt",
          type: "target",
          position: Position.Left,
          style: { top: '66%' }
        },
        {
          id: "response",
          type: "source",
          position: Position.Right
        }
      ]}
    >
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode >
  );
}

export default LLMNode;