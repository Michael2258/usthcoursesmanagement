import UserControlPage from "../containers/User/views/UserControlPage";
import Home from "../containers/Home/views/Home";
import CourseList from "../containers/Courses/views/CourseList";
import CourseDetail from "../containers/Courses/components/CourseDetail";
import GradesPage from "../containers/Grades/views/GradesPage";
import SchoolYearPage from "../containers/SchoolYear/views/SchoolYearPage";
import ImportGradesPage from "../containers/Grades/views/ImportGradesPage";
import GradesPageForStudent from "../containers/Grades/views/Students/GradesPageForStudent";

export const adminRoutes = [
  {
    path: "/",
    component: Home,
    exact: true,
    roles: ["Admin", "SuperAdmin"],
  },
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
    path: "/teacherstudent/grades/",
    component: GradesPageForStudent,
    exact: true,
    roles: ["Teacher", "Student"],
  },
];
