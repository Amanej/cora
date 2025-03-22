'use client';

import { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Connection,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Response' },
    position: { x: 250, y: 100 },
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' }
];

export default function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
    const newLabel = prompt('Enter new label:', node.data.label);
    if (newLabel) {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === node.id) {
            return { ...n, data: { ...n.data, label: newLabel } };
          }
          return n;
        })
      );
    }
  }, [setNodes]);

  const onAddNode = useCallback(() => {
    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      data: { label: 'New Node' },
      position: { x: 250, y: nodes.length * 100 },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes]);

  console.log("Nodes: ", nodes);
  console.log("Edges: ", edges);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ padding: '10px' }}>
        <button 
          onClick={onAddNode}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Node
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap className="bg-white" />
      </ReactFlow>
    </div>
  );
}
