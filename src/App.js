import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [articleData, setArticleData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/analyze', { url });
      setArticleData(response.data);
    } catch (error) {
      console.error('Error analyzing article:', error);
    }
  };

  return (
    <div>
      <h1>Article Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter article URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <button type="submit">Analyze</button>
      </form>
      {articleData && (
        <div>
          <h2>Title: {articleData.title}</h2>
          <p>Authors: {articleData.authors.join(', ')}</p>
          <p>Publication Date: {articleData.publication_date}</p>
          <p>Summary: {articleData.summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
