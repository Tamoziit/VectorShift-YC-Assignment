const VAR_REGEX = /\{\{\s*([\w.-]+)\s*\}\}/g;

const extractVariables = (text) => {
    return [...text.matchAll(VAR_REGEX)].map(m => m[1]);
};

export default extractVariables;