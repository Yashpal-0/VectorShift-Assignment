// textNode.js

import { useState, useLayoutEffect, useRef, useMemo, useCallback } from 'react';
import { Position, useReactFlow } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const { setNodes, getNode } = useReactFlow();
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  const handleTextChange = useCallback((e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, 'text', newText);
  }, [id, updateNodeField]);

  useLayoutEffect(() => {
    if (textareaRef.current) {
      // Temporarily reset height to calculate the new scrollHeight
      textareaRef.current.style.height = 'auto';
      const newHeight = textareaRef.current.scrollHeight;
      // Set the textarea height to its scrollHeight to make it grow
      textareaRef.current.style.height = `${newHeight}px`;

      const currentNode = getNode(id);
      if (
        currentNode &&
        (!currentNode.style ||
         currentNode.style.height !== newHeight + 80)
      ) {
        setNodes((nodes) =>
          nodes.map((node) => {
            if (node.id === id) {
              return {
                ...node,
                style: {
                  ...node.style,
                  height: newHeight + 80,
                },
              };
            }
            return node;
          })
        );
      }
    }
  }, [currText, id, setNodes, getNode]);

  const variables = useMemo(() => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = new Set();
    let match;
    while ((match = regex.exec(currText)) !== null) {
      matches.add(match[1]);
    }
    return Array.from(matches);
  }, [currText]);

  const handles = useMemo(() => {
    const outputHandle = { type: 'source', position: Position.Right, id: `${id}-output` };
    
    const inputHandles = variables.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${variable}`,
      style: { top: `${100 / (variables.length + 1) * (index + 1)}%` },
    }));

    return [outputHandle, ...inputHandles];
  }, [id, variables]);

  return (
    <BaseNode title="Text" handles={handles}>
      <label>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          rows={1}
          className="nodrag"
          style={{
            width: '100%',
            resize: 'none',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        />
      </label>
    </BaseNode>
  );
}
