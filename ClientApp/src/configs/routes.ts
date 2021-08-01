import UserControlPage from "../containers/User/views/UserControlPage";
import Home from "../containers/Home/views/Home";
import CourseList from "../containers/Courses/views/CourseList";
import CourseDetail from "../containers/Courses/components/CourseDetail";
import GradesPage from "../containers/Grades/views/GradesPage";
import SchoolYearPage from "../containers/SchoolYear/views/SchoolYearPage";
import ImportGradesPage from "../containers/Grades/views/ImportGradesPage";
import GradesPageForStudent from "../containers/Grades/views/Students/GradesPageForStudent";
import UserProfilePage from "../containers/UserProfile/views/UserProfilePage";
import HomePageTeacherStudent from "../containers/Home/views/HomePageTeacherStudent";
import SchoolYearTeacherStudentPage from "../containers/SchoolYear/views/SchoolYearTeacherStudentPage";
import StudentCoursePage from "../containers/Courses/views/StudentCoursePage";

export const adminRoutes = [
  {
    path: "/user",
    component: UserControlPage,
    exact: true,
    roles: ["Admin", "SuperAdmin"],
  },
  {
    path: "/course",
    component: CourseList,
    exact: true,
    roles: ["Admin", "SuperAdmin"],
  },
  {
    path: "/course/:id",
    component: CourseDetail,
    exact: true,
    roles: ["Admin", "SuperAdmin"],
  },
  {
    path: "/createcourse",
    component: CourseDetail,
    exact: true,
    roles: ["Admin", "SuperAdmin"],
  },
  {
    path: "/grades",
    component: GradesPage,
    exact: true,
    roles: ["Admin", "SuperAdmin"],
  },
  {
    path: "/schoolyear",
    component: SchoolYearPage,
    exact: true,
    roles: ["Admin", "SuperAdmin"],
  },
  {
    path: "/grades/importgrades/:courseId",
    component: ImportGradesPage,
    exact: true,
    roles: ["Admin", "SuperAdmin"],
  },
];

export const teacherStudentRoutes = [
  {
    path: "/teacherstudent/home",
    component: HomePageTeacherStudent,
    exact: true,
    roles: ["Teacher", "Student"],
  },
  {
    path: "/teacherstudent/:p/schoolyear",
    component: SchoolYearTeacherStudentPage,
    exact: true,
    roles: ["Teacher", "Student"],
  },
  {
    path: "/teacherstudent/:p/course/:id",
    component: CourseDetail,
    exact: true,
    roles: ["Teacher"],
  },
  {
    path: "/teacherstudent/:p/coursedetail/:courseId",
    component: StudentCoursePage,
    exact: true,
    roles: ["Student"],
  },
  {
    path: "/teacher/user-profile/",
    component: UserProfilePage,
    exact: true,
    roles: ["Teacher"],
  },
  {
    path: "/student/user-profile/",
    component: UserProfilePage,
    exact: true,
    roles: ["Student"],
  },
];
