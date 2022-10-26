import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import getError from '../utils/getError';

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  if(!state.token) {
    navigate('/login');
  }
  useEffect(()=> {
    fetchCars();
  }, [])
  const editCar = (id) => {
    navigate(`/edit-car/${id}`);
  }
  const deleteCar = async (id) => {
    try{
      if(window.confirm('Are you sure?')) {
        const res = await axios.delete(`/cars/${id}`)
        alert(res.data.message);
        setCars(()=>cars.filter((car)=>car._id !== id))
      };
    }catch(err) {
      alert(getError(err));
    }
  }
  const fetchCars = async () => {
    setLoading(true);
    try{
      const res = await axios.get('/cars');
      setCars(res.data.cars);
      console.log(res.data.cars)
    }catch(err) {
      alert(getError(err))
    }
    setLoading(false);
  }
  const addCar = () => {
    navigate('/add-car')
  }
  return (
    <div>
      <div className='car-title my-4'>
        <h2>All cars</h2>
        <button className='btn btn-primary' onClick={addCar}>Add car</button>
      </div>
      <div style={{overflow: 'auto'}}>
        <table className="table table-bordered" style={{textAlign: 'center'}}>
          <thead>
            <tr>
              <th scope="col">Car id</th>
              <th scope="col">Owner names</th>
              <th scope="col">Owner telephone</th>
              <th scope="col">Car plate</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              loading && <tr>
                <td colSpan={6}>Loading cars...</td>
              </tr>
            }
            {
              !loading && cars.length === 0 && (
                <tr>
                  <td colSpan={6}>No cars available</td>
                </tr>
              )
            }
            {
              cars.map((car) => (
              <tr key={car._id}>
                <td scope="row" style={{verticalAlign: 'middle'}}>
                  {car._id}
                </td>
                <td scope="row" style={{verticalAlign: 'middle'}}>
                  {car.ownerNames}
                </td>
                <td style={{verticalAlign: 'middle'}}>
                  {car.ownerTelephone}
                </td>
                
                <td style={{verticalAlign: 'middle'}}>
                  {car.plate}
                </td>
                <td style={{verticalAlign: 'middle'}}>
                  <button className='btn btn-primary' onClick={()=>editCar(car._id)}>Edit</button>
                </td>
                <td style={{verticalAlign: 'middle'}}>
                  <button 
                    className='btn btn-danger' 
                    onClick={()=>deleteCar(car._id)}>Delete</button>
                </td>
              </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Cars