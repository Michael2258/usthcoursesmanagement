import { api } from "./api"

interface Filter {
  page: number
  limit: number
  search: string
}

const USER_URL = "/api/user"

export const createUser = (data: any) => api.post(`${USER_URL}`, data)

export const getUser = (filter: Filter) =>
  api.get(`${USER_URL}`, { params: filter })

export const getUserById = (userId: string) => api.get(`${USER_URL}/${userId}`)

export const updateUser = (data: any) => api.put(`${USER_URL}/${data.id}`, data)

export const removeUser = (userId: string) =>
  api.delete(`${USER_URL}/${userId}`)
