import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Footer from './components/Footer';
import Login from './pages/Login';
import { UserProvider } from './context/UserContext';
import Movies from './pages/Movies';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
function App() {
  return (
    <UserProvider>
      <Router>
        <div className='main-container'>
          <div>
          <Navbar />
          <div className='container'>
          
            <Routes>
              <Route path='/' element={<Navigate to="/register" />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/movies' element={<Movies />} />
              <Route path='/add-movie' element={<AddMovie />} />
              <Route path='/edit-movie/:id' element={<EditMovie />} />
            </Routes>
          </div>
          </div>
          <Footer />
        </div>
      </Router>
    </UserProvider>
    
  );
}

export default App;
