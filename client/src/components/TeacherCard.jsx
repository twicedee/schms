import React from "react";

export default function TeacherCard() {



    
  return (
    <>
      <div className="m-3 max-w-full w-full grid grid-cols-1 md:grid-cols-3 border rounded-xl border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
        {/* Avatar section */}
        <div className="flex justify-center items-center p-2 md:col-span-1 flex-shrink-1">
          <Avatar size="xl" className="" />
        </div>

        {/* Text section */}
        <div className="p-3 flex flex-col md:col-span-2 gap-2">
          <h1 className="text-lg font-semibold">Teachers Name</h1>
          <h1 className="text-sm text-gray-600">Ranks if applicable</h1>
          <h1 className="text-sm text-gray-600">Department</h1>
          <h1 className="text-sm text-gray-600">Subjects Teaching</h1>
        </div>
      </div>
    </>
  );
}
