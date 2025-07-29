
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
 const [name,setName] = useState('')
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')
 const navigate = useNavigate();
//  console.log(email)

 useEffect(()=>{
   const auth = localStorage.getItem('user');
   if(auth){
    // navigate('/')
   }
 },[])


   const adduser = async ()=>{
      const result = await fetch('https://form-maker-backend.onrender.com/api/user/signup',{
        method:'post',
        body:JSON.stringify({name,email,password}),
      headers:{
        'Content-Type':'application/json'
      }
    })

    let data = await result.json()
    console.log(data)
    // console.log(data.success)
    if(!data.success){
      alert("User already exists")
      setEmail('')
      setName('')
      setPassword('')
    }
    // console.log(data)
    // localStorage.setItem('user',JSON.stringify(data));
    if(data.success){
    navigate('/login')
    }
   }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        {/* <p className="register-subtitle">Join our community today</p> */}

        <form >
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>

          {/* <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div> */}

          <button type="button" onClick={adduser} className="register-button">
            Sign Up
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
}
