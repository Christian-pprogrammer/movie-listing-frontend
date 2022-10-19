import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  const submit = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'SET_LOADING'
    })
    try{
      const res = await axios.post('/users/register', {
        email,
        password
      })
      dispatch({
        type: 'SET_USER_INFO',
        payload: res.data
      })
      navigate('/movies')
    }catch(err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err
      })
    }
  }
  return (
    <div className='mx-3'>
      <div className='card m-auto' style={{maxWidth: '500px'}}>
        <div className="card-header">
        <h2 className='text-center'>Register</h2>
        </div>
        <div className="card-body">
          <form onSubmit={submit}>
            <div className="email mb-3">
              <label htmlFor="email">
                Email
              </label>
              <input 
                type='email' 
                className='form-control' 
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                
                required />
            </div>
            <div className="password mb-3">
              <label htmlFor="password">
                Password
              </label>
              <input 
                type='password' 
                className='form-control' 
                value={password}
                onChange={(e)=>setPassword(e.target.value)} 
                required />
            </div>
            <button type='submit' className='btn btn-primary btn-block'>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register