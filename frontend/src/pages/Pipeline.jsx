import SubmitButton from "../components/submit";
import PipelineToolbar from "../components/toolbar";
import PipelineUI from "../components/ui";

const Pipeline = () => {
	return (
		<div>
			<PipelineToolbar />
			<PipelineUI />
			<SubmitButton />
		</div>
	)
}

export default Pipeline;