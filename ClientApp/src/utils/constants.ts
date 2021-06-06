import { Filter } from "../types/Filter"

export const BASE_URL = (() => {
  const windowUrl = window.location.href
  const url = `${windowUrl.split("//")[0]}//${
    windowUrl.split("//")[1].split("/")[0]
  }`
  return url
})()

export const ACCESS_TOKEN = "ACCESS_TOKEN"

export const DEFAULT_FILTER: Filter = {
  page: 1,
  limit: 5,
  search: "",
}

export const COLORS = {
  DANGER: "#dc3545",
  WARNING: "#ffc107",
  SUCCESS: "#28a745",
  INFO: "#007bff",
}

export const DEFAULT_LIMIT_OPTIONS = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
]

export const DATE_FORMAT = "yyyy-MM-dd"
export const DATE_MIN_VALUE = "0001-01-01T00:00:00"
export const FULL_DATE_FORMAT = "MM-dd-yyyy HH:mm:ss"
export const MINUTE_DATE_FORMAT = "MM-dd-yyyy HH:mm"

export const PUSHER_KEY = "d42708a08afe90f857ea"
export const PUSHER_CLUSTER = "ap1"

export interface User {
  firstName: string
  lastName: string
  userName: string
  email: string
  dateOfBirth: string
  gender: string
  roles: string[]
  avatar: string
}
