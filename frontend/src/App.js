import logo from './logo.svg';
import React, { useState, useCallback } from 'react';
import WordCloud from 'react-wordcloud';
import './App.css';


function App() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState('');
  // const getWordCloudData = useCallback(() => {
  //   const words = text.split(/\s+/).filter((word) => word.length > 3);
  //   const frequencies = {};
  //   words.forEach((word) => {
  //     frequencies[word] = frequencies[word] ? frequencies[word] + 1 : 1;
  //   });
  //   return Object.keys(frequencies).map((key) => ({
  //     text: key,
  //     value: frequencies[key],
  //   }));
  // }, [text]);


  const analyzeSentiment = async () => {
    const response = await fetch('http://127.0.0.1:5000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),

    });
    if (response.ok) {
      const result = await response.json();

      setAnalysis(result);

    }
    else {
      alert('Failed to analyze sentiment. Please check if the Flask server is running.');
    }

  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sentiment Analysis</h1>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text here..."
          rows="4"
          cols="50"
        />
        <button onClick={analyzeSentiment}>Analyze</button>

        {analysis && (
          <div>
            <p>Polarity: {analysis.polarity}</p>
            <p>Subjectivity: {analysis.subjectivity}</p>
            <p>Sentiment: {analysis.sentiment}</p>
          </div>
        )}
        {/* <div style={{ height: 400, width: 600 }}>
          <WordCloud words={getWordCloudData()} />
        </div> */}
      </header>
    </div>

  );
}

export default App;


