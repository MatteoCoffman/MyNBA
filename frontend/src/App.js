import React from 'react';
import Scores from './Scores';
import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';

function App() {
  return (
    <div className="App">
      <Scores />
      <Homepage />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;