import React from "react";
import { useState, useEffect } from "react";
import {
  TextInput,
  Alert,
  Button,
  Spinner,
  Select,
  Label,
  Modal,
} from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateStudent() {
  const [openModal, setOpenModal] = useState(false);
  const { studentId } = useParams();
  const [student, setStudent] = useState('');
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/student/get-students?admNumber=${studentId}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Failed to fetch student");
          setLoading(false);
          return;
        }
        if (res.ok) {
          setStudent(data.students[0]);
          setFormData(data.students[0]);
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
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.enrollmentDate || !formData.firstName || 
        !formData.lastName || !formData.DOB || 
        !formData.gender || !formData.grade || !formData.level) {
      return setError("Please fill in all required details");
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
      
      // Success - navigate away or show success message
      navigate(`/student/${studentId}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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

          {/* Student Personal Information */}
          <div className="mt-2 border-b-4 border-black">
            <Label>Personal Information</Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="enrollmentDate">Enrollment Date</Label>
              <TextInput
                type="date"
                id="enrollmentDate"
                value={formData.enrollmentDate ? formData.enrollmentDate.split('T')[0] : ''}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <TextInput
                type="text"
                id="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <TextInput
                type="text"
                id="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="middleName">Middle Name</Label>
              <TextInput
                type="text"
                id="middleName"
                value={formData.middleName || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="DOB">Date of Birth</Label>
              <TextInput 
                type="date" 
                id="DOB" 
                value={formData.DOB ? formData.DOB.split('T')[0] : ''} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                id="gender"
                onChange={handleChange}
                value={formData.gender || ''}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </div>
          </div>

          <div className="mt-2 border-b-4 border-black">
            <Label>Contact Information</Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="parent">Parent/Guardian Name</Label>
              <TextInput
                type="text"
                id="parent"
                value={formData.parent || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="contact">Contact Number</Label>
              <TextInput
                type="tel"
                id="contact"
                value={formData.contact || ''}
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
                value={formData.level || ''}
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
                value={formData.grade || ''}
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
          </div>

          <Button
            gradientDuoTone="cyanToBlue"
            type="submit"
            disabled={loading}
            className="w-full mt-6"
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