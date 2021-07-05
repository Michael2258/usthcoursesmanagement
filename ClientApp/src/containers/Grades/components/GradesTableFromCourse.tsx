import React from "react"
import { Table } from "reactstrap"

const GradesTableFromCourse = ({ studentGrades }: any) => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Attendance</th>
          <th>Midterm Test</th>
          <th>Final Test</th>
          <th>Final Result</th>
        </tr>
      </thead>
      <tbody>
        {studentGrades.map((grade: any, index: number) => (
          <tr key={index}>
            <th scope="row">{grade.studentId}</th>
            <td>{grade.firstName}</td>
            <td>{grade.lastName}</td>
            <td>{grade.attendance}</td>
            <td>{grade.midtermTest}</td>
            <td>{grade.finalTest}</td>
            <td>{grade.finalResult}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default GradesTableFromCourse
