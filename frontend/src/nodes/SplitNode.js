import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const SplitNode = ({ id, data }) => {
    const [delimiter, setDelimiter] = useState(data?.delimiter || ',');

    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-part1`, style: { top: '35%' } },
        { type: 'source', position: Position.Right, id: `${id}-part2`, style: { top: '65%' } },
    ];

    return (
        <BaseNode title="Split Text" handles={handles}>
            <label>
                Delimiter:
                <input 
                    type="text" 
                    value={delimiter} 
                    onChange={(e) => setDelimiter(e.target.value)}
                />
            </label>
        </BaseNode>
    );
}; 