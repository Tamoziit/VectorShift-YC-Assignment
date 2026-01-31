import { useMemo, useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';
import AutoGrowTextarea from '../AutoGrowTextarea';
import extractVariables from '../../utils/extractVariables';

const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '');
  const [variables, setVariables] = useState(data?.variables || []);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setCurrText(value);

    const extracted = extractVariables(value);

    const uniqueVars = [...new Set(extracted)];
    setVariables(uniqueVars);
  };

  const variableHandles = useMemo(() => {
    const count = variables.length;
    const spacing = Math.min(20, 70 / Math.max(1, count - 1));
;

    const start = 50 - ((count - 1) * spacing) / 2;

    return variables.map((v, idx) => ({
      id: `input-${v}`,
      type: "target",
      position: Position.Left,
      style: {
        top: `${start + idx * spacing}%`,
      },
    }));
  }, [variables]);

  return (
    <BaseNode
      id={id}
      title="Text"
      handles={[
        {
          id: "output",
          type: "source",
          position: Position.Right
        },
        ...variableHandles
      ]}
    >
      <label>
        Text:
        <AutoGrowTextarea
          value={currText}
          onChange={handleTextChange}
        />
      </label>

      {variables.length > 0 && (
        <div className="text-xs text-gray-500 mt-2">
          Variables: {variables.join(', ')}
        </div>
      )}
    </BaseNode>
  );
}

export default TextNode;