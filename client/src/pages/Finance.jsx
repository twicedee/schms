import React from "react";
import {
  Avatar,
  List,
  Spinner,
  Button,
  Table,
  TableCell,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Finance() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [students, setStudents] = useState([]); // State to store the list of students

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/student/get-students");
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setStudents(data.students);
        console.log(data.students[0]);
        setLoading(false);
        setError(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchStudents();
  }, []); // Run only once when the component mounts

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
          Finance
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3">
        <Link to="/fee-structure-create">
          <Button className="w-full">Create Fee Structure</Button>
        </Link>

        <Link to="/students-finance">
          <Button className="w-full">Check students Arrears</Button>
        </Link>
        <Link to="/fee-structure">
          <Button className="w-full">Check Fee Structures</Button>
        </Link>
      </div>
    </div>
  );
}
