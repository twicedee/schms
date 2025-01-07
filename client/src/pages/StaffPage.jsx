// import React from "react";
// import { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';

// export default function TeacherPage() {
//   const { studentId } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [student, setStudent] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           `/api/student/get-students?studentId=${studentId}`
//         );
//         const data = await res.json();
//         console.log(data);
//         if (!res.ok) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         if (res.ok) {
//           setStudent(data.students[0]);
//           setLoading(false);
//           setError(false);
//         }
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchStudent();
//   }, [studentId]);

//   if (loading) {
//     return (<div className='flex justify-center items-center min-h-screen'>
//     <Spinner size='xl' />
//   </div>)
    
//   }

//   return <div>TeacherPage</div>;
// }
