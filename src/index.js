import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';
import App from './App';

axios.interceptors.request.use((request=>{
  let apiUrl = request.url;
  request.url = `https://accidents-tracker.herokuapp.com/api/v1${apiUrl}`;
  if(localStorage.getItem("token")) {
    request.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem("token"))}`
  }
  return request;
}))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);