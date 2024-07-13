import React, { useState, useEffect } from 'react';
import '../styles/ThemeGenerator.css';

function ThemeGenerator() {
  const [theme, setTheme] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/.netlify/functions/generate-theme')
      .then(response => response.json())
      .then(data => {
        setTheme(data.theme.text);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching theme:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const parseTheme = (text) => {
    // Split the text into sections based on headings and bullet points
    return text.split('\n\n').map((section, index) => {
      if (section.startsWith('**')) {
        // Heading
        return <h2 key={index} className="theme-heading">{section.replace(/\*\*/g, '')}</h2>;
      } else if (section.startsWith('*')) {
        // Bullet Points
        const items = section.split('\n').map((item, i) => (
          <li key={i} className="theme-item">{item.replace(/^\*\s*/, '')}</li>
        ));
        return <ul key={index} className="theme-list">{items}</ul>;
      } else {
        // Paragraph
        return <p key={index} className="theme-paragraph">{section}</p>;
      }
    });
  };

  return (
    <div className="theme-container">
      <h1 className="theme-title">Weekly Fashion Theme</h1>
      <div className="theme-content">
        {parseTheme(theme)}
      </div>
    </div>
  );
}

export default ThemeGenerator;
