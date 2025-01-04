import React from "react";
import { useState } from "react";
import { TextInput, Alert, Button, Spinner} from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function StudentRegistration() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.admNumber ||
      !formData.firstName ||
      !formData.middleName ||
      !formData.lastName ||
      !formData.DOB ||
      !formData.gender ||
      !formData.grade ||
      !formData.level
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch("/api/student/admit-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      }

      if (res.ok) {
        setError(null);
        navigate(`/student/${data.admNumber}`);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Admit New Student
        </h1>

        {/* Student Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            type="number"
            id="admNumber"
            placeholder="Admission Number"
            onChange={handleChange}
          />
          <TextInput
            type="text"
            id="firstName"
            placeholder="first Name"
            onChange={handleChange}
          />
          <TextInput
            type="text"
            id="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            type="text"
            id="middleName"
            placeholder="Middle Name"
            onChange={handleChange}
          />
          <TextInput type="date" id="DOB" onChange={handleChange} />

          <select
            id="gender"
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select
            id="level"
            //value={formData.level}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select Level</option>
            <option value="Lower School">Lower School</option>
            <option value="Middle School">Middle School</option>
            <option value="Junior High School">Junior High School</option>
            <option value="Senior High School">Senior High School</option>
          </select>
          <select
            id="grade"
            //value={formData.grade}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select Grade</option>
            <option value="grade 1">Grade 1</option>
            <option value="grade 2">Grade 2</option>
            <option value="grade 3">Grade 3</option>
            <option value="grade 4">Grade 4</option>
            <option value="grade 5">Grade 5</option>
            <option value="grade 6">Grade 6</option>
            <option value="grade 7">Grade 7</option>
            <option value="grade 8">Grade 8</option>
            <option value="grade 9">Grade 9</option>
            <option value="grade 10">Grade 10</option>
            <option value="grade 11">Grade 11</option>
            <option value="grade 12">Grade 12</option>
          </select>
        </div>

        <Button gradientDuoTone="purpleToPink" type="submit">
          Admit Student
        </Button>
        {error && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )}
      </form>
    </div>
  );
}
