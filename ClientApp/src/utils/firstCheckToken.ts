import getAccessToken from "./getAccessToken"
import { checkToken } from "../services/accountService"

const firstCheckToken = async () => {
  try {
    const token = getAccessToken()
    if (!token) return false

    const tokenStatus = await checkToken(token)
    if (!tokenStatus.data) return false

    return true
  } catch (err) {
    return false
  }
}

export default firstCheckToken
