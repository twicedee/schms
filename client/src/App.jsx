import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home";
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
import StudentPage from "./pages/StudentPage.jsx";
import Finance from "./pages/Finance.jsx";
import StudentFinance from "./pages/StudentFinance.jsx";
import StudentsFinance from "./pages/StudentsFinance.jsx";
import CreateFeeStructure from "./pages/CreateFeeStructure.jsx";
import ViewFeeStructure from "./pages/ViewFeeStructure.jsx";
import FeeStructure from "./pages/FeeStructure.jsx";

export default function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  return (
    <BrowserRouter>
      <Header onToggleSidebar={toggleSidebar} />
      {isSidebarVisible && (
        <MainSidebar isVisible={isSidebarVisible} onClose={toggleSidebar} />
      )}
      <div className={` ${isSidebarVisible ? "m-5" : "ml-0"}`}>
        <Routes>
          {/* Public routes */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Private routes with Sidebar layout */}
          <Route element={<PrivateRoute />}>
            <Route
              path="*"
              element={
                <div className="flex flex-row p-2">
                  <MainSidebar />
                  <div className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route
                        path="/student-registration"
                        element={<StudentRegistration />}
                      />
                      <Route path="/school-staff" element={<Staff />} />
                      <Route
                        path="/non-teaching-staff"
                        element={<NonTeachingStaff />}
                      />
                      <Route path="/co-curricular" element={<CoCurricular />} />
                      <Route path="/academics" element={<Academics />} />
                      <Route path="/students" element={<Students />} />
                      <Route path="/department" element={<Department />} />
                      <Route path="/classes" element={<Classes />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route
                        path="/administration"
                        element={<Administration />}
                      />
                      {/* <Route path="/add-staff" element={<AddStaff />} /> */}
                      {/* <Route path="/staff/:staffId" element={<StaffPage />} /> */}
                      <Route
                        path="/student/:studentId"
                        element={<StudentPage />}
                      />
                      <Route path="/finance" element={<Finance />} />
                      <Route
                        path="/student-finance/:studentId"
                        element={<StudentFinance />}
                      />
                      <Route
                        path="/students-finance"
                        element={<StudentsFinance />}
                      />
                      <Route
                        path="/fee-structure-create"
                        element={<CreateFeeStructure />}
                      />
                      <Route path="/fee-structure" element={<FeeStructure />} />
                      <Route
                        path="/view-fee-structures"
                        element={<ViewFeeStructure />}
                      />
                    </Routes>
                  </div>
                </div>
              }
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
