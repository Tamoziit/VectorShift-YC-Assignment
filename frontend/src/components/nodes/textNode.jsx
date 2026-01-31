import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Text"
      handles={[
        {
          id: "output",
          type: "source",
          position: Position.Right
        }
      ]}
    >
      <label>
        Text:
        <input
          type="text"
          value={currText}
          onChange={handleTextChange}
        />
      </label>
    </BaseNode>
  );
}

export default TextNode;