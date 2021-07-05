import React from "react";
import { Input, Container, Row, Button } from "reactstrap";
import CourseGradesPercentageTable from "../components/CourseGradesPercentageTable";
import GradesTableFromCourse from "../components/GradesTableFromCourse";
import useGrades from "../hooks/useGrades";
import useGradesCourse from "../hooks/useGradesCourse";
import grades from "../styles/grades.module.scss";

const ImportGradesPage = () => {
  const {
    UploadGradesCSVFileHandler,
    UpdateGradesCSVFileHandler,
    studentGrades,
    selectedCourse,
  } = useGrades();

  const { courseGrades } = useGradesCourse();

  return (
    <Container>
      <Row>
        <p>
          {selectedCourse?.name} ({selectedCourse?.schoolYear})
        </p>
      </Row>

      <Row>
        <div className={`${grades["grades__import-container"]}`}>
          <Input
            onChange={(e: any) => UploadGradesCSVFileHandler(e.target.files[0])}
            type="file"
            className={`${grades["grades__import-csv"]}`}
          />

          <Input
            type="file"
            className={`${grades["grades__update-csv"]}`}
            onChange={(e: any) => UpdateGradesCSVFileHandler(e.target.files[0])}
          />
        </div>
      </Row>

      <Row style={{ marginTop: "20px" }}>
        <GradesTableFromCourse studentGrades={studentGrades} />
      </Row>

      <Row style={{ marginTop: "20px" }}>
        <CourseGradesPercentageTable courseGrades={courseGrades} />
      </Row>
    </Container>
  );
};

export default ImportGradesPage;
