import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function Navbar() {
  const {state, dispatch} = useContext(UserContext);
  const location = useLocation();
  const {pathname} = location;
  const navigate = useNavigate();
  const logout = () => {
    dispatch({
      type: 'LOGOUT'
    })
    navigate('/login');
  }
  return (
    <nav className="mb-5 navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Admin Dashboard
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {
              !state.token ? (<>
                <li className={`nav-item ${pathname === '/login' ? 'active':''}`}>
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>):(
                <>
                  <li className={`nav-item ${pathname === '/cars' ? 'active':''}`}>
                    <Link className="nav-link" to="/cars">Cars</Link>
                  </li>
                  <li className={`nav-item ${pathname === '/users' ? 'active':''}`}>
                    <Link className="nav-link" to="/users">Users<span className="sr-only">(current)</span></Link>
                  </li>
                  <li className={`nav-item ${pathname === '/add-user' ? 'active':''}`}>
                    <Link className="nav-link" to="/phones">Phones<span className="sr-only">(current)</span></Link>
                  </li>
                  <li className={`nav-item ${pathname === '/accidents' ? 'active':''}`}>
                    <Link className="nav-link" to="/accidents">Accidents<span className="sr-only">(current)</span></Link>
                  </li>

                  <li className="nav-item">
                    <a 
                      className="nav-link" 
                      style={{cursor: 'pointer'}}
                      onClick={logout}
                      >Logout</a>
                  </li>
                </>
              )
            }
            
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar