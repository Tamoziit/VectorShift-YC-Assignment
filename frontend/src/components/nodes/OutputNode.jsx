import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';
import { MdOutput } from 'react-icons/md';

const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      icon={<MdOutput className='text-gray-200 text-lg' />}
      handles={[
        {
          id: "value",
          type: "target",
          position: Position.Left
        }
      ]}
    >
      <label className='text-gray-200'>
        Name:
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          className='input-primary w-full text-sm'
          placeholder="Enter output variable name..."
        />
      </label>
      <label className='text-gray-200'>
        Type:
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text" className='text-gray-500'>Text</option>
          <option value="File" className='text-gray-500'>File</option>
        </select>
      </label>
    </BaseNode>
  );
}

export default OutputNode;