import UserControlPage from "../containers/User/views/UserControlPage"

export const adminRoutes = [
  {
    path: "/user",
    component: UserControlPage,
    exact: true,
    roles: ["Admin"],
  },
]
