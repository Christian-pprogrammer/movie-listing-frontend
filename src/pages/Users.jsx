import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import getError from '../utils/getError';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  if(!state.token) {
    navigate('/login');
  }
  useEffect(()=> {
    fetchUsers();
  }, [])
  const editUser = (id) => {
    navigate(`/users/edit/${id}`);
  }
  const deleteUser = async (id) => {
    try{
      if(window.confirm('Are you sure?')) {
        const res = await axios.delete(`/users/${id}`)
        alert(res.data.message);
        setUsers(()=>users.filter((user)=>user._id !== id))
      };
    }catch(err) {
      alert(getError(err));
    }
  }
  const fetchUsers = async () => {
    setLoading(true);
    try{
      const res = await axios.get('/users');
      setUsers(res.data.users);
      console.log(res.data.users)
    }catch(err) {
      alert(getError(err))
    }
    setLoading(false);
  }
  const addUser = () => {
    navigate('/users/add-user')
  }
  return (
    <div>
      <div className='car-title my-4'>
        <h2>All users</h2>
        <button className='btn btn-primary' onClick={addUser}>Add user</button>
      </div>
      <div style={{overflow: 'auto'}}>
        <table className="table table-bordered" style={{textAlign: 'center'}}>
          <thead>
            <tr>
              <th>Names</th>
              <th>Telephone</th>
              <th scope="col">Username</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              loading && <tr>
                <td colSpan={5}>Loading users...</td>
              </tr>
            }
            {
              !loading && users.length === 0 && (
                <tr>
                  <td colSpan={5}>No users available</td>
                </tr>
              )
            }
            {
              users.map((user) => (
              <tr key={user._id}>
                <td scope="row" style={{verticalAlign: 'middle'}}>
                  {user.names}
                </td>
                <td scope="row" style={{verticalAlign: 'middle'}}>
                  {user.telephone}
                </td>
                <td scope="row" style={{verticalAlign: 'middle'}}>
                  {user.username}
                </td>
                
                <td style={{verticalAlign: 'middle'}}>
                  <button className='btn btn-primary' onClick={()=>editUser(user._id)}>Edit</button>
                </td>
                <td style={{verticalAlign: 'middle'}}>
                  <button 
                    className='btn btn-danger' 
                    onClick={()=>deleteUser(user._id)}>Delete</button>
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

export default Users