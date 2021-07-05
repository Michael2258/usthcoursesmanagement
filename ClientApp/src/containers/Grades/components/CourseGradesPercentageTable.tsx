import React from "react";
import { Table } from "reactstrap";

const CourseGradesPercentageTable = ({ courseGrades }: any) => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Midterm Test Failed</th>
          <th>Final Test Failed</th>
          <th>Final Result Failed (Retake)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{`${courseGrades?.midtermTestFailed}%`}</td>
          <td>{`${courseGrades?.finalTestFailed}%`}</td>
          <td>{`${courseGrades?.finalResultFailed}%`}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CourseGradesPercentageTable;
