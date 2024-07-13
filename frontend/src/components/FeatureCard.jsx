import React from 'react';
import '../styles/FeatureCard.css';

const FeatureCard = ({ title, description }) => (
  <div className="feature-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default FeatureCard;

