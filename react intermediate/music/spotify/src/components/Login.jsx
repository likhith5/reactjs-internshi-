import React from 'react';
import { loginUpdate } from '../store/loginSlice'
import { useDispatch } from 'react-redux'
import '../styles/LoginPage.css';
import { loginApi } from '../utils/apis';


const Login = () => {
  const dispatch = useDispatch();
  const handleLogin =async ()=>{
    let res = await loginApi();
    dispatch(loginUpdate(res));
  }
  return (
    <div className="login-page">
      <div className="login-content">
        <button className="login-button" onClick={handleLogin}>
          Login to your Spotify.
        </button>
      </div>
    </div>
  )
}

export default Login;