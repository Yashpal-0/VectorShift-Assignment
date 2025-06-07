import { Handle } from 'reactflow';
import './Node.css';

export const BaseNode = ({ title, children, handles }) => {
    return (
        <div className="base-node">
            <div className="node-header">
                {title}
            </div>
            <div className="node-content">
                {children}
            </div>
            {handles && handles.map(handle => (
                <Handle
                    key={handle.id}
                    type={handle.type}
                    position={handle.position}
                    id={handle.id}
                    style={handle.style || {}}
                />
            ))}
        </div>
    );
}; 