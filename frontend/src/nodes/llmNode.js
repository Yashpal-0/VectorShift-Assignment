// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: '35%' } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: '65%' } },
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];

  return (
    <BaseNode title="LLM" handles={handles}>
      <div>This is a LLM.</div>
      <div style={{fontSize: '0.8em', color: '#666', marginTop: '10px'}}>
        <div>System (top)</div>
        <div>Prompt (bottom)</div>
      </div>
    </BaseNode>
  );
}
