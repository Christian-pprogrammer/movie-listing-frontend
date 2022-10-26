import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import getError from '../utils/getError';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  console.log(state.loading)
  useEffect(() => {
    if(state.token) {
      navigate('/cars')
    }
  }, []) 
  
  const submit = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'SET_LOADING'
    })
    try{
      const res = await axios.post('/auth/login', {
        username,
        password
      })
      dispatch({
        type: 'SET_USER_INFO',
        payload: res.data
      })
      navigate('/cars')
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
        <h2 className='text-center'>Login</h2>
        </div>
        <div className="card-body">
          <form onSubmit={submit}>
            <div className="username mb-3">
              <label htmlFor="username">
                Username
              </label>
              <input 
                type='text' 
                className='form-control' 
                value={username}
                onChange={(e)=>setUsername(e.target.value)} 
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
            <button type='submit' className='btn btn-primary btn-block' disabled={state.loading}>
              {
                state.loading ? 'Loading...':'Login'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login