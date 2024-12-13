import { TabItem, Tabs } from "flowbite-react";
import React from "react";

export default function Classes() {
  return (
    <div className="w-full m-5">
      <div className="justify-center w-full">
        <div className="p-5">
          <Tabs variant="fullWidth">
            <TabItem active title="All Classes"></TabItem>
            <TabItem title="Lower School">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Classes
                </h1>
              </div>
            </TabItem>
            <TabItem title="Middle School"></TabItem>
            <TabItem title="Junior High School"></TabItem>
            <TabItem title="Senior High School"></TabItem>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
