import DraggableNode from './draggableNode';
import SubmitButton from './submit';

const PipelineToolbar = () => {
	return (
		<div className='w-full flex flex-wrap items-center justify-between p-4 bg-linear-to-b from-purple-900 to-black border-b border-black/50'>
			<div className='flex flex-wrap gap-4'>
				<DraggableNode type='customInput' label='Input' />
				<DraggableNode type='llm' label='LLM' />
				<DraggableNode type='customOutput' label='Output' />
				<DraggableNode type='text' label='Text' />
				<DraggableNode type='slack' label='Slack' />
			</div>

			<SubmitButton />
		</div>
	);
};

export default PipelineToolbar;