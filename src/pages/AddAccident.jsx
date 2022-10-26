import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import getError from '../utils/getError';

function AddAccident() {

  const [loading, setLoading] = useState(false);
  const [carId, setCarId] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [speed, setSpeed] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {
    if(!state.token) {
      navigate('/login')
    }
  }, []) 
  

  const submit = async (e) => {
    const formData = new FormData();
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('speed', speed);
    formData.append('carId', carId);
    formData.append('image', image)
    e.preventDefault();
    setLoading(true);
    try{
      await axios.post(`/accidents`, formData)
      alert('accident added successfully');
      navigate('/accidents');
    }catch(err) {
      alert(getError(err));
    }
    setLoading(false);
  }

  return (
    <div className='mx-3'>
      <div className='card m-auto' style={{maxWidth: '500px'}}>
        <div className="card-header">
        <h2 className='text-center'>Add accident</h2>
        </div>
        <div className="card-body">
          <form onSubmit={submit}>
            <div className="mb-3">
              <label htmlFor="latitude">
                Latitude
              </label>
              <input 
                type='text' 
                className='form-control' 
                value={latitude}
                onChange={(e)=>setLatitude(e.target.value)} 
                required />
            </div>
            <div className="mb-3">
              <label htmlFor="longitude">
                Longitude
              </label>
              <input 
                type='text' 
                className='form-control' 
                value={longitude}
                onChange={(e)=>setLongitude(e.target.value)} 
                required />
            </div>
            <div className="mb-3">
              <label htmlFor="speed">
                Speed
              </label>
              <input 
                type='text' 
                className='form-control' 
                value={speed}
                onChange={(e)=>setSpeed(e.target.value)} 
                required />
            </div>
            <div className="mb-3">
              <label htmlFor="carId">
                Car id
              </label>
              <input 
                type='text' 
                className='form-control' 
                value={carId}
                onChange={(e)=>setCarId(e.target.value)} 
                required />
            </div>
            <div className="mb-3">
              <label htmlFor="image">
                image/video
              </label>
              <input 
                type='file' 
                className='form-control' 
                onChange={(e)=>setImage(e.target.files[0])} 
                required />
            </div>
          
            <button type='submit' className='btn btn-primary btn-block' disabled={loading}>
              {loading ? 'Loading...':'Add accident'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddAccident;