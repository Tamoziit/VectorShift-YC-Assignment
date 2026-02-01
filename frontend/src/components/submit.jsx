import { FaPlay } from "react-icons/fa";
import { useStore } from "../context/store";
import useSubmitPipeline from "../hooks/useSubmitPipeline";

const SubmitButton = () => {
	const { loading, submitPipeline } = useSubmitPipeline();
	const nodes = useStore((s) => s.nodes);
	const edges = useStore((s) => s.edges);
	const result = useStore((s) => s.result);
  const setResult = useStore((s) => s.setResult);

	const fetchPipelineResult = async (e) => {
		e.preventDefault();
		const data = await submitPipeline({
			nodes,
			edges
		});

		if (data)
			setResult(data);
	}

	console.log(result);

	return (
		<div>
			<button
				type="submit"
				onClick={fetchPipelineResult}
				disabled={loading}
				className="flex items-center gap-2 bg-linear-to-r from-green-200 via-green-400 to-emerald-600 rounded-xl px-6 py-2 border border-white/80 font-medium text-gray-900 cursor-pointer shadow-lg hover:bg-emerald-600"
			>
				<FaPlay className="text-sm text-emerald-900" />
				Submit
			</button>
		</div>
	);
}

export default SubmitButton;