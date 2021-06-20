import { Filter } from "../types/Filter"
import { api } from "./api"

const COURSE_URL = "/api/course"

export const get = (filter: Filter) =>
  api.get(`${COURSE_URL}`, { params: filter })

export const getById = (id: number) => api.get(`${COURSE_URL}/${id}`)

export const create = (data: any) => api.post(`${COURSE_URL}`, data)

export const update = (data: any) => api.put(`${COURSE_URL}/${data.id}`, data)

export const remove = (id: number) =>
  api.delete(`${COURSE_URL}/remove-course/${id}`)

export const removeAttachedFile = (attachedId: number) =>
  api.delete(`${COURSE_URL}/remove-attached-file/${attachedId}`)
