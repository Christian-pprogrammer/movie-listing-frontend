import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function EditPhone() {
  const params = useParams();
  
  useEffect(()=> {
    fetchPhone();
  }, [params.id])

  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sector, setSector] = useState('');
  const [category, setCategory] = useState('');
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
      await axios.put(`/phones/${params.id}`, {
        phoneNumber,
        sector,
        category
      })
      alert('phone edited successfully');
      navigate('/phones')
    }catch(err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err
      })
    }
    setLoading(false);
  }
  const fetchPhone = async (id) => {
    try{
      const res = await axios.get(`/phones/${params.id}`);
      console.log(res.data)
      const phone = res.data;
      setPhoneNumber(phone.phoneNumber);
      setSector(phone.sector);
      setCategory(phone.category);
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
        <h2 className='text-center'>Edit phone</h2>
        </div>
        <div className="card-body">
          <form onSubmit={submit}>
            <div className="phoneNumber mb-3">
              <label htmlFor="phoneNumber">
                Phone Number
              </label>
              <input 
                type='text' 
                className='form-control' 
                value={phoneNumber}
                onChange={(e)=>setPhoneNumber(e.target.value)} 
                required />
            </div>
            <div className="sector mb-3">
              <label htmlFor="sector">
                Sector
              </label>
              <input 
                type='text' 
                className='form-control' 
                value={sector}
                onChange={(e)=>setSector(e.target.value)} 
                required />
            </div>
            <div className="category mb-3">
              <label htmlFor="category">
                Category
              </label>
              <select name="category" id="category" className='form-control' value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value=""></option>
                <option value="HEAD_QUARTER">head quarter</option>
                <option value="HOSPITAL">hospital</option>
                <option value="POLICE_STATION">police station</option>
              </select>
            </div>
          

            <button type='submit' className='btn btn-primary btn-block' disabled={loading}>
              {loading ? 'Loading...':'Edit Car'}
            </button>
          </form>
        </div>
      </div>
      
    </div>
  )
}

export default EditPhone;