import { useEffect, useMemo, useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';
import AutoGrowTextarea from '../AutoGrowTextarea';
import extractVariables from '../../utils/extractVariables';
import { useStore } from '../../context/store';
import { shallow } from 'zustand/shallow';
import toast from "react-hot-toast";
import { IoText } from "react-icons/io5";

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
		inputNameMap
	} = useStore(selector, shallow);

	const handleTextChange = (e) => {
		const value = e.target.value;
		setCurrText(value);

		const extracted = extractVariables(value);

		const uniqueVars = [...new Set(extracted)];

		const validVars = uniqueVars.filter((v) => {
			const exists = findKeyByValue(v);
			if (!exists) {
				toast.error(`Variable "${v}" doesn't exist! Add an input first`);
			}
			return exists;
		});
		setVariables(validVars);
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

	const findKeyByValue = (value) => {
		return Object.keys(inputNameMap).find(key => inputNameMap[key] === value);
	};

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

	console.log(inputNameMap)

	return (
		<BaseNode
			id={id}
			title="Text"
			icon={<IoText className='text-gray-200 text-lg' />}
			handles={[
				{
					id: "output",
					type: "source",
					position: Position.Right
				},
				...variableHandles
			]}
		>
			<label className='flex flex-col text-gray-200'>
				Text:
				<AutoGrowTextarea
					value={currText}
					onChange={handleTextChange}
				/>
			</label>

			{variables.length > 0 && (
				<div className="mt-2 border-t border-white/10 pt-2">
					<span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1 block">
						Variables
					</span>
					<div className="grid grid-cols-2 gap-2">
						{variables.map((v, i) => (
							<div
								key={i}
								className="text-xs text-gray-300 bg-white/15 px-2 py-1 rounded border border-white/5 truncate"
								title={v}
							>
								{findKeyByValue(v)}
							</div>
						))}
					</div>
				</div>
			)}
		</BaseNode>
	);
}

export default TextNode;