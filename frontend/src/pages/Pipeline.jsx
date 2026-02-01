import Result from "../components/Result";
import PipelineToolbar from "../components/toolbar";
import PipelineUI from "../components/ui";

const Pipeline = () => {
	return (
		<div className="bg-linear-to-b from-slate-900 via-slate-900 to-black">
			<PipelineToolbar />
			<PipelineUI />
			<Result />
		</div>
	)
}

export default Pipeline;