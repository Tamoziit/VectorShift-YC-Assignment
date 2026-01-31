import { useEffect, useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';
import { useStore } from '../../context/store';

const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const updateInputName = useStore((s) => s.updateInputName);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCurrName(value);

    updateInputName(id, value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  useEffect(() => {
    updateInputName(id, currName);
  }, [currName]);

  return (
    <BaseNode
      id={id}
      title="Input"
      handles={[
        {
          id: `${id}-value`,
          type: "source",
          position: Position.Right
        }
      ]}
    >
      <label>
        Name:
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Type:
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode >
  );
}

export default InputNode;