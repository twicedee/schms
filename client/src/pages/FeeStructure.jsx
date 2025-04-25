import React, { useState, useEffect } from "react";
import { Table, Tabs, TabItem } from "flowbite-react";

export default function FeeStructure() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feeStructure, setFeeStructure] = useState([]);
  const [activeTab, setActiveTab] = useState("Boarding"); 

  const levels = [
    "Pre-Primary",
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
    <div className="p-5 m-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Fee Structure</h2>
        
        <Tabs 
          variant="fullWidth" 
          onActiveTabChange={(tab) => setActiveTab(tab === 0 ? "Boarding" : "Day")}
        >
          <TabItem active={activeTab === "Boarding"} title="Boarding" />
          <TabItem active={activeTab === "Day"} title="Day" />
        </Tabs>
      </div>

      <div className="mt-4">
        <Table className="border border-gray-500 rounded-md">
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
                    (item) => 
                      item.level === level && 
                      item.term === term && 
                      item.dayBoarding === activeTab
                  );
                  return (
                    <Table.Cell key={term}>
                      {fee ? `KES${fee.amount}` : "-"}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}