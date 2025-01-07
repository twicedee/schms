import { Button, Navbar, TextInput, Avatar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const {currentUser} = useSelector((state) => state.user);
  const now = new Date();
  return (
    <Navbar className="border-b-2">
      <span className="text-center text-lg bg-gradient-to-r">ELIMU SCHOOL</span>

      <div className="flex flex-row justify-end gap-1">
        <span className="justify-center align-bottom flex flex-col">{now.toLocaleString()}</span>
      </div>
      <div>
        {currentUser ? (
          <Avatar alt="user" img={currentUser.profilePicture} rounded>
            <div className="font-medium dark:text-white">
              <div>{currentUser.initials} {currentUser.firstName}{currentUser.lastName}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {currentUser.username}
              </div>
            </div>
          </Avatar>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="greyToBlack">Sign In</Button>
          </Link>
        )}
      </div>
    </Navbar>
  );
}
