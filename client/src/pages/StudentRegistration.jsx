import React from "react";
import { useState } from "react";
import {
  TextInput,
  Alert,
  Button,
  Spinner,
  Select,
  Label,
  Radio,
  Checkbox
} from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function StudentRegistration() {
  const [formData, setFormData] = useState({
    gender: "Female", // Default gender
    dayBoarding: "Day", // Default residence type
    sponsored: false // Default sponsorship status
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Update formData with the new value
    const updatedFormData = { ...formData, [id]: value.trim() };

    // If the grade is changed, update the level accordingly
    if (id === "grade") {
      const grade = value.split(" ")[1] ? parseInt(value.split(" ")[1]) : 0; // Extract the grade number
      let level = "";

      if (grade >= 1 && grade <= 3) {
        level = "Lower School";
      } else if (grade >= 4 && grade <= 6) {
        level = "Middle School";
      } else if (grade >= 7 && grade <= 9) {
        level = "Junior High School";
      } else if (grade >= 10 && grade <= 12) {
        level = "Senior High School";
      } else {
        level = "Pre-Primary";
      }

      updatedFormData.level = level;
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.enrollmentDate ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.DOB ||
      !formData.gender ||
      !formData.grade ||
      !formData.level ||
      !formData.dayBoarding
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/student/admit-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sponsored: formData.sponsored || false // Ensure sponsored is included
        }),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      if (res.ok) {
        setLoading(false);
        setError(null);
        navigate(`/student-finance/${data.admNumber}`);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
        <div className="mt-2 border-b-4 border-black">
          <Label>Personal Information </Label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <TextInput
            type="date"
            id="enrollmentDate"
            placeholder="Admission Number"
            onChange={handleChange}
            required
          />
          <TextInput
            type="text"
            id="firstName"
            placeholder="First Name"
            onChange={handleChange}
            required
          />
          <TextInput
            type="text"
            id="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
          <TextInput
            type="text"
            id="middleName"
            placeholder="Middle Name"
            onChange={handleChange}
          />
          <TextInput 
            type="date" 
            id="DOB" 
            onChange={handleChange} 
            required 
          />
          <div className="flex flex-row gap-3 items-center">
            <div className="flex">
              <h1 className="text-sm font-medium text-gray-900">Gender:</h1>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="gender-female"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={() => setFormData({...formData, gender: "Female"})}
              />
              <Label htmlFor="gender-female">Female</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="gender-male"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={() => setFormData({...formData, gender: "Male"})}
              />
              <Label htmlFor="gender-male">Male</Label>
            </div>
          </div>
        </div>

        <div className="mt-2 border-b-4 border-black">
          <Label>Contact Information </Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            type="text"
            id="parent"
            placeholder="Parent/Guardian"
            onChange={handleChange}
            
          />
          <TextInput
            type="tel"
            id="contact"
            placeholder="Parent/Guardian Phone"
            onChange={handleChange}
            
          />
        </div>

        <div className="mt-2 border-b-4 border-black">
          <Label>Academic Information </Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            id="level"
            value={formData.level || ""}
            onChange={handleChange}
            className="input"
            disabled
            required
          >
            <option value="">Select Level</option>
            <option value="Pre-Primary">Pre-Primary</option>
            <option value="Lower School">Lower School</option>
            <option value="Middle School">Middle School</option>
            <option value="Junior High School">Junior High School</option>
            <option value="Senior High School">Senior High School</option>
          </Select>
          <Select
            id="grade"
            value={formData.grade || ""}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Select Grade</option>
            <option value="Play Group">Play Group</option>
            <option value="PP1">PP1</option>
            <option value="PP2">PP2</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </Select>

          {/* Sponsor Field */}
          <div className="flex items-center gap-2">
            <Checkbox 
              id="sponsored" 
              checked={formData.sponsored || false}
              onChange={(e) => setFormData({...formData, sponsored: e.target.checked})}
            />
            <Label htmlFor="sponsored">Sponsored Student?</Label>
          </div>

          {/* Boarding/Day Field */}
          <div className="flex flex-col gap-2">
            <Label>Residence Type:</Label>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Radio
                  id="dayBoarding-day"
                  name="dayBoarding"
                  value="Day"
                  checked={formData.dayBoarding === "Day"}
                  onChange={() => setFormData({...formData, dayBoarding: "Day"})}
                />
                <Label htmlFor="dayBoarding-day">Day</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="dayBoarding-boarding"
                  name="dayBoarding"
                  value="Boarding"
                  checked={formData.dayBoarding === "Boarding"}
                  onChange={() => setFormData({...formData, dayBoarding: "Boarding"})}
                />
                <Label htmlFor="dayBoarding-boarding">Boarding</Label>
              </div>
            </div>
          </div>
        </div>

        <Button
          gradientDuoTone="cyanToBlue"
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="p-3">Admitting...</span>
            </>
          ) : (
            "Admit Student"
          )}
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