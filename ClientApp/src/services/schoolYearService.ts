import { api } from "./api"

const SCHOOL_YEAR_URL = "/api/schoolyear"

export const getAllSchoolYear = () =>
  api.get(`${SCHOOL_YEAR_URL}`, { params: { limit: 10000, page: 1 } })
