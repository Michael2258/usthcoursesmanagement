import React, { useState } from "react"
import { Row, Col, Table, Container, Input } from "reactstrap"
import AddButton from "../../../components/Buttons/AddButton"
import DeleteButtonIcon from "../../../components/Buttons/DeleteButtonIcon"
import CommonSelector from "../../../components/Selectors/CommonSelector"
import useGrades from "../hooks/useGrades"

const GradesPage = () => {
  const { schoolYears } = useGrades()

  const [courseYear, setCourseYear] = useState<string>("")

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <Row>
            <Col xs="8" sm="2">
              <p>School Year</p>
            </Col>
          </Row>
          <Row>
            <Col xs="8" sm="2">
              <AddButton className={""} text="New School Year" />
            </Col>
          </Row>

          <Row>
            <Col xs="8" sm="2">
              <Table hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Year</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {schoolYears.map((year: any) => {
                    return (
                      <tr>
                        <th scope="row">{year?.id}</th>
                        <td onClick={() => setCourseYear(year?.year)}>
                          {year?.year}
                        </td>
                        <td>
                          <DeleteButtonIcon onClick={() => {}} />
                        </td>
                      </tr>
                    )
                  })}
                  <tr>
                    <th scope="row">###</th>
                    <td onClick={() => setCourseYear("")}>Default</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>

        <Col xs={6}>
          <Row>
            <Col>
              <p>Courses {!!courseYear && `of ${courseYear}`}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <CommonSelector />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default GradesPage
