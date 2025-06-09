import './App.css';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app">
      <div className="toolbar-container">
        <PipelineToolbar />
      </div>
      <div className="pipeline-container">
        <div className="ui-container">
          <PipelineUI />
        </div>
        <div className="submit-container">
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}

export default App;
