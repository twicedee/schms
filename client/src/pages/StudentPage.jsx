import React from 'react'

export default function StudentPage() {
  const { studentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [student, setStudents] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/student/get-students?studentId=${studentId}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          //setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.student[0]);
          //setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        //setLoading(false);
      }
    };
    fetchStudent();
  }, [studentId]);

  return (
    <div>
        <div className="p-6">
          {/* Basic Info */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Personal Information
            </h3>
            <div className="mt-2 text-gray-600">
              <p>
                <span className="font-semibold">Name:</span>{student.firstName}{" "} {student.middleName} {" "}
                {student.lastName}
                
              </p>
              <p>
                <span className="font-semibold">Date of Birth:</span>{student.DOB}{" "}
                
              </p>
              <p>
                <span className="font-semibold">Gender:</span> {student.gender}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Contact Information
            </h3>
            <div className="mt-2 text-gray-600">
              <p>
                <span className="font-semibold">Email:</span> 
              </p>
              <p>
                <span className="font-semibold">Phone:</span> 
              </p>
              <p>
                <span className="font-semibold">Address:</span>
              </p>
            </div>
          </div>

          {/* Academic Info */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Academic Information
            </h3>
            <div className="mt-2 text-gray-600">
              <p>
                <span className="font-semibold">Enrollment Date:</span>{" "}
                
              </p>
              <p>
                <span className="font-semibold">Grade:</span>{student.grade}{" "}
                
              </p>
              <p>
                <span className="font-semibold">Level:</span>{student.level}{" "}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-100 p-4 flex justify-end gap-4">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg focus:outline-none">
            Delete
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg focus:outline-none">
            Edit
          </button>
        </div>
    </div>
  )
}
