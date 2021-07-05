import { filter } from "lodash"
import React from "react"
import { Col, Input, Row, Table, Container } from "reactstrap"
import AddButton from "../../../components/Buttons/AddButton"
import DeleteButtonIcon from "../../../components/Buttons/DeleteButtonIcon"
import LinkEditButton from "../../../components/Buttons/LinkEditButton"
import SearchBox from "../../../components/Inputs/SearchBox"
import CustomPagination from "../../../components/Pagination/CustomPagination"
import useCourseList from "../hooks/useCourseList"
import course from "../styles/course.module.scss"

const CourseList = () => {
  const { removeCourse, goToDetail, courseList, filter, changeFilters } =
    useCourseList()

  const onRemove = (id: number) => {
    removeCourse(id)
  }

  return (
    <Container>
      <Row className={`${course["course-list__title"]}`}>
        <p>Course Management</p>
      </Row>

      <Row className={`${course["course-list__additional"]}`}>
        <Col xs={4}>
          <AddButton
            className={`${course["course-list__add-course-btn"]}`}
            text="Create course"
            onClick={() => goToDetail()}
          />
        </Col>
        <Col xs={4}>
          <SearchBox
            className={`${course["course-list__search-bar"]}`}
            initValue={filter.search}
            onSearch={(string) => changeFilters({ search: string })}
          />
        </Col>
        <Col xs={4} className="d-flex align-items-center justify-content-end">
          <p style={{ margin: "0", fontSize: "1.2rem" }}>
            Total of course:{" "}
            <span style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
              {courseList.length}
            </span>
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          {!!courseList && courseList.length > 0 ? (
            <Table bordered hover striped>
              <thead className="course-list__table-header">
                <tr>
                  <th>Course Name</th>
                  <th>Semester</th>
                  <th>Year</th>
                  <th>Lecturer</th>
                </tr>
              </thead>
              <tbody className="course-list__table-body">
                {courseList.map((course: any) => (
                  <tr key={course.id}>
                    <td className="align-middle">
                      <LinkEditButton
                        label={course.name}
                        onClick={() => goToDetail(course.id)}
                      />
                    </td>
                    <td className="align-middle">{course.semester}</td>
                    <td className="align-middle">{course.schoolYear}</td>
                    <td className="align-middle">{`${course.teacherId}`}</td>
                    <td className="text-center align-middle">
                      <DeleteButtonIcon onClick={() => onRemove(course.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Row className="mt-2">
        <Col md={12}>
          <CustomPagination
            page={filter.page}
            limit={filter.limit}
            totalItems={courseList.length}
            changePage={(page: number) => changeFilters({ page })}
            changeLimit={(limit: number) => changeFilters({ limit })}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default CourseList
