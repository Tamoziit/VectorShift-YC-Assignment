import { useEffect, useMemo, useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';
import AutoGrowTextarea from '../AutoGrowTextarea';
import extractVariables from '../../utils/extractVariables';
import { useStore } from '../../context/store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
	edges: state.edges,
	setEdges: state.onEdgesChange,
	addEdge: state.onConnect,
	inputNameMap: state.inputNameMap
});

const TextNode = ({ id, data }) => {
	const [currText, setCurrText] = useState(data?.text || '');
	const [variables, setVariables] = useState(data?.variables || []);

	const {
		edges,
		setEdges,
		addEdge,
	} = useStore(selector, shallow);

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
		const start = 50 - ((count - 1) * spacing) / 2;

		return variables.map((v, idx) => ({
			id: `${v}-input`,
			type: "target",
			position: Position.Left,
			style: {
				top: `${start + idx * spacing}%`,
			},
		}));
	}, [variables]);

	useEffect(() => {
		variables.forEach((v) => {
			const sourceNodeId = v;
			const targetHandle = `${id}-${v}-input`;
			const sourceHandle = `${v}-value`
			const exists = edges.some(
				(e) =>
					e.source === sourceNodeId &&
					e.target === id &&
					e.targetHandle === targetHandle
			);

			if (exists) return;

			addEdge({
				source: sourceNodeId,
				sourceHandle: sourceHandle,
				target: id,
				targetHandle,
			});
		});
	}, [variables, edges, id, addEdge]);

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