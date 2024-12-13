import { Sidebar, SidebarItem, SidebarItemGroup } from 'flowbite-react'
import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function MainSidebar() {
  return (
    <Sidebar className='w-full md:w-50 h-full' >
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
          <Link to="/profile"><SidebarItem icon={FaUserCircle}>My Profile</SidebarItem></Link>


        </SidebarItemGroup>

      </Sidebar.Items>


    </Sidebar>
  )
}
