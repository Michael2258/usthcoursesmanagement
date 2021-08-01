import React from "react";
import CommonSelector from "./CommonSelector";

const CourseSelector = (props: any) => {
  const {
    year,
    onChange,
    defaultValue,
    selectedStudentYear,
    courses,
    schoolYears,
  } = props;

  const selectedSchoolYear = schoolYears?.find((item: any) => item.id === year);

  const filterCourse = courses?.filter(
    (item: any) => item.schoolYear === selectedSchoolYear?.year
  );

  const filteredCourses = filterCourse?.filter(
    (item: any) => item.numYear === selectedStudentYear
  );

  const options = filteredCourses?.map((course: any) => ({
    label: course?.name,
    value: course?.id,
  }));

  return (
    <CommonSelector
      defaultValue={defaultValue}
      options={options}
      onChange={onChange}
    />
  );
};

export default CourseSelector;
