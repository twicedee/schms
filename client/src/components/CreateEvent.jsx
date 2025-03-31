import React, { useState } from "react";
import { Alert, Modal, TextInput, Button, Label, Select } from "flowbite-react";

export default function CreateEvent() {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
    setFormData((prevData) => ({ ...prevData, event: option }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) {
      return setError("Please fill all fields");
    }
    try {
      setLoading(true);
      const res = await fetch("/api/events/set-event-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setSuccess(null);
      } else {
        setSuccess("Event created successfully!");
        setError(null);
        setOpenModal(false);
      }
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className="w-full">
        Create Event
      </Button>
      <Modal
        show={openModal}
        size="xl"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex m-auto justify-center ">
            <h1 className="font-semibold"> Add Important Dates</h1>
          </div>
          <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
            <div>
              <Select
                id="event"
                onChange={handleOptionChange}
                className="input"
                required
              >
                <option value="">Select Event Type</option>
                <option value="important">Important Date</option>
                <option value="term">Term Date</option>
              </Select>
            </div>

            {selectedOption === "important" && (
              <div className="flex justify-center flex-row gap-4 mt-4 ">
                <div>
                  <Label htmlFor="important-date" value="Important Date" />
                  <TextInput
                    id="date"
                    type="date"
                    onChange={handleChange}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description" value="Description" />
                  <TextInput
                    id="description"
                    type="text"
                    onChange={handleChange}
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
                  <Select
                    id="term"
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="">Select Term</option>
                    <option value="Term 1">Term 1</option>
                    <option value="Term 2">Term 2</option>
                    <option value="Term 3">Term 3</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="start-date" value="Start Date" />
                  <TextInput
                    id="startDate"
                    type="date"
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="end-date" value="End Date" />
                  <TextInput
                    id="endDate"
                    type="date"
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <Button type="submit" className="flex flex-row mt-4 justify-end">
                {loading ? "Submitting..." : "Submit"}{" "}
              </Button>

              
            </div>
            {error && (
                <Alert color="failure" className="mt-4">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert color="success" className="mt-4">
                  {success}
                </Alert>
              )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
