import React from 'react'
import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const singInWithGoogle = async() => {
    const result = await signInWithPopup(auth, provider)
    
    console.log(result);
    navigate('/');
  }
  return (
    <div>
      <p>Sign in with google</p>
      <button onClick={singInWithGoogle}>Sign in</button>
    </div>
  )
}

export default Login