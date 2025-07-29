// import React from 'react'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './Login.css'; 
// import './styles/Login.css'

export const Login = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  function setWithExpiry(key, value, ttl) {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

  const loguser = async() =>{
    let result = await fetch('https://form-maker-backend.onrender.com/api/user/login',{
        method:'post',
        body:JSON.stringify({email,password}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    result = await result.json()
    console.log(result)

    if(!result.success){
      alert("Invalid credentials.")
      setEmail('')
      setPassword('')
    }

    if(result.success){
       navigate('/dashboard')
       localStorage.setItem('user',JSON.stringify(result.user))
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Please login to your account</p>

        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="button" onClick={loguser} className="login-button">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to='/signup'>Sign Up</Link>
            {/* <a href="/register">Sign Up</a> */}
          </p>
        </div>
      </div>
    </div>
  )
}
