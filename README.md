# VectorShift Frontend Technical Assessment

This project is a web-based visual programming interface that allows users to create and analyze data processing pipelines by connecting various nodes on a canvas. It features a React frontend for the user interface and a Python/FastAPI backend for pipeline validation.

## Project Structure

The project is organized into two main parts: a `frontend` application and a `backend` service.

```
/
├── backend/
│   ├── main.py             # FastAPI application
│   └── requirements.txt    # Python dependencies
│
├── frontend/
│   ├── public/             # Static assets and index.html
│   ├── src/
│   │   ├── nodes/          # React components for each type of node
│   │   ├── App.css         # Main application layout styles
│   │   ├── App.js          # Root React component
│   │   ├── draggableNode.js  # Component for the nodes in the toolbar
│   │   ├── index.css       # Global styles
│   │   ├── store.js        # Zustand store for state management
│   │   ├── submit.js       # Component for the deploy button and API logic
│   │   ├── toolbar.js      # The sidebar component containing draggable nodes
│   │   └── ui.js           # The main React Flow canvas component
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
└── README.md               # This file
```

## Getting Started

To run this project, you will need to run the frontend and backend services concurrently in separate terminal sessions.

### Prerequisites

- Node.js and npm (or yarn)
- Python 3.7+ and pip

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the FastAPI server:**
    ```bash
    uvicorn main:app --reload
    ```
    The backend will be running at `http://127.0.0.1:8000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```

3.  **Run the React development server:**
    ```bash
    npm start
    ```
    The frontend will open in your browser at `http://localhost:3000`.

## Architecture and Key Features

### Frontend

The frontend is built with **React** and uses the **React Flow** library to create the interactive, node-based UI.

-   **State Management:** Global state for nodes and edges is managed by **Zustand**, a small, fast, and scalable state-management solution. This allows different components to access and modify the pipeline's state without complex prop drilling.

-   **Component-Based UI:**
    -   `PipelineToolbar`: A sidebar that displays all available node types.
    -   `DraggableNode`: Individual nodes in the toolbar that can be dragged onto the canvas.
    -   `PipelineUI`: The main component that houses the React Flow canvas, handling node creation, connections, and user interactions.
    -   `BaseNode`: A reusable component that provides a consistent structure and style for all node types.
    -   **Node Components (`/nodes/*.js`):** Each node type (e.g., `TextNode`, `LLMNode`) is its own component, encapsulating its specific logic and UI.

-   **Dynamic Text Node:**
    -   **Auto-Resizing:** The `TextNode` uses a combination of `useRef` to access the `textarea` DOM element and `useLayoutEffect` to measure its content's scroll height. This allows both the `textarea` and the node itself to dynamically grow in height as the user types, improving visibility for large amounts of text.
    -   **Variable Handles:** The `TextNode` parses its own content for variables denoted by double curly brackets (e.g., `{{my_variable}}`). Using `useMemo`, it efficiently identifies these variables and dynamically renders a corresponding input handle on the left side of the node, allowing other nodes to be connected as variable inputs.

-   **Styling:**
    -   The application features a modern, dark-themed design inspired by development tools.
    -   Styling is implemented using pure CSS with a clear and organized structure (`App.css` for layout, `Node.css` for nodes, etc.), ensuring maintainability.

### Backend

The backend is a lightweight service built with **FastAPI**, a modern, high-performance Python web framework.

-   **API Endpoint (`/pipelines/parse`):**
    -   This is the single endpoint that the frontend communicates with. It accepts a `POST` request containing the pipeline's nodes and edges in a JSON format.
    -   It is responsible for analyzing the submitted pipeline.

-   **CORS (Cross-Origin Resource Sharing):**
    -   The backend includes CORS middleware to allow the frontend application (running on `localhost:3000`) to make requests to the backend server (running on `localhost:8000`).

-   **Pipeline Validation (DAG Check):**
    -   The core logic of the backend is to validate that the submitted pipeline is a **Directed Acyclic Graph (DAG)**.
    -   A DAG is a graph with directed edges and no cycles. This is a critical property for a data pipeline, as a cycle would represent an infinite loop.
    -   The validation is performed using a **Depth-First Search (DFS)** algorithm. It traverses the graph, keeping track of visited nodes and nodes currently in the recursion stack (`visiting`). If the DFS encounters a node that is already in the `visiting` set, it has detected a cycle, and the graph is not a DAG.
    -   The endpoint returns a JSON response with the number of nodes, the number of edges, and a boolean `is_dag` indicating the result of the validation.

### Frontend-Backend Integration

-   When the user clicks the **"Deploy"** button, the `SubmitButton` component fetches the current nodes and edges from the Zustand store.
-   It sends this data to the `http://127.0.0.1:8000/pipelines/parse` endpoint.
-   The frontend then waits for the JSON response and displays the results to the user in a browser alert, providing immediate feedback on the pipeline's structure and validity. 