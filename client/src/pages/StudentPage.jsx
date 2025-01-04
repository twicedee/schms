import React from "react";
import { Button, Spinner, Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function StudentPage() {
  const { studentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [student, setStudent] = useState(null);
  const now = new Date()
  //console.log(studentId);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/student/get-students?admNumber=${studentId}`
        );
        const data = await res.json();
        //console.log(data)
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setStudent(data.students[0]);
          //console.log(data.students[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchStudent();
  }, [studentId]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <div className="p-3 m-10 max-w-full w-full max-h-500  border rounded-xl border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="flex justify-center items-center p-2 md:col-span-1 flex-shrink-1">
          <Avatar size="xl" className="" />
        </div>

        {/* Basic Info */}
        <div className="mb-4 p-3 flex flex-col  gap-2">
          <h3 className="text-lg font-semibold text-gray-700">
            Personal Information
          </h3>
          <div className="mt-2 text-gray-600">
            <p>
              <span className="font-semibold">Name: </span>
              {student && student.firstName} {student && student.middleName}{" "}
              {student && student.lastName}
            </p>
            <p>
              <span className="font-semibold">Date of Birth: </span>
              {new Date(student && student.DOB).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Gender: </span>{" "}
              {student && student.gender}
            </p>
          </div>

          
        </div>

        {/* Academic Info */}
        <div className="mb-4 p-3 flex flex-col  gap-2">
          <h3 className="text-lg font-semibold text-gray-700">
            Academic Information
          </h3>
          <div className="mt-2 text-gray-600">
            <p>
              <span className="font-semibold">Enrollment Date:</span>{" "}
            </p>
            <p>
              <span className="font-semibold">Grade: </span>
              {student && student.grade}{" "}
            </p>
            <p>
              <span className="font-semibold">Level: </span>
              {student.level}{" "}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 flex justify-end gap-4">
        <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg focus:outline-none">
          Delete
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg focus:outline-none">
          Edit
        </Button>
      </div>
    </div>
  );
}
