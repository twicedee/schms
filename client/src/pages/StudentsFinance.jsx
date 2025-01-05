import React from "react";
import { Table } from "flowbite-react";

export default function StudentsFinance() {


  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
          Students
        </h1>
      </div>
      <div>
        <div className=" flex-col">
          <Table
            ordered
            className=" m-5 p-5 max-w-auto divide-y divide-gray-200 dark:divide-gray-700"
          >
            <Table.Head>
              <Table.HeadCell>Adm. No</Table.HeadCell>
              <Table.HeadCell>Student Photo</Table.HeadCell>

              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Gender</Table.HeadCell>
              <Table.HeadCell>Grade</Table.HeadCell>
              <Table.HeadCell>Balance</Table.HeadCell>

              <Table.HeadCell>
                <span className="sr-only">View</span>
              </Table.HeadCell>
            </Table.Head>
            {students.map((student) => (
              <Table.Body className="divide-y" key={student._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{student.admNumber}</Table.Cell>

                  <Table.Cell>
                    <img
                      src={student.studentPhoto}
                      alt={student.firstName}
                      className="w-10 h-10 object-cover bg-gray-500 "
                    />
                  </Table.Cell>
                  <Table.Cell className=" text-md font-medium text-gray-900 dark:text-white">
                    <p className="text-md font-medium text-gray-900 dark:text-white">
                      {student.firstName} {student.middleName}{" "}
                      {student.lastName}
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    {student.gender === "Male" ? "M" : "F"}
                  </Table.Cell>

                  <Table.Cell>
                    <p className="text-md text-gray-500 dark:text-gray-400">
                      {student.grade}
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="text-md text-gray-500 dark:text-gray-400">
                      {student.feeBalance}
                    </p>
                  </Table.Cell>

                  <Table.Cell>
                    <Link
                      to={`/student-finance/${student.admNumber}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
