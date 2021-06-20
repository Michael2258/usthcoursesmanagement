import { api } from "./api"

const FILE_URL = "/api/file"

export const uploadCoursebook = (formData: FormData) =>
  api.post(`${FILE_URL}/system/coursebook`, formData)

export const uploadSlide = (formData: FormData) =>
  api.post(`${FILE_URL}/system/slides`, formData)

export const removeFile = (key: string) =>
  api.delete(`${FILE_URL}/remove-file`, { params: { key: key } })
