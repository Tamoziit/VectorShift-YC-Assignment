import DraggableNode from './draggableNode';

const PipelineToolbar = () => {
	return (
		<div className='w-full flex flex-wrap gap-4 p-4 bg-linear-to-b from-violet-600 to-black border-b border-black/50'>
			<DraggableNode type='customInput' label='Input' />
			<DraggableNode type='llm' label='LLM' />
			<DraggableNode type='customOutput' label='Output' />
			<DraggableNode type='text' label='Text' />
			<DraggableNode type='slack' label='Slack' />
		</div>
	);
};

export default PipelineToolbar;