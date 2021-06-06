import { api } from "./api"
const ACCOUNT_URL = `/account`

export const logIn = (data: any) => api.post(`${ACCOUNT_URL}/login`, data)

export const checkToken = (token: string) =>
  api.post(`${ACCOUNT_URL}/checktoken`, { token })

export const getInfo = () => api.get(`${ACCOUNT_URL}/info`)
