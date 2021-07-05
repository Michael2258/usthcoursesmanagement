import React, { useState, Fragment } from "react"
import { Row, Col, Container, Input } from "reactstrap"
import AddButton from "../../../components/Buttons/AddButton"
import DeleteButtonIcon from "../../../components/Buttons/DeleteButtonIcon"
import SaveButton from "../../../components/Buttons/SaveButton"
import SchoolYearItem from "../components/SchoolYearItem"
import SchoolYearItemHeader from "../components/SchoolYearItemHeader"
import useSchoolYear from "../hooks/useSchoolYear"
import schoolyear from "../styles/schoolyear.module.scss"

const GradesPage = () => {
  const {
    schoolYears,
    deleteSchoolYearHandler,
    createSchoolYearHandler,
    tempSchoolYears,
    addTempSchoolYearHandler,
    deleteTempSchoolYearHandler,
  } = useSchoolYear()

  return (
    <Fragment>
      <Container>
        <Row className={`${schoolyear["schoolyear__title"]}`}>
          <p>School Year</p>
        </Row>
        <Row className={`${schoolyear["schoolyear__add"]}`}>
          <Col xs="4" className="col-2 d-flex">
            <AddButton
              onClick={addTempSchoolYearHandler}
              className={`${schoolyear["schoolyear__add-btn"]} mr-2`}
              text="New School Year"
            />
            <SaveButton
              onClick={() => {
                tempSchoolYears.length > 0 && createSchoolYearHandler()
              }}
              className={`${schoolyear["schoolyear__add-btn"]}`}
              text="Save"
            />
          </Col>
        </Row>
        <div className={`${schoolyear["schoolyear__item-container"]}`}>
          <SchoolYearItemHeader />

          <div style={{ marginTop: "40px" }}>
            <div className={`${schoolyear["schoolyear__header-item-wrapper"]}`}>
              {!!schoolYears &&
                schoolYears.length > 0 &&
                schoolYears.map((item: any, index: number) => (
                  <Row
                    key={item.id}
                    className={`${schoolyear["schoolyear__header"]}`}
                  >
                    <SchoolYearItem
                      item={item}
                      index={index}
                      onDelete={() => deleteSchoolYearHandler(item.id)}
                      isTemp={false}
                    />
                  </Row>
                ))}

              {!!tempSchoolYears &&
                tempSchoolYears.length > 0 &&
                tempSchoolYears.map((item: any, index: number) => (
                  <Row className={`${schoolyear["schoolyear__header"]}`}>
                    <div key={index}>
                      <SchoolYearItem
                        item={item}
                        index={index}
                        onDelete={deleteTempSchoolYearHandler}
                        isTemp={true}
                      />
                    </div>
                  </Row>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  )
}

export default GradesPage
