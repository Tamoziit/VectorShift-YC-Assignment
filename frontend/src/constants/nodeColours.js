export const NODE_COLORS = {
	customInput: '#059669',
	llm: '#9333ea',
	customOutput: '#e11d48',
	text: '#475569',
	slack: '#f59e0b',
	default: '#374151',
};

export const getNodeColor = (type) => NODE_COLORS[type] || NODE_COLORS.default;