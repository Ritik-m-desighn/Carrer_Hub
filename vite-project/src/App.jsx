import React from 'react'
import Form from './components/register'
import Home from './components/Home'
import Login from './components/Login'
import { useNavigate,Navigate} from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Filtered from './components/Filtered'
import Applications from './components/Applications'
import Profile from './components/Profile'
import AddJob from './components/AddJob'
import YourJobs from './components/YourJobs'
const App = () => {
  const navigate=useNavigate();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/addJobs' element={<AddJob/>}/>
        <Route path='/Yourjobs' element={<YourJobs/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/applications' element={<Applications/>}/>
        <Route path='/filtered' element={<Filtered/>}/>
        <Route path='/register' element={<Form/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
    </div>
  )
}

export default App;