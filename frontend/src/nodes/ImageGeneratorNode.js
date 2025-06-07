import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ImageGeneratorNode = ({ id, data }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-prompt` },
        { type: 'source', position: Position.Right, id: `${id}-image` },
    ];

    return (
        <BaseNode title="Image Generator" handles={handles}>
            <div>Takes a text prompt and generates an image.</div>
        </BaseNode>
    );
}; 