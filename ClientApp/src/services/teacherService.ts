import { api } from "./api"

export const getTeacherForSelector = () => api.get(`/api/teacher`)

export const getTeacherById = (teacherId: number) =>
  api.get(`/api/teacher/${teacherId}`)
