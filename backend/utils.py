"""
Kahn's Algorithm
Time: O(V + E)
Mem: O(V + E)
"""
from collections import deque

def is_pipeline_dag(nodes, edges):
    adj = { node.id: [] for node in nodes }
    in_degree = { node.id: 0 for node in nodes }
    
    for edge in edges:
        adj[edge.source].append(edge.target)
        in_degree[edge.target] += 1
    
    queue = deque([node_id for node_id in in_degree if in_degree[node_id] == 0])
    
    visited_count = 0
    
    while queue:
        u = queue.popleft()
        visited_count += 1
        
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    
    return visited_count == len(nodes)