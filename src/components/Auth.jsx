import React from 'react'
import {auth,provider} from'../firebase-config.js';
import {signInWithPopup} from 'firebase/auth';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Auth = ({setIsAuth}) => {
  const signInWithGoogle = async()=>{
    try{

      const result =  await signInWithPopup(auth,provider);
      console.log(result);
      cookies.set('auth-token',result.user.refreshToken);
      setIsAuth(true);
    }
     catch(err){
      console.error(err);
     } 

  }
  return (
    <div className="auth">
      <p>Sign in with google to continue</p>
      <p>Dont worry, Your google's account data will not be stored!</p>
      <p>Feel Free To Chat</p>
      <button style={{padding:"5px 10px",backgroundColor:"#F3G3DE"}} onClick={signInWithGoogle}>Sign In With Google</button>
      
    </div>
  )
}

export default Auth
