import Result from "../components/Result";
import PipelineToolbar from "../components/toolbar";
import PipelineUI from "../components/ui";

const Pipeline = () => {
	return (
		<div>
			<PipelineToolbar />
			<PipelineUI />
			<Result />
		</div>
	)
}

export default Pipeline;