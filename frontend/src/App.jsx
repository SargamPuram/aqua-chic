import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AppLayout from './components/AppLayout';
import Login from './components/Login';
import SignIn from './components/SignIn';
import app from './firebase';
import SignUp from './components/SignUp';
import AuthDetails from './components/AuthDetails';
import PhotoUpload from './components/PhotoUpload';
import PhotoGallery from './components/PhotoGallery';
import Display from './components/Display';
import Leaderboard from './components/Leaderboard';
import './App.css';
import ThemeGenerator from './components/ThemeGenerator';

const App = () => {
  const initialPhotos = [
    { url: 'https://images.unsplash.com/photo-1632149877166-f75d49000351?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', likes: Math.floor(Math.random() * 100) },
    { url: 'https://images.unsplash.com/photo-1588117260148-b47818741c74?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', likes: Math.floor(Math.random() * 100) },
    { url: 'https://images.unsplash.com/photo-1535972976071-2dccec4adc83?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', likes: Math.floor(Math.random() * 100) },
  ];

  const [photos, setPhotos] = useState(initialPhotos);

  const handleLike = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index].likes += 1;
    setPhotos(updatedPhotos);
  };

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/authdetails" element={<AuthDetails />} />
          <Route path="/photoupload" element={<PhotoUpload />} />
          <Route path="/photogallery" element={<PhotoGallery />} />
          <Route path="/display" element={<Display photos={photos} handleLike={handleLike} />} />
          <Route path="/leaderboard" element={<Leaderboard photos={photos} />} />
          <Route path="/theme-generator" element={<ThemeGenerator />} />
          
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
