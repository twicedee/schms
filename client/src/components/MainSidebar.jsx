import { Sidebar, SidebarItemGroup, SidebarItem, Avatar } from "flowbite-react";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import {
  FaUserCircle,
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { MdAdminPanelSettings } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

export default function MainSidebar({ isVisible, onClose }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", { method: "POST" });
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
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 transition-transform ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:bg-transparent md:translate-x-0 md:static md:bg-transparent`}
      onClick={onClose}
    >
      <Sidebar
        className="w-56  bg-white dark:bg-gray-800"
      >
        <Sidebar.Items>
          <SidebarItemGroup className="flex flex-col gap-2 divide-y divide-gray-200 dark:divide-gray-700">
          {currentUser && (
            <div className="md:hidden block px-4 py-2 text-center">
              <Avatar
                alt="user"
                img={currentUser.profilePicture}
                rounded
                className="mx-auto"
              >
                <div className="font-medium dark:text-white">
                  <div>
                  {currentUser.initials}{currentUser.firstName} {currentUser.lastName}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {currentUser.username}
                  </div>
                </div>
              </Avatar>
            </div>
          )}
            
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
            {currentUser.isAdmin && (<Link to="/finance">
              <SidebarItem icon={FaMoneyCheckAlt} as="div">
                Finance
              </SidebarItem>
            </Link>)}
            {currentUser.isAdmin && (<Link to="/administration">
              <SidebarItem icon={MdAdminPanelSettings} as="div">
                Administration
              </SidebarItem>
            </Link>)}
            <Link to="/profile">
              <SidebarItem icon={FaUserCircle} as="div">
                My Profile
              </SidebarItem>
            </Link>
            <SidebarItem icon={FaSignOutAlt} onClick={handleSignout}>
              Sign Out
            </SidebarItem>
          </SidebarItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
