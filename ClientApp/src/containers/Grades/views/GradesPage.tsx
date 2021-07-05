import React, { useState, Fragment } from "react"
import { useHistory } from "react-router-dom"
import { Row, Col, Table, Container, Input, Button } from "reactstrap"
import CourseSelector from "../../../components/Selectors/CourseSelector"
import useSchoolYear from "../../SchoolYear/hooks/useSchoolYear"
import useGrades from "../hooks/useGrades"
import grades from "../styles/grades.module.scss"

const GradesPage = () => {
  const { schoolYears } = useSchoolYear()

  const [selectedCourse, setSelectedCourse] = useState()

  const { courses } = useGrades()

  const [courseYear, setCourseYear] = useState<string>("")

  const history = useHistory()

  return (
    <Fragment>
      <Container>
        <Row className={`${grades["grades__title"]}`}>
          <p>Grades</p>
        </Row>
        <Row>
          <Col xs={6}>
            <Row>
              <Col xs={6}>
                <Table hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Year</th>
                      <th>Number of courses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schoolYears.map((year: any, index: number) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() => setCourseYear(year?.year)}
                          >
                            {year?.year}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {year?.numberOfCourses}
                          </td>
                        </tr>
                      )
                    })}
                    <tr>
                      <th scope="row">###</th>
                      <td onClick={() => setCourseYear("all")}>All</td>
                      <td style={{ textAlign: "center" }}>{courses.length}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>

          <Col xs={6}>
            <Row className={`${grades["grades__sub-title"]}`}>
              <p>Courses {!!courseYear && `of ${courseYear}`}</p>
            </Row>
            <Row>
              <Col>
                <CourseSelector
                  year={courseYear}
                  schoolYears={schoolYears}
                  onChange={(e: any) => setSelectedCourse(e.value)}
                  defaultValue={selectedCourse}
                  courses={courses}
                />
              </Col>
            </Row>

            {selectedCourse && (
              <Row>
                <Col>
                  <Button
                    onClick={() =>
                      history.push(
                        `/admin/grades/importgrades/${selectedCourse}`
                      )
                    }
                  >
                    Import Grades
                  </Button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default GradesPage
