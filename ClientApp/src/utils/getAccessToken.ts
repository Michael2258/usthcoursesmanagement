import { ACCESS_TOKEN } from "./constants"

export default () => {
  try {
    return localStorage.getItem(ACCESS_TOKEN)
  } catch (err) {
    return null
  }
}
