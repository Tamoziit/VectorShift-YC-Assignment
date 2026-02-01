import { useEffect, useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';
import { useStore } from '../../context/store';
import { MdInput } from "react-icons/md";

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
	}, [currName, id, updateInputName]);

	return (
		<BaseNode
			id={id}
			title="Input"
			icon={<MdInput className='text-gray-200 text-lg' />}
			handles={[
				{
					id: `${id}-value`,
					type: "source",
					position: Position.Right
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
					placeholder="Enter input variable name..."
				/>
			</label>
			<label className='text-gray-200'>
				Type:
				<select value={inputType} onChange={handleTypeChange}>
					<option value="Text" className='text-gray-500'>Text</option>
					<option value="File" className='text-gray-500'>File</option>
				</select>
			</label>
		</BaseNode >
	);
}

export default InputNode;