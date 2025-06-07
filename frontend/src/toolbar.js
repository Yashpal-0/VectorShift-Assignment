// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='translate' label='Translate' />
                <DraggableNode type='imageGenerator' label='Image Gen' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='concatenate' label='Concatenate' />
                <DraggableNode type='split' label='Split' />
            </div>
        </div>
    );
};
