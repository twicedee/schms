// import React from "react";
// import { useState } from "react";
// import { TextInput, ListGroup, ListGroupItem, Button } from "flowbite-react";
// import { useNavigate } from "react-router-dom";





// export default function AddStaff() {
//   const [formData, setFormData] = useState({});
//   const [error, setError] = useState(null);
//   const navigate = useNavigate()

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
//   };

//   // Submit form data
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.email ||
//       !formData.phone ||
//       !formData.department
//     ) {
//       setError("Please fill in all required fields.");
//       return;
//     }


//     try {
//       const res = await fetch("/api/staff/add-staff", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) {
//         const { message } = await res.json();
//         throw new Error(message);
//       }

//       const data = await res.json();
//       navigate(`staff/${data._id}`)

//       // Reset form after successful submission
//       setFormData({
//         firstName: "",
//         lastName: "",
//         phone: "",
//         department: "",
//         subjects:""
//       });
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="m-30 justify-items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-3xl m-auto p-6 bg-white shadow-md rounded-md space-y-4"
//       >
//         <h1 className="text-2xl font-bold text-center mb-4">
//           Add Staff
//         </h1>

//         {error && <p className="text-red-600 text-center">{error}</p>}

//         {/* Student Personal Information */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <TextInput
//             type="text"
//             label="First Name"
//             onChange={handleChange}
//             required
//           />

//           <TextInput
//             type="text"
//             label="Last Name"
//             onChange={handleChange}
//             className="input"
//             required
//           />
//         </div>

//         <TextInput
//           type="email"
//           name="email"
//           label="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <TextInput
//           type="tel"
//           id="phone"

//           place="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           className="input"
//           required
//         />

          
//         <Dropdown onChange={handleChange} id = "department"label="Department" dismissOnClick={false}>

//       <Dropdown.Item>Dashboard</Dropdown.Item>
//       <Dropdown.Item>Settings</Dropdown.Item>
//       <Dropdown.Item>Earnings</Dropdown.Item>
//       <Dropdown.Item>Sign out</Dropdown.Item>
//     </Dropdown>

//         <Button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//         >
//           Add Staff
//         </Button>
//       </form>
//     </div>
//   );
// }
