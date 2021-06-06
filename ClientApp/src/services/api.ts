import axios, { AxiosInstance } from "axios"

import encodeParams from "../utils/encodeParams"
import { BASE_URL } from "../utils/constants"
import getAccessToken from "../utils/getAccessToken"

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 0,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => {
    return encodeParams(params)
  },
})

api.interceptors.request.use(
  (config: any) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: any) => Promise.reject(error)
)
