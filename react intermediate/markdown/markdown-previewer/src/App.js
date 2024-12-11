// src/App.js
import React from 'react';
import './App.css';
import MarkdownPreviewer from './component/markdown-previewer';

function App() {
  return (
    <div className="App">
      <h1>Markdown Previewer</h1>
      <MarkdownPreviewer />
    </div>
  );
}

export default App;
