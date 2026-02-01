import { FaPlay } from "react-icons/fa";
import { useStore } from "../../context/store";
import useSubmitPipeline from "../../hooks/useSubmitPipeline";
import Spinner from "../Spinner";

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
				className="btn-secondary rounded-xl px-6 py-2 min-w-30"
			>
				{loading ? (
					<Spinner size="small" color="accent" />
				) : (
					<>
						<FaPlay className="text-sm text-emerald-900" />
						Submit
					</>
				)}
			</button>
		</div>
	);
}

export default SubmitButton;