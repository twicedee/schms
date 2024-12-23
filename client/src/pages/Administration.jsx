import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Administration() {
  return (
    <div className="p-5 flex flex-col mx-auto w-full gap-5">

        <Link to="/student-registration">
            <Button>Add Student</Button>
        </Link>

        <Link to="/add-staff">
            <Button>Add Staff</Button>
        </Link>
    </div>
  )
}
