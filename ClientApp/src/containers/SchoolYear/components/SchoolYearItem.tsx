import React, { Fragment } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Input, Row, Col } from "reactstrap"
import DeleteButtonIcon from "../../../components/Buttons/DeleteButtonIcon"
import schoolyear from "../styles/schoolyear.module.scss"
import DeleteSchoolYearModal from "./DeleteSchoolYearModal"

const SchoolYearItem = ({ item, index, onDelete, isTemp }: any) => {
  const [yearValue, setYearValue] = useState<string>(item?.year)

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)

  const toggleDeleteModal = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal)
  }

  useEffect(() => {
    if (isTemp) {
      item.year = yearValue
    }
  }, [yearValue, isTemp])

  return (
    <Fragment>
      <div className="d-flex">
        <Col xs={2} className={`${schoolyear["schoolyear__item-id"]}`}>
          <p>{isTemp ? item.id : index + 1}</p>
        </Col>

        <Col
          xs={4}
          className={`${schoolyear["schoolyear__item-year-wrapper"]}`}
        >
          <Input
            type="text"
            value={yearValue}
            placeholder="Enter year..."
            onChange={({ target: { value } }) => setYearValue(value)}
            className={`${schoolyear["schoolyear__item-year"]}`}
            disabled={!isTemp}
          />
        </Col>

        <Col
          xs={4}
          className={`${schoolyear["schoolyear__item-course-num-wrapper"]}`}
        >
          <Input
            type="number"
            disabled
            value={item?.numberOfCourses}
            className={`${schoolyear["schoolyear__item-course-num"]}`}
          />
        </Col>

        <Col xs={4} className={`${schoolyear["schoolyear__item-action"]}`}>
          <DeleteButtonIcon
            onClick={() => {
              isTemp ? onDelete(item?.id) : toggleDeleteModal()
            }}
          />
        </Col>
      </div>

      <DeleteSchoolYearModal
        onCancel={toggleDeleteModal}
        onDelete={onDelete}
        isOpenDeleteModal={isOpenDeleteModal}
      />
    </Fragment>
  )
}

export default SchoolYearItem
