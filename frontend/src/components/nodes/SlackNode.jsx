import { useState } from "react";
import BaseNode from "./BaseNode";
import { Position } from 'reactflow';
import { FaSlack } from "react-icons/fa";

const SlackNode = ({ id, data }) => {
	const [currName, setCurrName] = useState(
		data?.inputName || id.replace('customInput-', 'input_')
	);
	const [inputType, setInputType] = useState(
		data?.inputType || 'Text'
	);

	const handleNameChange = (e) => {
		const value = e.target.value;
		setCurrName(value); 
	};

	const handleTypeChange = (e) => {
		setInputType(e.target.value);
	};

	return (
		<BaseNode
			id={id}
			title="Slack"
			icon={<FaSlack className='text-gray-200 text-lg' />}
			handles={[
				{
					id: 'input',
					type: 'target',
					position: Position.Left,
				},
				{
					id: 'value-1',
					type: 'source',
					position: Position.Right,
					style: { top: '33%' },
				},
				{
					id: 'value-2',
					type: 'source',
					position: Position.Right,
					style: { top: '66%' },
				},
			]}
		>
			<label className='text-gray-200'>
				Name:
				<input
					type="text"
					value={currName}
					onChange={handleNameChange}
					className='input-primary w-full text-sm'
					placeholder="Enter input variable name..."
				/>
			</label>
			<label className='text-gray-200'>
				Type:
				<select value={inputType} onChange={handleTypeChange}>
					<option value="Text" className='text-gray-500'>Text</option>
					<option value="File" className='text-gray-500'>File</option>
					<option value="File" className='text-gray-500'>Link</option>
				</select>
			</label>
		</BaseNode>
	)
}

export default SlackNode;