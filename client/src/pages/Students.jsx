import { Avatar, List, TabItem, Tabs } from "flowbite-react";
import React from "react";

export default function Students() {
  return (
    <div className="p-5 mx-auto w-full">
      <div className="mb-2 flex text-center justify-center">
        <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Students
        </h1>
      </div>
      <div>
        <Tabs variant="fullWidth">
          <TabItem title="All Students">
            <div className="m-5 w-full flex-col">
              <List
                ordered
                className="w-full max-w-md divide-y divide-gray-200 dark:divide-gray-700"
              >
                <List.Item className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar alt="Neil image" size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Neil Sims
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        email@flowbite.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $320
                    </div>
                  </div>
                </List.Item>
                <List.Item className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar
                      img="/images/people/profile-picture-3.jpg"
                      alt="Neil image"
                      rounded
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Bonnie Green
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        email@flowbite.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $3467
                    </div>
                  </div>
                </List.Item>
                <List.Item className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar
                      img="/images/people/profile-picture-2.jpg"
                      alt="Neil image"
                      rounded
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Michael Gough
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        email@flowbite.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $67
                    </div>
                  </div>
                </List.Item>
                <List.Item className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar
                      img="/images/people/profile-picture-5.jpg"
                      alt="Neil image"
                      rounded
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Thomas Lean
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        email@flowbite.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $2367
                    </div>
                  </div>
                </List.Item>
                <List.Item className="pb-0 pt-3 sm:pt-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar
                      img="/images/people/profile-picture-4.jpg"
                      alt="Neil image"
                      rounded
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Lana Byrd
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        email@flowbite.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $367
                    </div>
                  </div>
                </List.Item>
              </List>
            </div>
          </TabItem>
          <TabItem>Lower School</TabItem>
          <TabItem>Middle School</TabItem>
          <TabItem>Junior High School</TabItem>
          <TabItem>Senior High School</TabItem>
        </Tabs>
      </div>
    </div>
  );
}
