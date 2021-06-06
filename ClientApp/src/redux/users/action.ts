import { createAction } from "@reduxjs/toolkit"

interface User {
  firstName: string
  lastName: string
  fullName: string
  userName: string
  email: string
  gender: string
  roles: string[]
  dateOfBirth: string
  avatar: string
}

export const setUserList = createAction<User[]>("users/setUserList")

export const setUserListTotalItems = createAction<number>(
  "users/setUserListTotalItems"
)
