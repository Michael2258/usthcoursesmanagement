import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "reactstrap";
import GenderSelector from "../../User/components/GenderSelector";
import ShowAllStudentCoursesModal from "../components/ShowAllStudentCoursesModal";
import userprofile from "../styles/userprofile.module.scss";

const UserProfilePage = () => {
  const [isCoursesModalOpen, setIsCourseModalOpen] = useState(false);

  const toggleCoursesModal = () => setIsCourseModalOpen(!isCoursesModalOpen);

  const roles = useSelector((state: any) => state?.commons?.user?.roles);

  const isTeacher = roles.includes("Teacher");

  return (
    <div className={`${userprofile["user-profile-wrapper"]}`}>
      <div className={`${userprofile["user-profile-card"]}`}>
        <div className={`${userprofile["user-profile-card-header-tag"]}`}>
          <p>You</p>
        </div>

        <div className={`${userprofile["user-profile-header-container"]}`}>
          <div className={`${userprofile["user-profile-avatar"]}`}></div>

          <div className={`${userprofile["user-profile-basic-info-wrapper"]}`}>
            <div className={`${userprofile["user-profile-basic-info"]}`}>
              <div className={`${userprofile["user-profile-fullname"]}`}>
                <p>
                  Name:{" "}
                  <span style={{ fontWeight: "bold" }}>Nguyen Cong Thanh</span>
                </p>
              </div>

              <div className={`${userprofile["user-profile-id"]}`}>
                {isTeacher ? (
                  <p>
                    Department: <span style={{ fontWeight: "bold" }}>ICT</span>{" "}
                  </p>
                ) : (
                  <p>
                    Student ID:{" "}
                    <span style={{ fontWeight: "bold" }}>BI9-210</span>{" "}
                  </p>
                )}
              </div>

              <div className={`${userprofile["user-profile-email"]}`}>
                <p>
                  Email:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    newstudent123@gmail.com
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {!isTeacher && (
          <div className={`${userprofile["user-profile-statistic"]}`}>
            <div className={`${userprofile["user-profile-department"]}`}>
              <p>Department</p>
              <p>ICT</p>
            </div>

            <div className={`${userprofile["user-profile-year"]}`}>
              <p>Year</p>
              <p>B1</p>
            </div>

            <div className={`${userprofile["user-profile-num-course-joined"]}`}>
              <p>{isTeacher ? "Courses" : "Joined Courses"}</p>
              <p onClick={toggleCoursesModal}>16</p>
            </div>
          </div>
        )}

        <div className={`${userprofile["user-profile-more-info"]}`}>
          <p className={`${userprofile["user-profile-title"]}`}>
            Date of Birth
          </p>
          <div className={`${userprofile["user-profile-dob"]}`}>
            <Input type="date" />
          </div>

          <div className={`${userprofile["user-profile-basic-gender"]}`}>
            <p className={`${userprofile["user-profile-title"]}`}>Gender</p>
            <GenderSelector value={0} disabled={true} />
          </div>

          <div className={`${userprofile["user-profile-role"]}`}>
            <p className={`${userprofile["user-profile-title"]}`}>Role</p>
            <Input
              disabled
              type="text"
              value={isTeacher ? "Teacher" : "Student"}
            />
          </div>
        </div>

        {isCoursesModalOpen && (
          <div>
            <ShowAllStudentCoursesModal
              toggle={toggleCoursesModal}
              isOpen={isCoursesModalOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
