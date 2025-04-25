import React from "react";
import { useState, useEffect } from "react";
import {
  TextInput,
  Alert,
  Button,
  Spinner,
  Select,
  Label,
  Radio,
  Checkbox,
  Modal,
} from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateStudent() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    gender: "Female",
    dayBoarding: "Day",
    sponsored: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
          setFormData({
            ...data.students[0],
            DOB: data.students[0].DOB.split("T")[0],
            enrollmentDate: data.students[0].enrollmentDate.split("T")[0],
          });
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
    const { id, value } = e.target;
    const updatedFormData = { ...formData, [id]: value.trim() };

    if (id === "grade") {
      const grade = value.split(" ")[1] ? parseInt(value.split(" ")[1]) : 0;
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
      return setError("Please fill in all required fields.");
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/student/update-student/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Update failed");
        return;
      }

      navigate(`/student/${studentId}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md space-y-4"
        >
          <h1 className="text-2xl font-bold text-center mb-4">
            Update Student
          </h1>

          <div className="mt-2 border-b-4 border-black">
            <Label>Personal Information</Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="enrollmentDate">Enrollment Date</Label>
              <TextInput
                type="date"
                id="enrollmentDate"
                value={formData.enrollmentDate || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <TextInput
                type="text"
                id="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <TextInput
                type="text"
                id="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="middleName">Middle Name</Label>
              <TextInput
                type="text"
                id="middleName"
                value={formData.middleName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="DOB">Date of Birth</Label>
              <TextInput
                type="date"
                id="DOB"
                value={formData.DOB || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Gender</Label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Radio
                    id="gender-female"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={() =>
                      setFormData({ ...formData, gender: "Female" })
                    }
                  />
                  <Label htmlFor="gender-female">Female</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="gender-male"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={() =>
                      setFormData({ ...formData, gender: "Male" })
                    }
                  />
                  <Label htmlFor="gender-male">Male</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 border-b-4 border-black">
            <Label>Contact Information</Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="parent">Parent/Guardian</Label>
              <TextInput
                type="text"
                id="parent"
                value={formData.parent || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="contact">Contact Number</Label>
              <TextInput
                type="tel"
                id="contact"
                value={formData.contact || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-2 border-b-4 border-black">
            <Label>Academic Information</Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="level">Level</Label>
              <Select
                id="level"
                value={formData.level || ""}
                onChange={handleChange}
                required
                disabled
              >
                <option value="">Select Level</option>
                <option value="Pre-Primary">Pre-Primary</option>
                <option value="Lower School">Lower School</option>
                <option value="Middle School">Middle School</option>
                <option value="Junior High School">Junior High School</option>
                <option value="Senior High School">Senior High School</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="grade">Grade</Label>
              <Select
                id="grade"
                value={formData.grade || ""}
                onChange={handleChange}
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
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="sponsored"
                checked={formData.sponsored || false}
                onChange={(e) =>
                  setFormData({ ...formData, sponsored: e.target.checked })
                }
              />
              <Label htmlFor="sponscer">Sponsored Student?</Label>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Residence Type:</Label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Radio
                    id="dayBoarding-day"
                    name="dayBoarding"
                    value="Day"
                    checked={formData.dayBoarding === "Day"}
                    onChange={() =>
                      setFormData({ ...formData, dayBoarding: "Day" })
                    }
                  />
                  <Label htmlFor="dayBoarding-day">Day</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="dayBoarding-boarding"
                    name="dayBoarding"
                    value="Boarding"
                    checked={formData.dayBoarding === "Boarding"}
                    onChange={() =>
                      setFormData({ ...formData, dayBoarding: "Boarding" })
                    }
                  />
                  <Label htmlFor="dayBoarding-boarding">Boarding</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              color="gray"
              onClick={() => navigate(`/student/${studentId}`)}
            >
              Cancel
            </Button>
            <Button
              gradientDuoTone="cyanToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Updating...</span>
                </>
              ) : (
                "Update Student"
              )}
            </Button>
          </div>

          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
