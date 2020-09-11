import React from 'react';
import './App.css';
import Calculator from './Calculator'

function App() {
  return (
    <div className="App">
      <h1>Test Simple Calculator with ReactJS.</h1>
      <h4>By Ricardo Riveros Rivera.</h4>
      <Calculator initialValue="123"/>
    </div>
  );
}

export default App;
