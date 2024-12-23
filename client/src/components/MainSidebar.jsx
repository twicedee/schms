import { Sidebar, SidebarItem, SidebarItemGroup } from 'flowbite-react'
import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function MainSidebar() {
  const dispatch = useDispatch()
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
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
    <Sidebar className='max-w-56 md:w-50 h-full' >
      <Sidebar.Items>
        <SidebarItemGroup className='flex flex-col gap-2 divide-y divide-gray-200 dark:divide-gray-700'>
          <Link to="/">
          <Sidebar.Item 
          active
          icon={AiFillHome}
          as='div'
          >
            Home
          </Sidebar.Item>
          
          </Link>
          <Link to="/classes"><SidebarItem>Classes</SidebarItem></Link>
          <Link to="/students"><SidebarItem>Students</SidebarItem></Link>
          <Link to="/teaching-staff"><SidebarItem>Teachers</SidebarItem></Link>
          <Link to="/academics"><SidebarItem>Academics</SidebarItem></Link>
          <Link to="/co-curricular"><SidebarItem>Co-Curricular</SidebarItem></Link>
          <Link to="/departments"><SidebarItem>Departments</SidebarItem></Link>
          <Link to="/administration"><SidebarItem>Administration</SidebarItem></Link>
          <Link to="/profile"><SidebarItem icon={FaUserCircle}>My Profile</SidebarItem></Link>
          <SidebarItem onClick={handleSignout}>Sign Out</SidebarItem>



        </SidebarItemGroup>

      </Sidebar.Items>


    </Sidebar>
  )
}
