import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function EditUser() {
  const params = useParams();
  
  useEffect(()=> {
    fetchUser();
  }, [params.id])

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [names, setNames] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {
    if(!state.token) {
      navigate('/login')
    }
  }, []) 

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try{
      await axios.put(`/users/${params.id}`, {
        names,
        telephone,
        username,
        password
      })
      alert('user edited successfully');
      navigate('/users')
    }catch(err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err
      })
    }
    setLoading(false);
  }
  const fetchUser = async (id) => {
    try{
      const res = await axios.get(`/users/${params.id}`);
      console.log(res.data)
      const user = res.data;
      setNames(user.names);
      setTelephone(user.telephone);
      setUsername(user.username);
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
        <h2 className='text-center'>Edit User</h2>
        </div>
        <div className="card-body">
          <form onSubmit={submit}>
            <div className="names mb-3">
              <label htmlFor="names">
                Names
              </label>
              <input 
                type='text' 
                className='form-control' 
                value={names}
                onChange={(e)=>setNames(e.target.value)} 
                required />
            </div>
            <div className="telephone mb-3">
              <label htmlFor="telephone">
                Telephone
              </label>
              <input 
                type='text' 
                className='form-control' 
                value={telephone}
                onChange={(e)=>setTelephone(e.target.value)} 
                required />
            </div>
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

            <button type='submit' className='btn btn-primary btn-block' disabled={loading}>
              {loading ? 'Loading...':'Edit user'}
            </button>
          </form>
        </div>
      </div>
      
    </div>
  )
}

export default EditUser;