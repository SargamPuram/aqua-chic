import React from 'react';
import '../styles/Home.css';
import FeatureCard from './FeatureCard';
import homeImage from '../assets/home.jpeg'; // Corrected image import

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Aqua Chic!</h1>
        <p>Your AI-powered fashion challenge app</p>
      </header>
      <section className="home-intro">
        <div className="intro-text">
          <h2>Discover Weekly Fashion Themes</h2>
          <p>Get inspired with AI-generated fashion themes tailored just for you. Participate in challenges and share your style with the community.</p>
        </div>
        <div className="intro-image">
          <img src={homeImage} alt="Fashion" /> {/* Use imported image */}
        </div>
      </section>
      <section className="home-features">
        <FeatureCard
          title="AI-Powered Themes"
          description="Let our AI surprise you with unique fashion themes every week."
        />
        <FeatureCard
          title="Photo Upload"
          description="Upload your photos and showcase your style."
        />
        <FeatureCard
          title="Like & Share"
          description="Like your favorite outfits and share them with friends."
        />
        <FeatureCard
          title="Engagement"
          description="Engage with the community and participate in fashion challenges."
        />
        <FeatureCard
          title="Fun"
          description="Enjoy a fun and interactive platform for fashion enthusiasts."
        />
      </section>
    </div>
  );
};

export default Home;
