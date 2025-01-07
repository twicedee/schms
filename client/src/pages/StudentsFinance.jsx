import React from "react";
import { Avatar, Spinner, Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function StudentsFinance() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [students, setStudents] = useState([]);
  const terms = ["Term 1", "Term 2", "Term 3"];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/student/get-students`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setStudents(data.students);
        setLoading(false);
        setError(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
          Students
        </h1>
      </div>
      <div>
        <div className=" flex-col">
          <Table>
            <Table.Head>
            <Table.HeadCell>AdmNo</Table.HeadCell>

              <Table.HeadCell>Student Name</Table.HeadCell>
              <Table.HeadCell>Level</Table.HeadCell>
              <Table.HeadCell>Term 1</Table.HeadCell>
              <Table.HeadCell>Term 2</Table.HeadCell>
              <Table.HeadCell>Term 3</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {students.map((student) => (
                <Table.Row key={student._id}>
                  <Table.Cell>{student.admNumber}</Table.Cell>
                  <Table.Cell>
                    {`${student.firstName} ${student.middleName} ${student.lastName}`}
                  </Table.Cell>
                  <Table.Cell>{student.level}</Table.Cell>
                  {terms.map((term) => (
                    <Table.Cell key={term}>
                      {student.feeBalance?.[term] !== undefined
                        ? student.feeBalance[term]
                        : "-"}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
