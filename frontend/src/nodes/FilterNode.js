import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
    const [filterType, setFilterType] = useState(data?.filterType || 'uppercase');

    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
    ];

    return (
        <BaseNode title="Filter Text" handles={handles}>
            <label>
                Filter type:
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="uppercase">Uppercase</option>
                    <option value="lowercase">Lowercase</option>
                    <option value="capitalize">Capitalize</option>
                </select>
            </label>
        </BaseNode>
    );
}; 