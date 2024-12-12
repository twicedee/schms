import { Sidebar, SidebarItem, SidebarItemGroup } from 'flowbite-react'
import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'

export default function MainSidebar() {
  return (
    <Sidebar className='w-full md:w-56' >
      <Sidebar.Items>
        <SidebarItemGroup className='flex flex-col gap-2 '>
          <Sidebar.Item 
          active
          icon={AiFillHome}
          as='div'
          >
            Home
          </Sidebar.Item>
          <SidebarItem>Academics</SidebarItem>
          <SidebarItem>Teachers</SidebarItem>
          <SidebarItem>Students</SidebarItem>
          <SidebarItem>Co-Curricular</SidebarItem>
          <SidebarItem>Departments</SidebarItem>
          <SidebarItem icon={FaUserCircle}>My Profile</SidebarItem>


        </SidebarItemGroup>

      </Sidebar.Items>


    </Sidebar>
  )
}
