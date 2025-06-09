// toolbar.js
import './toolbar.css';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <h3>Nodes</h3>
            <div className="nodes-container">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
            </div>
            <h3>Tools</h3>
            <div className="nodes-container">
                <DraggableNode type='translate' label='Translate' />
                <DraggableNode type='imageGenerator' label='Image Gen' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='concatenate' label='Concatenate' />
                <DraggableNode type='split' label='Split' />
            </div>
        </div>
    );
};
