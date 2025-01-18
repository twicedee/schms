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

export default function Students() {
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
    <div className="max-w-full mx-auto ">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
          Students
        </h1>
      </div>
      <div className="max-w-full mx-auto m-3 p-3 overflow-x-scroll">
        <Table
          ordered
          className="  divide-y divide-gray-200 dark:divide-gray-700"
        >
          <Table.Head>
            <Table.HeadCell>Adm. No</Table.HeadCell>
            <Table.HeadCell>Student Photo</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Gender</Table.HeadCell>
            <Table.HeadCell>Grade</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">View</span>
            </Table.HeadCell>
          </Table.Head>
          {students.map((student) => (
            <Table.Body className="divide-y" key={student._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{student.admNumber}</Table.Cell>

                <Table.Cell>
                  <img
                    src={student.studentPhoto}
                    alt={student.firstName}
                    className="w-10 h-10 object-cover bg-gray-500 "
                  />
                </Table.Cell>
                <Table.Cell className=" text-md font-medium text-gray-900 dark:text-white">
                  <p className="text-md font-medium text-gray-900 dark:text-white">
                    {student.firstName} {student.middleName} {student.lastName}
                  </p>
                </Table.Cell>
                <Table.Cell>{student.gender === "Male" ? "M" : "F"}</Table.Cell>

                <Table.Cell>
                  <p className="text-md text-gray-500 dark:text-gray-400">
                    {student.grade}
                  </p>
                </Table.Cell>

                <Table.Cell>
                  <Link
                    to={`/student/${student.admNumber}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </div>
    </div>
  );
}
