import React from "react";


// firstName: "",
//     lastName: "",
//     dateOfBirth: "",
//     gender: "",
//     email: "",
//     phone: "",
//     department: "",


export default function AddStaff() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.email ||
      !formData.phone ||
      !formData.department
    ) {
      setError("Please fill in all required fields.");
      return;
    }


    try {
      const response = await fetch("/api/students/admit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      const data = await response.json();
      alert("Student admitted successfully!");
      console.log("Saved Student:", data);

      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phone: "",
        department: "",
      });
    } catch (error) {
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

        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Student Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="input"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="input"
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="input"
          required
        />

        {/* Address Information */}
        <h2 className="text-lg font-semibold mt-4">Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.address.street}
            onChange={handleChange}
            className="input"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.address.city}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.address.state}
            onChange={handleChange}
            className="input"
            required
          />

          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.address.postalCode}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="input"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Admit Student
        </button>
      </form>
    </div>
  );
}
