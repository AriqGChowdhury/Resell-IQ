import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import NavBar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute'
import Welcome from './pages/Welcome'
import Footer from './components/Footer'
import About from './pages/About'
import Recents from './pages/Recents'

import 'bootstrap/dist/css/bootstrap.min.css'
import api from './api'


function Logout() {
  localStorage.clear()
  return <Navigate to='/login' />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  const [user, setUser] = useState(null);

   useEffect(() => {
      getUser();
    }, [])

    const getUser = () => {
        api
        .get('auth/login')
        .then((res) => res.data)
        .then((data) => {setUser(data); console.log(data)})
        .catch((err) => alert(err))
    };
  return (
    <div className="">
      <BrowserRouter>
      <NavBar user={user} setUser={setUser} /> {}
        <Routes>
          <Route 
            path='/'
            element={
              <ProtectedRoute>
                  <Home />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/login'
            element={<Login setUser={setUser}/>}
          />
          <Route 
            path='/register'
            element={<Register />}
          />
          <Route
            path='/welcome'
            element={<Welcome />}
          />
          <Route
            path='/about'
            element={<About />}
          />
          <Route
            path='/recents'
            element={<Recents />}
          />
        </Routes>
      </BrowserRouter>
      <Footer /> {}
    </div>
    
  )
}

export default App
