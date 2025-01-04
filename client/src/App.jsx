import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home";
//import About from './pages/About'
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import StudentRegistration from "./pages/StudentRegistration";
import Staff from "./pages/Staff.jsx";
import NonTeachingStaff from "./pages/NonTeachingStaff.jsx";
import CoCurricular from "./pages/CoCurricular.jsx";
import Academics from "./pages/Academics.jsx";
import Students from "./pages/Students.jsx";
import MainSidebar from "./components/MainSidebar.jsx";
import Profile from "./pages/Profile.jsx";
import Department from "./pages/Department.jsx";
import Classes from "./pages/Classes.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Administration from "./pages/Administration.jsx";
import AddStaff from "./pages/AddStaff.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import StaffPage from "./pages/StaffPage.jsx"
import Finance from "./pages/Finance.jsx"
import StudentFinance from "./pages/StudentFinance.jsx";



export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Private route with Sidebar layout */}
        <Route element={<PrivateRoute />}>
          <Route 
            path="*" 
            element={
              <div className="flex flex-row max-w-auto m-3 p-2">
                <MainSidebar />
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/student-registration" element={<StudentRegistration />} />
                    <Route path="/school-staff" element={<Staff />} />
                    <Route path="/non-teaching-staff" element={<NonTeachingStaff />} />
                    <Route path="/co-curricular" element={<CoCurricular />} />
                    <Route path="/academics" element={<Academics />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/department" element={<Department />} />
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/administration" element={<Administration />} />
                    <Route path="/add-staff" element={<AddStaff />} />
                    <Route path="/staff/:staffId" element={<StaffPage />} />
                    <Route path='/student/:studentId' element={<StudentPage />} />
                    <Route path="/finance" element={<Finance/>}/>
                    <Route path="/student-finance/:studentId" element={<StudentFinance/>}/>
                  </Routes>
                </div>
              </div>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
