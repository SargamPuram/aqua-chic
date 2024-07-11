import React from 'react';
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

const App = () => {
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
          <Route path="/display" element={<Display />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
