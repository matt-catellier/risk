import React, { useRef, useEffect, useState } from 'react';
import PrivateLayout from './PrivateLayout';

import './App.css';

const node = {
  id: '',
  team: '',
  units: 20,
  edges: []
}

const TEAM_1 = "red"
const TEAM_2 = "blue"
const LEFT = "left"
const RIGHT = "right"
const TOP = "top"
const BOTTOM = "bottom"
const NODE_WIDTH = 100
const NODE_HEIGHT = 100
const NODE_MARGIN = 10

const nodes = {
  1: {...node, id: 1, team: TEAM_1, edges: {left: 2, right: 3,top: 4,bottom: 5}},
  2: {...node, id: 2, team: TEAM_1, edges: [1]},
  3: {...node, id: 3, team: TEAM_2, edges: [1]},
  4: {...node, id: 4, team: TEAM_2, edges: [1]},
  5: {...node, id: 5, team: TEAM_2, edges: [1]},
}

const Graph = {
  nodes: nodes,
}


const Cell = ({id, team, units, position}) => {
  return (
    <div style={{
      backgroundColor: team,
      height: NODE_HEIGHT + "px", 
      width: NODE_WIDTH + "px", 
      margin: NODE_MARGIN + "px", 
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...position
    }}>
      {id} {units}
    </div>
  )
}


const getPosition = (initialPosition, edge) => {
  const position = {...initialPosition}
  if (edge === LEFT) {
    position.left -= NODE_WIDTH + NODE_MARGIN
  } else if(edge === RIGHT) {
    position.left += NODE_WIDTH + NODE_MARGIN
  } else if(edge === TOP) {
    position.top -= NODE_HEIGHT + NODE_MARGIN
  } else if(edge === BOTTOM) { 
    position.top += NODE_HEIGHT + NODE_MARGIN
  }
  position.top += "px"
  position.left += "px"
  return position
}

const App = () => {
  const grid = useRef(null)
  const [node, setNode] = useState(nodes[1])

  useEffect(() => {
    const width = grid.current.offsetWidth
    const height = grid.current.offsetHeight

    const initialPosition = {
      top: Math.round(height / 2)  - (NODE_HEIGHT/2 + NODE_MARGIN),
      left: Math.round(width / 2) - (NODE_WIDTH/2 + NODE_MARGIN)
    }
    
    for (let key in node.edges) {
      console.log(key, node.edges[key])
      console.log(getPosition(initialPosition, key))
      nodes[node.edges[key]].position = getPosition(initialPosition, key)
    }

    initialPosition.top += "px"
    initialPosition.left += "px"
    console.log(initialPosition)

    setNode(prev => ({ ...prev, position: initialPosition}))
  }, [])

  const renderNodes = () => 
    Object.values(nodes).map(n => <Cell key={n.id} {...n} />)
  

  return (
    <div className="grid" ref={grid}>
      <Cell {...node} />
        {renderNodes()}
    </div>
  );
}

export default App;
