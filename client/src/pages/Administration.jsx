import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import SignUpInvite from "../components/SignUpInvite";
import CreateEvent from "../components/CreateEvent";

export default function Administration() {
  return (
    <div className="p-10 mt-10 flex flex-col mx-auto w-full gap-5">
      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4 ">
        
        <Link to="/student-registration">
          <Button className="w-full">Add Student</Button>
        </Link>

        <SignUpInvite/>
        <Link to="/users">
          <Button className="w-full">View Users</Button>
        </Link>
        <CreateEvent/>
      </div>
    </div>
  );
}
