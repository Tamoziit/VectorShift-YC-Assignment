import { Position } from 'reactflow';
import BaseNode from './BaseNode';
import { SiOpenai } from "react-icons/si";

const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={<SiOpenai className='text-gray-200 text-lg' />}
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
      <div className='w-full'>
        <div className='text-xs tracking-wider'>
          <span className='uppercase text-gray-400'>Agent: </span>
          <span className='text-gray-200'>GPTv5</span>
        </div>
        <span className='text-gray-200'>This is a LLM.</span>
      </div>
    </BaseNode >
  );
}

export default LLMNode;