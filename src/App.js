import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Navbar from './components/Navbar';
import Register from './pages/AddUser';
import Footer from './components/Footer';
import Login from './pages/Login';
import { UserProvider } from './context/UserContext';
import AddCar from './pages/AddCar';
import Cars from './pages/Cars';
import EditCar from './pages/EditCar';
import Phones from './pages/Phones';
import AddPhone from './pages/AddPhone';
import Users from './pages/Users';
import EditPhone from './pages/EditPhone';
import EditUser from './pages/EditUser';
import Accidents from './pages/Accidents';
import AddAccident from './pages/AddAccident';
function App() {
  return (
    <UserProvider>
      <Router>
        <div className='main-container'>
          <div>
          <Navbar />
          <div className='container'>
          
            <Routes>
              <Route path='/' element={<Navigate to="/login" />} />
              
              <Route path='/login' element={<Login />} />
              <Route path='/add-car' element={<AddCar />} />
              <Route path='/cars' element={<Cars />} />
              <Route path='/edit-car/:id' element={<EditCar />} />
              <Route path='/phones' element={<Phones />} />
              <Route path='/phones/add-phone' element={<AddPhone />} />
              <Route path='/phones/edit/:id' element={<EditPhone />} />
              <Route path='/users' element={<Users />} />
              <Route path='/users/add-user' element={<Register />} />
              <Route path='/users/edit/:id' element={<EditUser />} />
              <Route path='/accidents' element={<Accidents />} />
              <Route path='/accidents/new-accident' element={<AddAccident />} />
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
