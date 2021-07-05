import React from "react"
import CommonSelector from "./CommonSelector"

const CourseSelector = (props: any) => {
  const { year, schoolYears, onChange, defaultValue, courses } = props

  const selectedYear = schoolYears.find(
    (schoolYear: any) => schoolYear?.year === year
  )

  const options =
    year == "all"
      ? courses.map((course: any) => ({
          label: course?.name,
          value: course?.id,
        }))
      : selectedYear?.courses.map((course: any) => ({
          label: course?.name,
          value: course?.id,
        }))

  return (
    <CommonSelector
      defaultValue={defaultValue}
      options={options}
      onChange={onChange}
    />
  )
}

export default CourseSelector
