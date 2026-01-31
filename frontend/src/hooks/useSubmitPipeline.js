import { useState } from "react"
import toast from "react-hot-toast";

const useSubmitPipeline = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const submitPipeline = async ({
        nodes,
        edges
    }) => {
        const success = handleInputErrors({
            nodes,
            edges
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/pipelines/parse`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nodes,
                    edges
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data.status === "parsed") {
                return data;
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return { loading, submitPipeline }
}

export default useSubmitPipeline;


function handleInputErrors({
    nodes,
    edges
}) {
    if (!nodes || !edges || !Array.isArray(nodes) || !Array.isArray(edges) || nodes.length === 0 || edges.length === 0) {
        toast.error("Create a pipeline first");
        return false;
    }

    return true;
}