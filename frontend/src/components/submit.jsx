import { useState } from "react";
import { useStore } from "../context/store";
import useSubmitPipeline from "../hooks/useSubmitPipeline";

const SubmitButton = () => {
	const { loading, submitPipeline } = useSubmitPipeline();
	const nodes = useStore((s) => s.nodes);
	const edges = useStore((s) => s.edges);
	const [result, setResult] = useState(null);

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
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<button
				type="submit"
				onClick={fetchPipelineResult}
				disabled={loading}
			>
				Submit
			</button>
		</div>
	);
}

export default SubmitButton;