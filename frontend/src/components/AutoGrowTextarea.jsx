import { useRef, useEffect } from 'react';

const AutoGrowTextarea = ({ value, onChange }) => {
	const textareaRef = useRef(null);

	useEffect(() => {
		const el = textareaRef.current;
		if (!el) return;

		const height = value ? Math.min(el.scrollHeight, 160) : 30;

		el.style.height = 'auto';
		el.style.height = `${height}px`;
	}, [value]);

	return (
		<textarea
			ref={textareaRef}
			value={value}
			onChange={onChange}
			rows={1}
			className="resize-none overflow-hidden input-primary w-full text-sm pb-3!"
			placeholder='Enter text here...'
		/>
	);
};


export default AutoGrowTextarea;