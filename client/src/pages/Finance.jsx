/**
 * The Finance component renders a page with options to create and check fee structures.
 * @returns The `Finance` component is being returned. It is a functional component that renders a
 * section related to finance. Inside the component, there is a div with a class name of "mx-auto
 * w-full max-w-4xl" containing a heading "Finance" and two buttons wrapped in `Link` components that
 * navigate to different routes ("/fee-structure-create" and "/fee-structure").
 */
import React from "react";
import { Spinner, Button } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Finance() {

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
          Finance
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
        <Link to="/fee-structure-create">
          <Button className="w-full">Create Fee Structure</Button>
        </Link>

        <Link to="/fee-structure">
          <Button className="w-full">Check Fee Structures</Button>
        </Link>
      </div>
    </div>
  );
}
