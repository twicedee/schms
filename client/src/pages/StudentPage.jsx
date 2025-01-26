import React from "react";
import { Button, Spinner, Avatar, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';



export default function StudentPage() {
  const { currentUser } = useSelector((state) => state.user);
  const { studentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [student, setStudent] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [studentIdToDelete, setStudentIdToDelete] = useState("");

  const now = new Date();
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

  const handleDeleteStudent = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/student/delete-student/${studentId}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        navigate("/students");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <div className="p-3 m-10 border rounded-xl border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className=" grid grid-cols-1 md:grid-cols-3">
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
              {new Date(student && student.createdAt).toLocaleDateString()}
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
        <Button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg focus:outline-none "
          onClick={() => {
            setShowModal(true);
            setStudentIdToDelete(student.admNumber);
          }}
        >
          Delete
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg focus:outline-none">
          Edit
        </Button>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this student?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteStudent}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
