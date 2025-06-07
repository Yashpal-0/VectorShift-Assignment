import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConcatenateNode = ({ id, data }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-text1`, style: { top: '35%' } },
        { type: 'target', position: Position.Left, id: `${id}-text2`, style: { top: '65%' } },
        { type: 'source', position: Position.Right, id: `${id}-concatenated` },
    ];

    return (
        <BaseNode title="Concatenate Text" handles={handles}>
            <div>Combines two text inputs.</div>
        </BaseNode>
    );
}; 