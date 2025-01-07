import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";

export default function FeeStructure() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feeStructure, setFeeStructure] = useState([]);

  const levels = [
    "Lower School",
    "Middle School",
    "Junior High School",
    "Senior High School",
  ];
  const terms = ["Term 1", "Term 2", "Term 3"];

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

  return (
    <div>
      {" "}
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
      </div>
    </div>
  );
}
