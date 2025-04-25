import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import StudentRegistration from "./pages/StudentRegistration";
import Staff from "./pages/Staff.jsx";
import Users from "./pages/Users.jsx";
import Students from "./pages/Students.jsx";
import MainSidebar from "./components/MainSidebar.jsx";
import Profile from "./pages/Profile.jsx";
import Classes from "./pages/Classes.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Administration from "./pages/Administration.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import Finance from "./pages/Finance.jsx";
import StudentFinance from "./pages/StudentFinance.jsx";
import CreateFeeStructure from "./pages/CreateFeeStructure.jsx";
import ViewFeeStructure from "./pages/ViewFeeStructure.jsx";
import FeeStructure from "./pages/FeeStructure.jsx";
import UpdateStudent from "./components/UpdateStudent.jsx";

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
                  <div className="flex-1 overflow-auto">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route
                        path="/student-registration"
                        element={<StudentRegistration />}
                      />
                      <Route path="/school-staff" element={<Staff />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/students" element={<Students />} />
                      <Route path="/classes" element={<Classes />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route
                        path="/administration"
                        element={<Administration />}
                      />
                      <Route
                        path="/student/:studentId"
                        element={<StudentPage />}
                      />
                      <Route
                        path="/update-student/:studentId"
                        element={<UpdateStudent />}
                      />
                      <Route path="/finance" element={<Finance />} />
                      <Route
                        path="/student-finance/:studentId"
                        element={<StudentFinance />}
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
