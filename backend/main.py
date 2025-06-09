from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_dag(nodes, edges):
    if not nodes:
        return True
        
    adj = {node['id']: [] for node in nodes}
    for edge in edges:
        # Handle cases where a node in an edge might not be in the nodes list
        if edge['source'] not in adj:
            adj[edge['source']] = []
        if edge['target'] not in adj:
            adj[edge['target']] = []
        adj[edge['source']].append(edge['target'])

    visiting = set()
    visited = set()

    def dfs(node_id):
        visiting.add(node_id)
        visited.add(node_id)

        for neighbor in adj.get(node_id, []):
            if neighbor in visiting:
                return False
            if neighbor not in visited:
                if not dfs(neighbor):
                    return False
        
        visiting.remove(node_id)
        return True

    for node in nodes:
        if node['id'] not in visited:
            if not dfs(node['id']):
                return False

    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    try:
        data = json.loads(pipeline)
        nodes = data.get('nodes', [])
        edges = data.get('edges', [])

        num_nodes = len(nodes)
        num_edges = len(edges)
        
        is_graph_dag = is_dag(nodes, edges)

        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_graph_dag
        }
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON in pipeline data")
