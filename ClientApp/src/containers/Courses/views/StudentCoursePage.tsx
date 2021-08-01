import React from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { DEPARTMENTS } from "../../../assets/constants/constant";
import useTeacherStudent from "../../Commons/hooks/useTeacherStudent";
import useGrades from "../../Grades/hooks/useGrades";
import AttachmentFile from "../components/AttachmentFile";
import GradesGraphContainer from "../components/GradesGraphContainer";
import { StudentCoursePageSC } from "./StudentCoursePageSC";

interface Params {
  courseId: string;
}

const StudentCoursePage = () => {
  const { courses, gradesCount, courseId } = useGrades();

  const _selectedCourse = courses.find(
    (course: any) => course.id === parseInt(courseId)
  );

  const selectedDepartmentName = DEPARTMENTS.find(
    (department) => department.id === _selectedCourse?.department
  );

  const courseBooks = _selectedCourse?.courseDetail?.attachments.filter(
    (file) => file.uploadedFileType === 1
  );

  const slides = _selectedCourse?.courseDetail?.attachments.filter(
    (file) => file.uploadedFileType === 2
  );

  const downloadFileHandler = (key: string) => {
    const url = `/api/file/download?key=${key}`;
    window.open(url, "_blank");
  };

  return (
    <StudentCoursePageSC>
      <Row className="course-name">
        <h2>{_selectedCourse?.name}</h2>
      </Row>

      <Row className="course">
        <Col className="course-department">
          <h5>Department</h5>

          <h6>
            {`${selectedDepartmentName?.name} (${selectedDepartmentName?.fullname})`}
          </h6>
        </Col>

        <Col className="course-semester">
          <h5>Semester</h5>

          <h6>{_selectedCourse?.semester}</h6>
        </Col>

        <Col className="course-degree">
          <h5>Degree</h5>

          <h6>Bachelor {_selectedCourse?.numYear}</h6>
        </Col>
      </Row>

      <Row className="course-description">
        <div className="block-description">
          <p>{_selectedCourse?.courseDetail?.description}</p>
        </div>
      </Row>

      <Row className="course-attachments">
        <h5>Attachments</h5>

        <Col className="coursebooks-container">
          <h6>Course Books</h6>

          <div className="coursebooks">
            {courseBooks?.map((attached) => (
              <AttachmentFile
                downloadFile={() => downloadFileHandler(attached.key)}
                fileType={attached.name.substr(attached.name.indexOf(".") + 1)}
                label={attached.name}
              />
            ))}
          </div>
        </Col>

        <Col className="slides-container">
          <h6>Slides</h6>

          <div className="slides">
            {slides?.map((attached) => (
              <AttachmentFile
                downloadFile={() => downloadFileHandler(attached.key)}
                fileType={attached.name.substr(attached.name.indexOf(".") + 1)}
                label={attached.name}
              />
            ))}
          </div>
        </Col>
      </Row>

      <Row className="course-graphs">
        <GradesGraphContainer data={gradesCount} />
      </Row>
    </StudentCoursePageSC>
  );
};

export default StudentCoursePage;
