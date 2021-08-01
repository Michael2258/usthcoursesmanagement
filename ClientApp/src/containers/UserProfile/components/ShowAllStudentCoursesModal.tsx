import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import userprofile from "../styles/userprofile.module.scss";

const ShowAllStudentCoursesModal = ({ toggle, isOpen }: any) => {
  const mockCoursesList = [
    { name: "123", semester: 1 },
    { name: "456", semester: 2 },
    { name: "789", semester: 1 },
  ];

  const history = useHistory();

  const handleNavigateToCourseDetail = () => {
    history.push("/student/course");
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <p>All joined courses</p>
      </ModalHeader>

      <ModalBody>
        <div className={`${userprofile["course-item-container"]}`}>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Semester</th>
              </tr>
            </thead>

            <tbody>
              {mockCoursesList.map((course, index) => (
                <Fragment key={index}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={handleNavigateToCourseDetail}
                    >
                      {course.name}
                    </td>
                    <td>{course.semester}</td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ShowAllStudentCoursesModal;
