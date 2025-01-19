import { Button, Navbar, Avatar } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

export default function Header({ onToggleSidebar }) {
  const { currentUser } = useSelector((state) => state.user);
  const now = new Date();

  return (
    <Navbar className="border-b-2">
      <div className="flex items-center gap-2">
        <Avatar img="/mashimoni.png" className="bg-transparent" />
        <span className="text-lg font-semibold">Mashimoni Moyo Academy</span>
      </div>
      <span className="hidden lg:block px-3">{now.toLocaleDateString()}</span>
      <div className="flex items-center gap-4">
        {currentUser? (<Navbar.Toggle onClick={onToggleSidebar} />):(<></>)}
        
        {currentUser ? (
          <Avatar alt="user" img={currentUser.profilePicture} rounded className="hidden md:inline-flex lg:inline-flex">
            <div className="font-medium dark:text-white">
              <div>
              {currentUser.initials}{currentUser.firstName} {currentUser.lastName}
              </div>
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
