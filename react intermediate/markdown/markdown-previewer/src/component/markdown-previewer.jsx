// src/MarkdownPreviewer.js
import React, { useState } from 'react';
import { marked } from 'marked'; // Change this line

const MarkdownPreviewer = () => {
  const [markdownText, setMarkdownText] = useState('');

  const handleChange = (event) => {
    setMarkdownText(event.target.value);
  };

  const renderMarkdown = () => {
    return { __html: marked(markdownText) };
  };

  return (
    <div className="markdown-previewer">
      <div className="editor">
        <h3>Markdown Editor</h3>
        <textarea
          value={markdownText}
          onChange={handleChange}
          placeholder="Type your markdown here"
        />
      </div>

      <div className="preview">
        <h3>Live Preview</h3>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={renderMarkdown()}
        />
      </div>
    </div>
  );
};

export default MarkdownPreviewer;
