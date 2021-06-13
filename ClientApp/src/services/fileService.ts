import { api } from "./api"

const FILE_URL = "/api/file"

export const uploadFile = (formData: FormData) =>
  api.post(`${FILE_URL}`, formData)
