import React from "react";
import { Button, Spinner, Avatar, Modal, Badge, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiOutlineExclamationCircle, HiOutlineCash, HiOutlineCalendar, HiOutlineUser } from 'react-icons/hi';
import { useSelector } from 'react-redux';

export default function StudentPage() {
  const { currentUser } = useSelector((state) => state.user);
  const { studentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [student, setStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/student/get-students?admNumber=${studentId}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setStudent(data.students[0]);
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
        { method: "DELETE" }
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return <Badge color="success" className="w-fit">{status}</Badge>;
      case 'Partial':
        return <Badge color="warning" className="w-fit">{status}</Badge>;
      default:
        return <Badge color="failure" className="w-fit">{status}</Badge>;
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner size="xl" />
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-500">Error loading student data</p>
    </div>
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Student Profile
        </h1>
        {currentUser.isAdmin && (<div className="flex gap-2">
          <Button color="failure" onClick={() => setShowModal(true)}>
            Delete
          </Button>
          <Link to={`/update-student/${student.admNumber}`}>
            <Button color="success">Update</Button>
          </Link>
        </div>)}
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Avatar
              img={student.studentPhoto}
              size="xl"
              rounded
              className="border-2 border-gray-200 dark:border-gray-600"
            />
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {student.firstName} {student.middleName} {student.lastName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Admission #: {student.admNumber}
              </p>
              
              <div className="mt-4 space-y-2">
                <p className="flex items-center gap-2">
                  <HiOutlineUser className="text-gray-500" />
                  <span className="font-medium">Gender:</span> {student.gender}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineCalendar className="text-gray-500" />
                  <span className="font-medium">DOB:</span> {new Date(student.DOB).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Status:</span> 
                  <Badge color={student.dayBoarding === "Day" ? "info" : "pink"}>
                    {student.dayBoarding} {student.sponsored && "(Sponsored)"}
                  </Badge>
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Contact</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {student.parent || "Not specified"}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {student.contact || "Not specified"}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Academic</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Level:</span> {student.level}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Grade:</span> {student.grade}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Enrolled:</span> {new Date(student.enrollmentDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`inline-block p-4 ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-600'}`}
            >
              Profile
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('fees')}
              className={`inline-block p-4 ${activeTab === 'fees' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-600'}`}
            >
              Fee Records
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('payments')}
              className={`inline-block p-4 ${activeTab === 'payments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-600'}`}
            >
              Payment History
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {activeTab === 'profile' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Complete Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Personal Details</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Full Name:</span> {student.firstName} {student.middleName} {student.lastName}</p>
                  <p><span className="font-medium">Date of Birth:</span> {new Date(student.DOB).toLocaleDateString()}</p>
                  <p><span className="font-medium">Gender:</span> {student.gender}</p>
                  <p><span className="font-medium">Status:</span> {student.dayBoarding} {student.sponsored && "(Sponsored)"}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Academic Details</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Admission Number:</span> {student.admNumber}</p>
                  <p><span className="font-medium">Enrollment Date:</span> {new Date(student.enrollmentDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">Current Grade:</span> {student.grade}</p>
                  <p><span className="font-medium">Level:</span> {student.level}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Parent/Guardian:</span> {student.parent || "Not specified"}</p>
                  <p><span className="font-medium">Contact Number:</span> {student.contact || "Not specified"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fees' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Fee Balances</h3>
              {currentUser.isAdmin && (<Link to={`/student-finance/${student.admNumber}`}>
                <Button size="sm" gradientMonochrome="cyan">
                  Manage Fees
                </Button>
              </Link>)}
              
            </div>
            
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Term</Table.HeadCell>
                <Table.HeadCell>Year</Table.HeadCell>
                <Table.HeadCell>Amount</Table.HeadCell>
                <Table.HeadCell>Paid</Table.HeadCell>
                <Table.HeadCell>Balance</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {student.feeBalances?.map((fee, index) => (
                  <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{fee.term}</Table.Cell>
                    <Table.Cell>{fee.year}</Table.Cell>
                    <Table.Cell>{fee.amount?.toLocaleString()}</Table.Cell>
                    <Table.Cell>{fee.paid?.toLocaleString()}</Table.Cell>
                    <Table.Cell>{fee.balance?.toLocaleString()}</Table.Cell>
                    <Table.Cell>{getStatusBadge(fee.status)}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}

        {activeTab === 'payments' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Payment History</h3>
            {student.feeHistory?.length > 0 ? (
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Date</Table.HeadCell>
                  <Table.HeadCell>Term</Table.HeadCell>
                  <Table.HeadCell>Year</Table.HeadCell>
                  <Table.HeadCell>Amount</Table.HeadCell>
                  <Table.HeadCell>Receipt #</Table.HeadCell>
                  <Table.HeadCell>Recorded By</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {student.feeHistory.map((payment, index) => (
                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>{new Date(payment.date).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>{payment.term}</Table.Cell>
                      <Table.Cell>{payment.year}</Table.Cell>
                      <Table.Cell>{payment.amount?.toLocaleString()}</Table.Cell>
                      <Table.Cell>{payment.receiptNumber}</Table.Cell>
                      <Table.Cell>{payment.recordedBy}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            ) : (
              <div className="text-center py-8">
                <HiOutlineCash className="mx-auto h-12 w-12 text-gray-400" />
                <h4 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No payment history</h4>
                <p className="mt-1 text-gray-500 dark:text-gray-400">This student has no recorded payments yet.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
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