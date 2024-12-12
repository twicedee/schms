import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home'
//import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard' 
import StudentRegistration from './pages/StudentRegistration'


export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/student-registration" element={<StudentRegistration/>}/>
        <Route path="/teaching-staff"/>
        <Route path="/non-teaching-staff"/>
        <Route path="/co-curricular"/>
        <Route path="/academics"/>
        <Route path="/students"/>
        <Route path="/students"/>
        <Route path="/students"/>

      </Routes>
    
    </BrowserRouter>
  );
}

