import { TabItem, Tabs } from "flowbite-react";
import React from "react";

export default function Classes() {
  return (
    <div className="w-full m-5">
      <div className="justify-center w-full">
        <div className="p-5">
          <Tabs variant="fullWidth">
            <TabItem active title="All Classes"></TabItem>
            <TabItem title="Pre-School"></TabItem>
            <TabItem title="Lower School">
            </TabItem>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
