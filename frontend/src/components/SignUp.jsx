import React, { useState } from 'react';
import '../App.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase';



const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();

    const signup = (e) => {
       e.preventDefault();
       createUserWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
        console.log(userCredential)
       }).catch((error) =>
       {
        console.log(error);
       });

    };
  return (
    <div className='sign-in-container'>
        <form onSubmit={signup}>
            <h1>Sign Up</h1>
            <input type='email' placeholder='Enter your email' 
                                    value={email}
                                        onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input type='password' placeholder='Enter your password' 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type ="submit">Sign Up</button>
        </form>
       

        
    </div>
  )
}

export default SignUp;