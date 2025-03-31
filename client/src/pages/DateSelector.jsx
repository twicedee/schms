import React, { useState } from "react";
import { Dropdown, TextInput, Label, Button } from "flowbite-react";

export default function DateSelector() {
  const [selectedOption, setSelectedOption] = useState("");
  const [importantDate, setImportantDate] = useState("");
  const [description, setDescription] = useState("");
  const [term, setTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // Reset all fields when the option changes
    setImportantDate("");
    setDescription("");
    setTerm("");
    setStartDate("");
    setEndDate("");
  };

  const handleSubmit = async () => {
    const data = {
      type: selectedOption,
      date: importantDate,
      description,
      term,
      startDate,
      endDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/dates",
        data
      );
      console.log("Date saved successfully:", response.data);
      alert("Date saved successfully!");
    } catch (error) {
      console.error("Error saving date:", error);
      alert("Error saving date. Please try again.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Dropdown label="Select Date Type" placement="bottom">
        <Dropdown.Item onClick={() => handleOptionChange("important")}>
          Important Date
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleOptionChange("term")}>
          Term Date
        </Dropdown.Item>
      </Dropdown>

      {selectedOption === "important" && (
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="important-date" value="Important Date" />
            <TextInput
              id="important-date"
              type="date"
              value={importantDate}
              onChange={(e) => setImportantDate(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="description" value="Description" />
            <TextInput
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="mt-1"
            />
          </div>
        </div>
      )}

      {selectedOption === "term" && (
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="term" value="Term" />
            <TextInput
              id="term"
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Enter term (e.g., Term 1, Term 2)"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="start-date" value="Start Date" />
            <TextInput
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="end-date" value="End Date" />
            <TextInput
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      )}

      <Button onClick={handleSubmit} className="mt-4">
        Submit
      </Button>
    </div>
  );
}
