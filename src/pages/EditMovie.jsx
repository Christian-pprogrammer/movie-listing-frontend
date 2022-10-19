import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function EditMovie() {
  const params = useParams();
  
  useEffect(()=> {
    fetchMovie();
  }, [params.id])

  const [movieName, setMovieName] = useState('');
  const [rating, setRating] = useState('');
  const [cast, setCast] = useState([]);
  const [castElement, setCastElement] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('')
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {
    if(!state.token) {
      navigate('/login')
    }
  }, []) 
  
  const addCast = (e) => {
    console.log(castElement);
    e.preventDefault();
    setCast(()=>[...cast, castElement])
    setCastElement('');
  }

  const submit = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'SET_LOADING'
    })
    try{
      await axios.put(`/movies/favourite-movies/${params.id}`, {
        movieName,
        rating,
        cast,
        genre,
        releaseDate
      })
      alert('movie edited successfully');
      navigate('/movies')
    }catch(err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err
      })
    }
  }
  const fetchMovie = async (id) => {
    try{
      const res = await axios.get(`/movies/favourite-movies/${params.id}`);
      const movie = res.data;
      setMovieName(movie.movieName);
      setRating(movie.rating);
      setCast(movie.cast);
      setGenre(movie.genre);
      setReleaseDate(movie.releaseDate);
    }catch(err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err
      })
    }
  }
  const removeCastItem = (item) => {
    setCast([...cast].filter((element)=>element!==item));
  }
  return (
    <div className='mx-3'>
      <div className='card m-auto' style={{maxWidth: '500px'}}>
        <div className="card-header">
        <h2 className='text-center'>Edit movie</h2>
        </div>
        <div className="card-body">
          <form onSubmit={submit}>
            <div className="movieName mb-3">
              <label htmlFor="movieName">
                Movie Name
              </label>
              <input 
                type='text' 
                className='form-control' 
                value={movieName}
                onChange={(e)=>setMovieName(e.target.value)} 
                required />
            </div>
            <div className="rating mb-3">
              <label htmlFor="rating">
                Rating
              </label>
              <select name="rating" id="rating" className='form-control' value={rating} onChange={(e)=>setRating(e.target.value)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div className="genre mb-3">
              <label htmlFor="genre">
                Genre
              </label>
              <input 
                type='text' 
                className='form-control' 
                value={genre}
                onChange={(e)=>setGenre(e.target.value)} 
                required />
            </div>
            <div className="cast mb-3">
              <label htmlFor="cast">
                Cast
              </label>
              <input 
                type='button' 
                className='form-control text-left' 
                data-toggle="modal" data-target="#addCastModal"
                value={
                  cast
                }
                required 
                />
                <button className='add-btn' type='button' data-toggle="modal" data-target="#addCastModal">
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
                </button>
    
            </div>
            <div className="releaseDate mb-3">
              <label htmlFor="releaseDate">
                Release date
              </label>
              <input 
                type='datetime-local' 
                className='form-control' 
                value={releaseDate}
                onChange={(e)=>setReleaseDate(e.target.value)} 
                required />
            </div>

            <button type='submit' className='btn btn-primary btn-block'>
              Edit Movie
            </button>
          </form>
        </div>
      </div>
      <div className="modal fade" id="addCastModal" tabIndex="-1" role="dialog" aria-labelledby="addCastModalTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Add cast</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={addCast}>
              <div className="modal-body">
                <label htmlFor="castElement">
                  Names
                </label>
                <input 
                  type='text' 
                  className='form-control' 
                  id='castElement' 
                  value={castElement}
                  onChange={(e)=>setCastElement(e.target.value)} 
                  required={true} />
              </div>
              <div className="modal-footer">
                <button type="submit" onClick={addCast} className="btn btn-primary btn-block" data-dismiss="modal" aria-label="Close">Add cast</button>
                <div className='mr-auto'>
                  {
                    cast.map((elem, index) => (
                      <div key={index} className="cast-item">
                        {elem}
                        <button type='button' className="badge badge-danger text-white rounded-circle" onClick={()=>removeCastItem(elem)}>
                          x
                        </button>
                      </div>
                    ))
                  }
                </div>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditMovie