import { RiDeleteBin6Line } from "react-icons/ri";
import { useStore } from "../../context/store";

const Delete = () => {
	const clearCanvas = useStore((s) => s.clearCanvas);

	const handleDeleteAll = () => {
		if (window.confirm("Are you sure you want to clear the entire canvas?")) {
			clearCanvas();
		}
	};

	return (
		<div>
			<button
				className='btn-tertiary p-2 rounded-lg'
				onClick={handleDeleteAll}
			>
				<RiDeleteBin6Line className="text-gray-300 text-2xl" />
			</button>
		</div>
	)
}

export default Delete;