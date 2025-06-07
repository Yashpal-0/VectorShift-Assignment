import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TranslateNode = ({ id, data }) => {
    const [language, setLanguage] = useState(data?.language || 'Spanish');

    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-text` },
        { type: 'source', position: Position.Right, id: `${id}-translated` },
    ];

    return (
        <BaseNode title="Translate Text" handles={handles}>
            <label>
                Translate to:
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Japanese">Japanese</option>
                </select>
            </label>
        </BaseNode>
    );
}; 