import { Handle } from "reactflow";

const BaseNode = ({
	id,
	title,
	handles = [],
	children,
}) => {

	return (
		<div className={`${title} w-50 border-2 border-gray-800 rounded-lg p-3`}>
			{title && (
				<h1 className="dark-header text-gray-800">
					{title}
				</h1>
			)}

			{handles.map((handle) => (
				<Handle
					key={handle.id}
					type={handle.type}
					position={handle.position}
					id={`${id}-${handle.id}`}
					style={handle.style}
				/>
			))}

			<div>
				{children}
			</div>
		</div>
	)
}

export default BaseNode;