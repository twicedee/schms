import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home";
//import About from './pages/About'
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import StudentRegistration from "./pages/StudentRegistration";
import TeachingStaff from "./pages/TeachingStaff.jsx";
import NonTeachingStaff from "./pages/NonTeachingStaff.jsx";
import CoCurricular from "./pages/CoCurricular.jsx";
import Academics from "./pages/Academics.jsx";
import Students from "./pages/Students.jsx";
import MainSidebar from "./components/MainSidebar.jsx";
import { Sidebar } from "flowbite-react";
import Profile from "./pages/Profile.jsx";
import Department from "./pages/Department.jsx";
import Classes from "./pages/Classes.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="flex flex-row m-5 p-5">
        <MainSidebar/>
      
        <Routes className="flex-1">
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student-registration" element={<StudentRegistration />} />
          <Route path="/teaching-staff" element={<TeachingStaff />} />
          <Route path="/non-teaching-staff" element={<NonTeachingStaff />} />
          <Route path="/co-curricular" element={<CoCurricular />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/students" element={<Students />} />
          <Route path="/department" element={<Department/>}/>
          <Route path="/classes" element={<Classes/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </div>
      
    </BrowserRouter>
  );
}
