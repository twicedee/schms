import {
  TextInput,
  Alert,
  Avatar,
  Button,
  Label,
  Badge,
  Table,
  Spinner,
  Select,
  Modal,
} from "flowbite-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineCash, HiOutlineReceiptTax } from "react-icons/hi";
import { useSelector } from "react-redux";

export default function StudentFinance() {
  const { currentUser } = useSelector((state) => state.user);

  const { studentId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    term: "",
    receiptNumber: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/student/get-students?admNumber=${studentId}`
        );
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Failed to fetch student");
          setLoading(false);
          return;
        }
        if (res.ok) {
          setStudent(data.students[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchStudent();
  }, [studentId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPaymentLoading(true);
    setError(null);

    if (!formData.amount || !formData.term) {
      setError("Please fill in all required fields");
      setPaymentLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/student/update-student/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feePayment: {
            ...formData,
            recordedBy: `${currentUser.initials}${currentUser.firstName} ${currentUser.lastName}`,
          },
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Payment failed");
        return;
      }

      setSuccess("Payment recorded successfully!");
      setFormData({
        amount: "",
        term: "",
        receiptNumber: "",
        year: new Date().getFullYear(),
      });
      setShowPaymentModal(false);
      const refreshRes = await fetch(
        `/api/student/get-students?admNumber=${studentId}`
      );
      const refreshData = await refreshRes.json();
      if (refreshRes.ok) {
        setStudent(refreshData.students[0]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return <Badge color="success">{status}</Badge>;
      case "Partial":
        return <Badge color="warning">{status}</Badge>;
      default:
        return <Badge color="failure">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Student Finance
        </h1>
        <Button onClick={() => setShowPaymentModal(true)}>
          <HiOutlineCash className="mr-2 h-5 w-5" />
          Record Payment
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Avatar
              img={student?.studentPhoto}
              size="xl"
              rounded
              className="border-2 border-gray-200 dark:border-gray-600"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {student?.firstName} {student?.middleName} {student?.lastName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Admission #: {student?.admNumber} | {student?.dayBoarding}{" "}
              {student?.sponscer && "(Sponsored)"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Academic
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Grade:</span> {student?.grade}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Level:</span> {student?.level}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Contact
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Parent:</span>{" "}
                  {student?.parent || "Not specified"}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Phone:</span>{" "}
                  {student?.contact || "Not specified"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Fee Balances
        </h3>

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
            {student?.feeBalances?.map((fee, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{fee.term}</Table.Cell>
                <Table.Cell>{fee.year}</Table.Cell>
                <Table.Cell>KSh {fee.amount?.toLocaleString()}</Table.Cell>
                <Table.Cell>KSh {fee.paid?.toLocaleString()}</Table.Cell>
                <Table.Cell>KSh {fee.balance?.toLocaleString()}</Table.Cell>
                <Table.Cell>{getStatusBadge(fee.status)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Payment History
        </h3>

        {student?.feeHistory?.length > 0 ? (
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Term</Table.HeadCell>
              <Table.HeadCell>Year</Table.HeadCell>
              <Table.HeadCell>Receipt #</Table.HeadCell>
              <Table.HeadCell>Recorded By</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {student.feeHistory.map((payment, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    {new Date(payment.date).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    KSh {payment.amount?.toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>{payment.term}</Table.Cell>
                  <Table.Cell>{payment.year}</Table.Cell>
                  <Table.Cell>{payment.receiptNumber}</Table.Cell>
                  <Table.Cell>{payment.recordedBy}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No payment history found
          </div>
        )}
      </div>

      <Modal show={showPaymentModal} onClose={() => setShowPaymentModal(false)}>
        <Modal.Header>Record New Payment</Modal.Header>
        <Modal.Body>
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount (KSh)</Label>
              <TextInput
                type="number"
                id="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                placeholder="Enter amount"
              />
            </div>

            <div>
              <Label htmlFor="term">Term</Label>
              <Select
                id="term"
                value={formData.term}
                onChange={handleChange}
                required
              >
                <option value="">Select Term</option>
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="year">Year</Label>
              <TextInput
                type="number"
                id="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="receiptNumber">Receipt Number (Optional)</Label>
              <TextInput
                type="text"
                id="receiptNumber"
                value={formData.receiptNumber}
                onChange={handleChange}
                placeholder="Enter receipt number"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button color="gray" onClick={() => setShowPaymentModal(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={paymentLoading}>
                {paymentLoading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Processing...</span>
                  </>
                ) : (
                  "Record Payment"
                )}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {error && (
        <Alert
          className="mb-4"
          color="failure"
          onDismiss={() => setError(null)}
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          className="mb-4"
          color="success"
          onDismiss={() => setSuccess(null)}
        >
          {success}
        </Alert>
      )}
    </div>
  );
}
