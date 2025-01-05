import { Button, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateFeeStructure() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feeStructure, setFeeStructure] = useState({
    level: "",
    term: "",
    amount: "",
  });
  const navigate = useNavigate();

  const levels = ["Lower School", "Middle School", "Junior High School", "Senior High School"];
  const terms = ["Term 1", "Term 2", "Term 3"];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFeeStructure((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { level, term, amount } = feeStructure;

    if (!level || !term || !amount) {
      setError("Please provide level, term, and amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/fee/create-fee-structure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feeStructure),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to save fee structure.");
        setLoading(false);
        return;
      }

      setError(null);
      setLoading(false);
      navigate("/fee-structure-view");
    } catch (err) {
      setError("An error occurred while saving the fee structure.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
          Create Fee Structure
        </h1>
      </div>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-900">
            Select Level
          </label>
          <Select
            id="level"
            required
            value={feeStructure.level}
            onChange={handleInputChange}
          >
            <option value="">Choose a level</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="term" className="block mb-2 text-sm font-medium text-gray-900">
            Select Term
          </label>
          <Select
            id="term"
            required
            value={feeStructure.term}
            onChange={handleInputChange}
          >
            <option value="">Choose a term</option>
            {terms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">
            Fee Amount
          </label>
          <TextInput
            id="amount"
            type="number"
            required
            placeholder="Enter fee amount"
            value={feeStructure.amount}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Fee Structure"}
          </Button>
        </div>
      </form>

      
    </div>
  );
}
