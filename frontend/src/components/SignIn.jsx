import React, { useState } from 'react';
import '../styles/SignIn.css'; // Updated path for styles
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AuthDetails from './AuthDetails';
import { initializeApp } from "firebase/app";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const signin = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User signed in:', userCredential.user);
      }).catch((error) => {
        console.error('Error signing in:', error);
        handleSignInError(error);
      });
  };

  const handleSignInError = (error) => {
    switch (error.code) {
      case 'auth/wrong-password':
        setError('Wrong password. Please try again.');
        break;
      case 'auth/user-not-found':
        setError('No user found with this email.');
        break;
      case 'auth/invalid-email':
        setError('Invalid email format.');
        break;
      case 'auth/too-many-requests':
        setError('Access to this account has been temporarily disabled due to many failed login attempts. Please reset your password or try again later.');
        break;
      default:
        setError('Error signing in. Please try again.');
        break;
    }
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signin} className="sign-in-form">
        <h1>Log In</h1>
        <p className="fun-message">Welcome back, fashionista! Ready to slay?</p>
        {error && <p className="error-message">{error}</p>}
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">Log In</button>
      </form>
      <AuthDetails />
    </div>
  );
}

export default SignIn;

