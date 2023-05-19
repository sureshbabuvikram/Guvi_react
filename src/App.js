import React from 'react';
import Login from './components/Login';
import Register from './components/Register'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}>Login</Route>  
        <Route path='/register' element={<Register />}>Login</Route>  
        <Route path='/profile' element={<Profile />}>Login</Route>  
      </Routes>
    </BrowserRouter>
  )
}

export default App
