import {
  Button,
  Select,
  TextInput,
  Table,
  Tabs,
  TabItem,
  Alert,
  Accordion,
  Badge
} from "flowbite-react";
import React, { useState, useEffect } from "react";
import { HiInformationCircle } from "react-icons/hi";
import UpdateFees from "../components/UpdateFees"

export default function CreateFeeStructure() {
  const [formData, setFormData] = useState({
    dayBoarding: "Boarding",
    level: "",
    year: new Date().getFullYear(),
    term: "",
    amount: null
  });
  const [loading, setLoading] = useState(false);
  const [feeStructure, setFeeStructure] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const levels = [
    "Pre-Primary",
    "Lower School",
    "Middle School",
    "Junior High School",
    "Senior High School"
  ];
  const terms = ["Term 1", "Term 2", "Term 3"];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const dayBoardingValue = tab === 0 ? "Boarding" : "Day"; 
    setFormData(prev => ({ ...prev, dayBoarding: dayBoardingValue }));
  };

  useEffect(() => {
    const fetchFeeStructure = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/fee/get-fee-structure");
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.message || "Failed to fetch fees");
        
        setFeeStructure(data || {});
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeeStructure();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.level || !formData.year || !formData.term || !formData.amount) {
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

      setSuccess("Fee structure created successfully!");
      setError(null);
      
      const refreshRes = await fetch("/api/fee/get-fee-structure");
      const refreshData = await refreshRes.json();
      if (refreshRes.ok) {
        setFeeStructure(refreshData);
      }
      
    } catch (err) {
      setError("An error occurred while saving the fee structure.");
    } finally {
      setLoading(false);
    }
  };

  const sortedYears = Object.keys(feeStructure).sort((a, b) => b - a);

  return (
    <div className="m-20 flex flex-col">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
          Create Fee Structure
        </h1>
      </div>

      <div className="w-full mb-6">
        <Tabs
          variant="fullWidth"
          onActiveTabChange={handleTabChange}
          defaultActiveTab={activeTab}
        >
          <TabItem title="Boarding" />
          <TabItem title="Day" />
        </Tabs>
      </div>

      {error && (
        <Alert color="failure" icon={HiInformationCircle} className="mb-4">
          {error}
        </Alert>
      )}
      {success && (
        <Alert color="success" icon={HiInformationCircle} className="mb-4">
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-900">
              Select Level
            </label>
            <Select
              id="level"
              required
              onChange={handleChange}
              value={formData.level}
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
              onChange={handleChange}
              value={formData.term}
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
            <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900">
              Year
            </label>
            <Select
              id="year"
              required
              onChange={handleChange}
              value={formData.year}
            >
              {Array.from(
                { length: 20 },
                (_, i) => new Date().getFullYear() - i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">
              Fee Amount (KES)
            </label>
            <TextInput
              id="amount"
              type="number"
              required
              min="0"
              step="100"
              placeholder="Enter fee amount"
              onChange={handleChange}
              value={formData.amount}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Fee Structure"}
          </Button>
        </div>
      </form>
      <UpdateFees/>

      <div className="border border-gray-200 rounded-lg p-5">
        <h2 className="mb-4 text-xl font-bold">
          {activeTab === 0 ? "Boarding" : "Day"} School Fee Structures by Year
        </h2>
        
        {sortedYears.length === 0 ? (
          <p className="text-gray-500">No fee structures found</p>
        ) : (
          <Accordion alwaysOpen={true}>
            {sortedYears.map((year) => (
              <Accordion.Panel key={year}>
                <Accordion.Title>
                  <div className="flex items-center justify-between w-full">
                    <span>Year {year}</span>
                    <Badge color="gray">{feeStructure[year].length} entries</Badge>
                  </div>
                </Accordion.Title>
                <Accordion.Content>
                  <div className="overflow-x-auto">
                    <Table hoverable>
                      <Table.Head>
                        <Table.HeadCell>Level</Table.HeadCell>
                        {terms.map((term) => (
                          <Table.HeadCell key={term}>{term}</Table.HeadCell>
                        ))}
                      </Table.Head>
                      <Table.Body className="divide-y">
                        {levels.map((level) => (
                          <Table.Row key={level} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
                              {level}
                            </Table.Cell>
                            {terms.map((term) => {
                              const fee = feeStructure[year].find(
                                (item) =>
                                  item.level === level &&
                                  item.term === term &&
                                  item.dayBoarding === (activeTab === 0 ? "Boarding" : "Day")
                              );
                              return (
                                <Table.Cell key={term}>
                                  {fee ? `KES ${fee.amount?.toLocaleString() ?? '0'}` : "-"}
                                </Table.Cell>
                              );
                            })}
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}