import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle, FaChalkboardTeacher, FaSignOutAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";
import { PiStudentBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { MdSportsSoccer, MdAdminPanelSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";



export default function MainSidebar() {
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className=" lg:w-56 lg:icon h-full  ">
      <Sidebar.Items>
        <SidebarItemGroup className="flex flex-col gap-2 divide-y divide-gray-200 dark:divide-gray-700">
          <Link to="/">
            <Sidebar.Item active icon={AiFillHome} as="div">
              Home
            </Sidebar.Item>
          </Link>
          <Link to="/classes">
            <SidebarItem icon={SiGoogleclassroom} as="div">
              Classes
            </SidebarItem>
          </Link>
          <Link to="/students">
            <SidebarItem icon={PiStudentBold} as="div">
              Students
            </SidebarItem>
          </Link>
          <Link to="/school-staff">
            <SidebarItem icon={FaChalkboardTeacher} as="div">
              Staff
            </SidebarItem>
          </Link>
          <Link to="/academics">
            <SidebarItem icon={HiAcademicCap} as="div">
              Academics
            </SidebarItem>
          </Link>
          <Link to="/co-curricular">
            <SidebarItem icon={MdSportsSoccer} as="div">
              Co-Curricular
            </SidebarItem>
          </Link>
          <Link to="/finance">
            <SidebarItem icon={FaMoneyCheckAlt} as="div">
              Finance
            </SidebarItem>
          </Link>
          <Link to="/administration">
            <SidebarItem icon={MdAdminPanelSettings} as="div">
              Administration
            </SidebarItem>
          </Link>
          <Link to="/profile">
            <SidebarItem as="div" icon={FaUserCircle}>
              My Profile
            </SidebarItem>
          </Link>
          <SidebarItem icon={FaSignOutAlt} onClick={handleSignout}>Sign Out</SidebarItem>
        </SidebarItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
