import { Button, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'



export default function Header() {
  return (
    <Navbar className='border-b-2'> 
      <span className='text-left text-lg bg-gradient-to-r'>ELIMU SCHOOL</span>
      <form>
        <TextInput
          type='text'
          placeholder='Search Student'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch/>
      </Button >

      <div className='flex gap-1 md:order-2' >
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon/>
        </Button>
        <Link to="/sign-in">
          <Button gradientDuoTone="greyToBlack">
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle/>
      </div>


      
      <Navbar.Collapse>
        <Navbar.Link href="#">
          Profile
        </Navbar.Link>
        <Navbar.Link as={Link} href="/academics">Academics</Navbar.Link>
        <Navbar.Link href="/student-registration">Student Registration</Navbar.Link>
        <Navbar.Link href="/teaching-staff">Teaching Staff</Navbar.Link>
        <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
        <Navbar.Link href="/">Log out</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
