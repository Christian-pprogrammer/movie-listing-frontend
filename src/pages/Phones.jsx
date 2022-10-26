import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import getError from '../utils/getError';

function Phones() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  if(!state.token) {
    navigate('/login');
  }
  useEffect(()=> {
    fetchPhones();
  }, [])
  const editPhone = (id) => {
    navigate(`/phones/edit/${id}`);
  }
  const deletePhone = async (id) => {
    try{
      if(window.confirm('Are you sure?')) {
        const res = await axios.delete(`/phones/${id}`)
        setPhones(()=>phones.filter((phone)=>phone._id !== id))
      };
    }catch(err) {
      alert(getError(err));
    }
  }
  const fetchPhones = async () => {
    setLoading(true);
    try{
      const res = await axios.get('/phones');
      setPhones(res.data.phones);
    }catch(err) {
      alert(getError(err))
    }
    setLoading(false);
  }
  const addPhone = () => {
    navigate('/phones/add-phone')
  }
  return (
    <div>
      <div className='car-title my-4'>
        <h2>All Phones</h2>
        <button className='btn btn-primary' onClick={addPhone}>Add phone</button>
      </div>
      <div style={{overflow: 'auto'}}>
        <table className="table table-bordered" style={{textAlign: 'center'}}>
          <thead>
            <tr>
              <th scope="col">Phone number</th>
              <th scope="col">Sector</th>
              <th scope="col">Category</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              loading && <tr>
                <td colSpan={5}>Loading phones...</td>
              </tr>
            }
            {
              !loading && phones.length === 0 && (
                <tr>
                  <td colSpan={5}>No phones available</td>
                </tr>
              )
            }
            {
              phones.map((phone) => (
              <tr key={phone._id}>
                <td scope="row" style={{verticalAlign: 'middle'}}>
                  {phone.phoneNumber}
                </td>
                <td style={{verticalAlign: 'middle'}}>
                  {phone.sector}
                </td>
                
                <td style={{verticalAlign: 'middle'}}>
                  {phone.category}
                </td>
                <td style={{verticalAlign: 'middle'}}>
                  <button className='btn btn-primary' onClick={()=>editPhone(phone._id)}>Edit</button>
                </td>
                <td style={{verticalAlign: 'middle'}}>
                  <button 
                    className='btn btn-danger' 
                    onClick={()=>deletePhone(phone._id)}>Delete</button>
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

export default Phones