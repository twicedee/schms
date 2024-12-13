import { Avatar } from "flowbite-react";
import React from "react";

export default function TeachingStaff() {
  return (
    <div className="p-5 mx-auto w-full">
      <div className="mb-2 flex text-center justify-center">
        <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Teaching Staff
        </h1>
      </div>
      <div className="m-5 flex-shrink grid md:grid-cols-2 sm:grid-cols-1">
        <div className="m-3 shrink grid grid-cols-3 border rounded-xl border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="p-2">
            <Avatar size="xl" />
          </div>
          <div className="p-3 flex flex-col col-span-2 gap-2">
            <h1>Teachers Name</h1>
            <h1>Ranks if applicable</h1>
            <h1>Department</h1>
            <h1>Subjects Teaching</h1>
          </div>
        </div>

        <div className="m-3 grid grid-cols-3 border rounded-xl border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="p-2 shrink-0">
            <Avatar size="xl" />
          </div>
          <div className="p-3 flex flex-col col-span-2 gap-2">
            <h1>Teachers Name</h1>
            <h1>Ranks if applicable</h1>
            <h1>Department</h1>
            <h1>Subjects Teaching</h1>
          </div>
        </div>

        <div className="m-3 grid grid-cols-3 border rounded-xl border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="p-2 shrink-0">
            <Avatar size="xl" />
          </div>
          <div className="p-3 flex flex-col col-span-2 gap-2">
            <h1>Teachers Name</h1>
            <h1>Ranks if applicable</h1>
            <h1>Department</h1>
            <h1>Subjects Teaching</h1>
          </div>
        </div>

        <div className="m-3 grid grid-cols-3 border rounded-xl border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="p-2 shrink-0">
            <Avatar size="xl" />
          </div>
          <div className="p-3 flex flex-col col-span-2 gap-2">
            <h1>Teachers Name</h1>
            <h1>Ranks if applicable</h1>
            <h1>Department</h1>
            <h1>Subjects Teaching</h1>
          </div>
        </div>

        <div className="m-3 grid grid-cols-3 border rounded-xl border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="p-2 shrink-0">
            <Avatar size="xl" />
          </div>
          <div className="p-3 flex flex-col col-span-2 gap-2">
            <h1>Teachers Name</h1>
            <h1>Ranks if applicable</h1>
            <h1>Department</h1>
            <h1>Subjects Teaching</h1>
          </div>
        </div>

        <div className="flex-0 m-3 grid grid-cols-3 border rounded-xl border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="p-2">
            <Avatar className='shrink-0' size="xl" />
          </div>
          <div className="p-3 flex flex-col col-span-2 gap-2">
            <h1>Teachers Name</h1>
            <h1>Ranks if applicable</h1>
            <h1>Department</h1>
            <h1>Subjects Teaching</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
