import { Handle } from "reactflow";

const BaseNode = ({
	id,
	title,
	icon,
	handles = [],
	children,
}) => {

	return (
		<div className={`${title} w-60 border-2 border-gray-300 rounded-lg p-3 flex flex-col gap-1.5`}>
			<div className="flex flex-col">
				<div className="flex items-center gap-1 w-full">
					{icon && icon}

					{title && (
						<h1 className="dark-header text-base">
							{title}
						</h1>
					)}
				</div>

				<div className="text-sm w-full -mt-0.5">
					<span className="text-yellow-100">id: </span>
					<span className="text-gray-200">{id}</span>
				</div>
			</div>

			{handles.map((handle) => (
				<Handle
					key={handle.id}
					type={handle.type}
					position={handle.position}
					id={`${id}-${handle.id}`}
					style={handle.style}
				/>
			))}

			<div className="w-full flex flex-col gap-1">
				{children}
			</div>
		</div>
	)
}

export default BaseNode;