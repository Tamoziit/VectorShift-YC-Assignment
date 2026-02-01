import logging
from fastapi import FastAPI, Form, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from utils import is_pipeline_dag

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class NodeData(BaseModel):
    id: str
    nodeType: str

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]
    width: Optional[int] = None
    height: Optional[int] = None

class Edge(BaseModel):
    id: str
    source: str
    sourceHandle: str
    target: str
    targetHandle: str
    animated: Optional[bool] = True

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData = Body(...)):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    
    logging.info(pipeline.nodes)
    logging.info(pipeline.edges)
    
    is_dag = is_pipeline_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'status': 'parsed',
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
