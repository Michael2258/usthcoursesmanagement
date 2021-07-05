import { api } from "./api"

export const uploadGradesCSVfile = (formData: FormData) =>
  api.post(`/api/importcsv`, formData, { params: { isUpdate: false } })

export const updateGradesCSVfile = (formData: FormData) =>
  api.post(`/api/importcsv`, formData, { params: { isUpdate: true } })

export const getStudentGradesFromCourseId = (courseId: number) =>
  api.get(`/api/importcsv/getGradesFromCourse/${courseId}`)

export const getCourseGrades = (courseId: number) =>
  api.get(`/api/course/grades/${courseId}`)
