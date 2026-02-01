import { useStore } from "../context/store";

const Result = () => {
	const result = useStore((s) => s.result);

	if (!result) return;

	return (
		<div className="absolute bottom-15 w-full flex items-center justify-center">
			<div className="flex flex-col gap-2.5 items-center justify-center glassmorphic">
				<h1 className="gradient-text">
					Pipeline Info
				</h1>

				<div className="w-full items-center justify-center flex gap-10">
					<div className="flex items-center justify-center gap-3">
						<span className="text-yellow-200 font-semibold">Nodes:</span>
						<span className="text-gray-200 font-semibold">{result.num_nodes}</span>
					</div>

					<div className="flex items-center justify-center gap-3">
						<span className="text-yellow-200 font-semibold">Edges:</span>
						<span className="text-gray-200 font-semibold">{result.num_edges}</span>
					</div>

					<div className="flex items-center justify-center gap-3">
						<span className="text-yellow-200 font-semibold">DAG:</span>
						<span className="text-gray-200 font-semibold">{String(result.is_dag).toLocaleUpperCase()}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Result;