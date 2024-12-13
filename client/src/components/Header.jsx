import { Button, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'



export default function Header() {
  return (
    <Navbar className='border-b-2'> 
      <span className='text-center text-lg bg-gradient-to-r'>ELIMU SCHOOL</span>
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


      
      
    </Navbar>
  )
}
