import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DEPARTMENTS } from "../../../assets/constants/constant";
import CourseSelector from "../../../components/Selectors/CourseSelector";
import SchoolYearSelector from "../../../components/Selectors/SchoolYearSelector";
import StudentYearSelector from "../../../components/Selectors/StudentYearSelector";
import useTeacherStudent from "../../Commons/hooks/useTeacherStudent";
import useGrades from "../../Grades/hooks/useGrades";
import homepage from "../../Home/styles/homepage.module.scss";
import useSchoolYear from "../hooks/useSchoolYear";

const studentYears = [
  {
    label: "First year",
    value: 1,
  },
  {
    label: "Second year",
    value: 2,
  },
  {
    label: "Third year",
    value: 3,
  },
];

const SchoolYearTeacherStudentPage = () => {
  const url = window.location.href;

  const shortName = url.split("/")[4];

  const selectedDepartment = DEPARTMENTS.find(
    (department) =>
      department.name.trim().toUpperCase() === shortName.trim().toUpperCase()
  );

  const { schoolYears } = useSchoolYear();

  const { courses } = useGrades();

  const role = useSelector((state: any) => state.commons?.user?.roles);

  const isStudent = role.includes("Student");

  const [selectedStudentYear, setSelectedStudentYear] = useState(0);
  const [selectedSchoolYear, setSelectedSchoolYear] = useState<number>(0);

  const { selectedCourse, setSelectedCourse } = useTeacherStudent();

  const _schoolYear = schoolYears.find(
    (item: any) => item.id === selectedSchoolYear
  );

  const history = useHistory();

  return (
    <div className={`${homepage["schoolyear-teacherstudent-container"]}`}>
      <div
        style={{
          backgroundImage: `url(${require("../../../assets/images/background3.jpg")})`,
        }}
        className={`${homepage["schoolyear-teacherstudent-background"]}`}
      >
        <div className={`${homepage["schoolyear-teacherstudent-header"]}`}>
          <h1>
            You are in {selectedDepartment?.name} (
            {selectedDepartment?.fullname}) department
          </h1>
        </div>

        <div className={`${homepage["schoolyear-teacherstudent-body"]}`}>
          <div className={`${homepage["schoolyear-teacherstudent-year"]}`}>
            <h4>Select school year</h4>

            <SchoolYearSelector
              schoolYears={schoolYears}
              onChange={(e: any) => setSelectedSchoolYear(e.value)}
              defaultValue={selectedSchoolYear}
            />
          </div>

          <div className={`${homepage["schoolyear-teacherstudent-numyear"]}`}>
            <h4>{`${
              isStudent
                ? "Are you a first-year, second-year or third-year student?"
                : "First year, second year or third year?"
            }`}</h4>

            <StudentYearSelector
              studentYears={studentYears}
              onChange={(e: any) => setSelectedStudentYear(e.value)}
              defaultValue={selectedStudentYear}
            />
          </div>

          <div className={`${homepage["schoolyear-teacherstudent-course"]}`}>
            <h4>Finally, select the course</h4>

            <CourseSelector
              year={selectedSchoolYear}
              onChange={(e: any) => setSelectedCourse(e.value)}
              defaultValue={selectedCourse}
              selectedStudentYear={selectedStudentYear}
              courses={courses}
              schoolYears={schoolYears}
            />
          </div>

          {!!selectedCourse &&
          !!_schoolYear &&
          _schoolYear.numberOfCourses > 0 ? (
            <button
              onClick={() =>
                !isStudent
                  ? history.push(
                      `/teacherstudent/${shortName}/course/${selectedCourse}`
                    )
                  : history.push(
                      `/teacherstudent/${shortName}/coursedetail/${selectedCourse}`
                    )
              }
              className={`${homepage["schoolyear-teacherstudent-detail-btn"]}`}
            >
              Go to course detail
              {console.log(selectedCourse?.id)}
            </button>
          ) : (
            <button
              disabled
              className={`${homepage["schoolyear-teacherstudent-disabled-btn"]}`}
            >
              Select course first!!!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolYearTeacherStudentPage;
