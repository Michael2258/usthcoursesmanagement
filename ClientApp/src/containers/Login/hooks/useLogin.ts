import { useState, useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import { logIn } from "../../../services/accountService"
import { setLoading, setUser, setAlert } from "../../../redux/commons/action"
import { ACCESS_TOKEN } from "../../../utils/constants"
import getAccessToken from "../../../utils/getAccessToken"

type LoginInfo = {
  email: string
  password: string
}

const initData: LoginInfo = {
  email: "",
  password: "",
}

const useLogin = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  // const [data, setData] = useState(initData)
  // const changeData = useCallback(
  //   (valueObject) => {
  //     setData({
  //       ...data,
  //       ...valueObject,
  //     })
  //   },
  //   [data]
  // )

  useEffect(() => {
    const token = getAccessToken()
    if (!!token) history.push("/")
  }, [])

  const userLogin = useCallback(async (data: any) => {
    dispatch(setLoading(true))

    try {
      const res = await logIn(data)
      const { token, email, firstName, lastName, roles } = res.data

      dispatch(setUser({ email, firstName, lastName }))
      localStorage.setItem(ACCESS_TOKEN, token)

      if (roles.includes("Admin") || roles.includes("SuperAdmin")) {
        history.push("/admin")
      } else if (roles.includes("Teacher")) {
        history.push("/teacher")
      } else if (roles.includes("Student")) {
        history.push("/student")
      }
    } catch (err) {
      dispatch(
        setAlert({
          type: "danger",
          message: err.response?.data || err.message,
        })
      )
      localStorage.removeItem(ACCESS_TOKEN)
    }

    dispatch(setLoading(false))
  }, [])

  return { initData, userLogin }
}

export default useLogin
