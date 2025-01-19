import { Avatar } from "flowbite-react";
import React from "react";

export default function Staff() {
  return (
    <div className="p-5 mx-auto w-full">
      <div className="mb-2 flex text-center justify-center">
        <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Staff
        </h1>
      </div>

      <div className="m-5 flex-shrink grid md:grid-cols-2 sm:grid-cols-1 gap-5">
        <div className="m-3 max-w-full w-full grid grid-cols-1 md:grid-cols-3 border rounded-xl border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          {/* Avatar section */}
          <div className="flex justify-center items-center p-2 md:col-span-1 flex-shrink-1">
          <img
                      src= "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      alt="pic"
                      className="object-cover bg-gray-500 "
                    />
          </div>

          {/* Text section */}
          <div className="p-3 flex flex-col md:col-span-2 gap-2">
            <h1 className="text-lg font-semibold">Teachers Name</h1>
            <h1 className="text-sm text-gray-600">Ranks if applicable</h1>
            <h1 className="text-sm text-gray-600">Department</h1>
            <h1 className="text-sm text-gray-600">Subjects Teaching</h1>
          </div>
        </div>
        
      </div>
    </div>
  );
}
