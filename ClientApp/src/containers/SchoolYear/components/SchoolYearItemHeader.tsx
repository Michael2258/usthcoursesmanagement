import React from "react"
import { Col, Row } from "reactstrap"
import schoolyear from "../styles/schoolyear.module.scss"

const SchoolYearItemHeader = () => {
  return (
    <div className={`${schoolyear["schoolyear__header-item-wrapper"]}`}>
      <Row className={`${schoolyear["schoolyear__header"]}`}>
        <Col className={`${schoolyear["schoolyear__header-item-id"]}`} xs={2}>
          <p>#</p>
        </Col>

        <Col
          className={`${schoolyear["schoolyear__header-item-year-wrapper"]}`}
          xs={4}
        >
          <p>Year</p>
        </Col>

        <Col
          className={`${schoolyear["schoolyear__header-item-course-num-wrapper"]}`}
          xs={4}
        >
          <p>Number of courses</p>
        </Col>

        <Col
          className={`${schoolyear["schoolyear__header-item-action"]}`}
          xs={2}
        >
          <p>Action</p>
        </Col>
      </Row>

      <Row className={`${schoolyear["schoolyear__header"]}`}>
        <Col className={`${schoolyear["schoolyear__header-item-id"]}`} xs={2}>
          <p>#</p>
        </Col>

        <Col
          className={`${schoolyear["schoolyear__header-item-year-wrapper"]}`}
          xs={4}
        >
          <p>Year</p>
        </Col>

        <Col
          className={`${schoolyear["schoolyear__header-item-course-num-wrapper"]}`}
          xs={4}
        >
          <p>Number of courses</p>
        </Col>

        <Col
          className={`${schoolyear["schoolyear__header-item-action"]}`}
          xs={2}
        >
          <p>Action</p>
        </Col>
      </Row>

      <Row className={`${schoolyear["schoolyear__header"]}`}>
        <Col className={`${schoolyear["schoolyear__header-item-id"]}`} xs={2}>
          <p>#</p>
        </Col>

        <Col
          className={`${schoolyear["schoolyear__header-item-year-wrapper"]}`}
          xs={4}
        >
          <p>Year</p>
        </Col>

        <Col
          className={`${schoolyear["schoolyear__header-item-course-num-wrapper"]}`}
          xs={4}
        >
          <p>Number of courses</p>
        </Col>

        <Col
          className={`${schoolyear["schoolyear__header-item-action"]}`}
          xs={2}
        >
          <p>Action</p>
        </Col>
      </Row>
    </div>
  )
}

export default SchoolYearItemHeader
