import {AdjacencyMap, Vertex} from '../components/controllers/networkController/types';


// BEN OF TOMORROW, need to check the value of the highlighted at the root because the value inside the edges to/from isn't being updated benjamin
function dfs(adjacencyMap: AdjacencyMap, verticesMap: {[key: string]: Vertex}, startNode: Vertex) {
  const visited = new Set(); // Track visited nodes
  const stack: Vertex[] = [startNode]; // Stack for DFS traversal
  const unmarkedNodes = []; // Array to store unmarked nodes


  while (stack.length > 0) {
    const currentNode: Vertex = stack.pop() as Vertex;

    if (!visited.has(currentNode)) {
      visited.add(currentNode);

      const edges = adjacencyMap[currentNode.uuid].edges;

      // Process the node as needed (e.g., mark it, store it, etc.)
      if (!verticesMap[currentNode.uuid].highlight) {
        unmarkedNodes.push(currentNode);
        continue;
      }

      // Add unvisited neighbors to the stack
      for (const neighbour of edges) {
        if (!visited.has(neighbour.fromVector)) {
          stack.push(neighbour.fromVector);
        }
      }
    }
  }

  return unmarkedNodes;
}

export default function getLeaves(adjacencyMap: AdjacencyMap, vertices: Vertex[], hackBots: Vertex[]): Vertex[] {
  if (!hackBots.length) {
    return [];
  }

  const verticesMap = vertices.reduce((acc, vertex) => ({...acc, [vertex.uuid]: vertex}), {});

  return Array.from(new Set(hackBots.flatMap((hackBot) => dfs(adjacencyMap, verticesMap, hackBot))));
}
