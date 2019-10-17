import React from 'react';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/projects/Pathfinding" component={PathfindingVisualizer} />
      </div>
    </Router>
  );
}

export default App;
