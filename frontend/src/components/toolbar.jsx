import DraggableNode from './draggableNode';
import SubmitButton from './submit';
import { MdInput } from "react-icons/md";
import { SiOpenai } from "react-icons/si";
import { MdOutput } from "react-icons/md";
import { IoText } from "react-icons/io5";
import { FaSlack } from "react-icons/fa";

const PipelineToolbar = () => {
	return (
		<div className='w-full flex flex-col gap-2 p-4 bg-linear-to-b from-purple-900 to-black border-b border-white/10 rounded-b-2xl shadow-xl'>
			<div className='flex items-center gap-2'>
				<img
					src="/Logo.png"
					className='size-8 rounded-md overflow-hidden'
				/>
				<h1 className='gradient-text'>
					VECTORSHIFT
				</h1>
			</div>

			<div className='w-full h-px bg-white/30' />

			<div className='flex items-center justify-between w-full px-2'>
				<div className='flex flex-wrap gap-4'>
					<DraggableNode type='customInput' label='Input' icon={<MdInput className='text-xl font-semibold text-purple-900' />} />
					<DraggableNode type='llm' label='LLM' icon={<SiOpenai className='text-xl font-semibold text-purple-900' />} />
					<DraggableNode type='customOutput' label='Output' icon={<MdOutput className='text-xl font-semibold text-purple-900' />} />
					<DraggableNode type='text' label='Text' icon={<IoText className='text-xl font-semibold text-purple-900' />} />
					<DraggableNode type='slack' label='Slack' icon={<FaSlack className='text-xl font-semibold text-purple-900' />} />
				</div>

				<SubmitButton />
			</div>
		</div>
	);
};

export default PipelineToolbar;