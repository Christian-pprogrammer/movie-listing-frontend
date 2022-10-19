import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  if(!state.token) {
    navigate('/login');
  }
  useEffect(()=> {
    fetchMovies();
  }, [])
  const editMovie = (id) => {
    navigate(`/edit-movie/${id}`);
  }
  const deleteMovie = async (id) => {
    try{
      const res = await axios.delete(`/movies/favourite-movies/${id}`)
      alert(res.data.message);
      setMovies(()=>movies.filter((movie)=>movie.id != id))
    }catch(err) {

    }
  }
  const fetchMovies = async () => {
    try{
      const res = await axios.get('/movies/favourite-movies');
      setMovies(res.data);
      console.log(res.data)
    }catch(err) {
      console.log(err);
    }
  }
  const addMovie = () => {
    navigate('/add-movie')
  }
  return (
    <div>
      <div className='movie-title my-4'>
        <h2>Favourite movies</h2>
        <button className='btn btn-primary' onClick={addMovie}>Add movie</button>
      </div>
      
      
      <div style={{overflow: 'auto'}}>
        <table className="table table-bordered" style={{textAlign: 'center'}}>
          <thead>
            <tr>
              <th scope="col">Movie Name</th>
              <th scope="col">Rating</th>
              <th scope="col">Cast</th>
              <th scope="col">Genre</th>
              <th scope="col">Release Dare</th>
              <th scope="col">Edit movie</th>
              <th scope="col">Delete movie</th>
            </tr>
          </thead>
          <tbody>
            {
              movies.map((movie) => (
              <tr key={movie.id}>
                <td scope="row" style={{verticalAlign: 'middle'}}>
                  {movie.movieName}
                </td>
                <td style={{verticalAlign: 'middle'}}>
                  {movie.rating}
                </td>
                <td style={{verticalAlign: 'middle'}}>
                  <ul className='list-group'>
                  {
                    movie.cast.map((element, index) => (
                      <li className='list-group-item' key={index}>{element}</li>
                    ))
                  }
                  </ul>
                </td>
                <td style={{verticalAlign: 'middle'}}>
                  {movie.genre}
                </td>
                <td style={{verticalAlign: 'middle'}}>
                  {movie.releaseDate.split('T')[0]},
                  {movie.releaseDate.split('T')[1].slice(0,8)}
                </td>
                <td style={{verticalAlign: 'middle'}}>
                  <button className='btn btn-primary' onClick={()=>editMovie(movie.id)}>Edit</button>
                </td>
                <td style={{verticalAlign: 'middle'}}>
                  <button className='btn btn-danger' onClick={()=>deleteMovie(movie.id)}>Delete</button>
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

export default Movies