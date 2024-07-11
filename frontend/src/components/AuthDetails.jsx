import React, {useEffect, useState} from 'react';
import { getAuth , onAuthStateChanged, signOut} from 'firebase/auth';
import app from '../firebase';





const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user) {
                setAuthUser(user)
            } else {
                setAuthUser(null);
            }

        });
         
        return () => {
            listen();

        }

    }, []);

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('sign out successful')
        }).catch(error => console.error())

    }
  return (
    <div>
        {
            authUser ? <><h1>Signed In as {authUser.email}</h1><button onClick={userSignOut}> Sign Out </button></> : <h1>Signed Out</h1>
        }
    </div>
  )
}

export default AuthDetails;