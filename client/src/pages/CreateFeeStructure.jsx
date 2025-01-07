import { Button, Select, TextInput, Table } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpdateFees from "../components/UpdateFees";

export default function CreateFeeStructure() {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [feeStructure, setFeeStructure] = useState([]);
  const navigate = useNavigate();

  const levels = [
    "Lower School",
    "Middle School",
    "Junior High School",
    "Senior High School",
  ];
  const terms = ["Term 1", "Term 2", "Term 3"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  useEffect(() => {
    const fetchFeeStructure = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/fee/get-fee-structure");
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (Array.isArray(data)) {
          setFeeStructure(data);
          setLoading(false);
          setError(false);
        } else {
          setLoading(false);
          setError("Expected fee structure to be an array.");
          console.error("Expected fee structure to be an array.");
        }
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchFeeStructure();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //
    if (!formData.level || !formData.term || !formData.amount) {
      setError("Please provide level, term, and amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/fee/create-fee-structure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to save fee structure.");
        setLoading(false);
        return;
      }

      setError(null);
      setLoading(false);
      navigate("/fee-structure-create");
    } catch (err) {
      setError("An error occurred while saving the fee structure.");
      setLoading(false);
    }
  };

  return (
    <div className="m-20 flex flex-col ">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
          Create Fee Structure
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="level"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select Level
          </label>
          <Select id="level" required onChange={handleChange}>
            <option value="">Choose a level</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label
            htmlFor="term"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select Term
          </label>
          <Select id="term" required onChange={handleChange}>
            <option value="">Choose a term</option>
            {terms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Fee Amount
          </label>
          <TextInput
            id="amount"
            type="number"
            required
            placeholder="Enter fee amount"
            onChange={handleChange}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Fee Structure"}
          </Button>
        </div>
        {error && <p className="mb-4 text-red-500">{error}</p>}
      </form>

      <div className="border border-gray-500 rounded-md p-5 mt-8">
        <div className="mt-2">
          <h2 className="mb-4 text-xl font-bold">Fee Structure</h2>
          <Table>
            <Table.Head>
              <Table.HeadCell>Level</Table.HeadCell>
              {terms.map((term) => (
                <Table.HeadCell key={term}>{term}</Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body>
              {levels.map((level) => (
                <Table.Row key={level}>
                  <Table.Cell className="font-medium">{level}</Table.Cell>
                  {terms.map((term) => {
                    const fee = feeStructure.find(
                      (item) => item.level === level && item.term === term
                    );
                    return (
                      <Table.Cell key={term}>
                        {fee ? fee.amount : "-"}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="align-bottom mt-2"><UpdateFees/></div>
      </div>
    </div>
  );
}
