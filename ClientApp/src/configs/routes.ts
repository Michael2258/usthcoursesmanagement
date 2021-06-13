import UserControlPage from "../containers/User/views/UserControlPage"
import FileForm from "../containers/Files/views/FileForm"

export const adminRoutes = [
  {
    path: "/user",
    component: UserControlPage,
    exact: true,
    roles: ["Admin"],
  },
  {
    path: "/uploadfiles",
    component: FileForm,
    exact: true,
    roles: ["Admin"],
  },
]
