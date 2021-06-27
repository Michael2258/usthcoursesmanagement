import UserControlPage from "../containers/User/views/UserControlPage"
import Home from "../containers/Home/views/Home"
import CourseList from "../containers/Courses/views/CourseList"
import CourseDetail from "../containers/Courses/components/CourseDetail"
import ImportCSV from "../containers/ImportCSV/views/ImportCSV"

export const adminRoutes = [
  {
    path: "/",
    component: Home,
    exact: true,
    roles: ["Admin"],
  },
  {
    path: "/user",
    component: UserControlPage,
    exact: true,
    roles: ["Admin"],
  },
  {
    path: "/course",
    component: CourseList,
    exact: true,
    roles: ["Admin"],
  },
  {
    path: "/course/:id",
    component: CourseDetail,
    exact: true,
    roles: ["Admin"],
  },
  {
    path: "/createcourse",
    component: CourseDetail,
    exact: true,
    roles: ["Admin"],
  },
  {
    path: "/createschoolyear",
    component: null,
    exact: true,
    roles: ["Admin"],
  },
  {
    path: "/schoolyear/:id",
    component: null,
    exact: true,
    roles: ["Admin"],
  },
  {
    path: "/importCSV",
    component: ImportCSV,
    exact: true,
    roles: ["Admin"],
  },
]
