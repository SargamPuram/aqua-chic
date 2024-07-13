import React, { useEffect, useState } from 'react';
import '../styles/SignUp.css'; // Ensure correct path for styles
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authUser, setAuthUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, [auth]);

  const signup = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User signed up:', userCredential.user);
      }).catch((error) => {
        console.error('Error signing up:', error);
        handleSignUpError(error);
      });
  };

  const handleSignUpError = (error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        setError('The email address is already in use by another account.');
        break;
      case 'auth/invalid-email':
        setError('The email address is not valid.');
        break;
      case 'auth/weak-password':
        setError('The password is too weak.');
        break;
      default:
        setError('Error signing up. Please try again.');
        break;
    }
  };

  return (
    <div className="sign-up-container">
      {authUser ? (
        <div className="signed-in-message">
          <h1>Already Signed In</h1>
          <p>You're already signed in as {authUser.email}.</p>
        </div>
      ) : (
        <form onSubmit={signup} className="sign-up-form">
          <h1>Sign Up</h1>
          <p className="fun-message">Join the fashion revolution and stand out!</p>
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
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
      )}
    </div>
  );
}

export default SignUp;

