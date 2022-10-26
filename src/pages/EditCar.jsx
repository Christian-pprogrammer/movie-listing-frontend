import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function EditCar() {
  const params = useParams();
  
  useEffect(()=> {
    fetchCar();
  }, [params.id])

  const [loading, setLoading] = useState(false);
  const [ownerNames, setOwnerNames] = useState('');
  const [ownerTelephone, setOwnerTelephone] = useState('');
  const [plate, setPlate] = useState('');
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
      await axios.put(`/cars/${params.id}`, {
        ownerNames,
        ownerTelephone,
        plate
      })
      alert('car edited successfully');
      navigate('/cars')
    }catch(err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err
      })
    }
    setLoading(false);
  }
  const fetchCar = async (id) => {
    try{
      const res = await axios.get(`/cars/${params.id}`);
      const car = res.data;
      setOwnerNames(car.ownerNames);
      setOwnerTelephone(car.ownerTelephone);
      setPlate(car.plate);
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
        <h2 className='text-center'>Edit car</h2>
        </div>
        <div className="card-body">
          <form onSubmit={submit}>
            <div className="ownerNames mb-3">
              <label htmlFor="ownerNames">
                Owner Names
              </label>
              <input 
                type='text' 
                className='form-control' 
                value={ownerNames}
                onChange={(e)=>setOwnerNames(e.target.value)} 
                required />
            </div>
            <div className="ownerTelephone mb-3">
              <label htmlFor="ownerTelephone">
                Owner telephone
              </label>
              <input 
                type='text' 
                className='form-control' 
                value={ownerTelephone}
                onChange={(e)=>setOwnerTelephone(e.target.value)} 
                required />
            </div>
            <div className="plate mb-3">
              <label htmlFor="plate">
                Plate
              </label>
              <input 
                type='text' 
                className='form-control' 
                value={plate}
                onChange={(e)=>setPlate(e.target.value)} 
                required />
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

export default EditCar;