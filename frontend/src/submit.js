// submit.js
import './submit.css';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        const pipeline = {
            nodes,
            edges
        };

        const formData = new FormData();
        formData.append('pipeline', JSON.stringify(pipeline));

        try {
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                body: new URLSearchParams(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            const { num_nodes, num_edges, is_dag } = result;

            const dagMessage = is_dag 
                ? 'The pipeline is a valid DAG.' 
                : 'The pipeline has a cycle and is not a valid DAG.';

            alert(
                `Pipeline Analysis:\n` +
                `-------------------\n` +
                `Number of Nodes: ${num_nodes}\n` +
                `Number of Edges: ${num_edges}\n` +
                `Status: ${dagMessage}`
            );

        } catch (error) {
            console.error("Failed to submit pipeline:", error);
            alert(`Failed to submit pipeline: ${error.message}`);
        }
    };

    return (
        <button className="submit-button" onClick={handleSubmit} type="button">Submit</button>
    );
}
