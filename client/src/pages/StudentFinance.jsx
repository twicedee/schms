import { TextInput, Alert, Avatar, Button, Label } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function StudentFinance() {
  const studentId = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/student/get-students?admNumber=${studentId}`
        );
        const data = await res.json();
        console.log(data)
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setStudent(data.students[0]);
          console.log(data.students[0]);
          setLoading(false);
          setError(false)
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchStudent();
  }, [studentId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/students/update-student?admNumber=${studentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }

      if (res.ok) {
        setError(null);
        navigate(`/student-finance/${data.admNumber}`);
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

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
              <span className="font-semibold">
                Enrollment Date: {student && student.createdAt}
              </span>
            </p>
            <p>
              <span className="font-semibold">Grade: </span>
              {student && student.grade}
            </p>
            <p>
              <span className="font-semibold">Level: </span>
              {student && student.level}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div>
          <p>Fee Statement</p>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="p-4 flex gap-4"
          >
            <div className="flex flex-col gap-4">
              <Label htmlFor="disabledInput1">Current Balance</Label>
              <TextInput
                type="text"
                id="disabledInput1"
                placeholder= {student && student.feeBalance}
                disabled
              />
              <Label htmlFor="disabledInput2">Fee paid</Label>
              <TextInput
                type="text"
                id="disabledInput2"
                placeholder="Disabled readonly input"
                disabled
                readOnly
              />
              <TextInput
                type="number"
                id="feeBalance"
                onChange={handleChange}
              />
            </div>

            <div>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 w-full rounded-lg focus:outline-none"
              >
                Update Fee Balance
              </Button>
            </div>
          </form>
        </div>
      </div>

      {error && (
        <Alert className="mt-5" color="failure">
          {error}
        </Alert>
      )}
    </div>
  );
}
