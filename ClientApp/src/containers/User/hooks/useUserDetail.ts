import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setLoading, setAlert } from "../../../redux/commons/action"
import {
  getUserById,
  updateUser,
  createUser,
} from "../../../services/userServices"
import { User } from "../../../utils/constants"

const initialUser: User = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  roles: [],
  gender: "",
  dateOfBirth: "",
  avatar: "",
}

const useUserDetail = () => {
  const dispatch = useDispatch()

  const [userId, setUserId] = useState<string>("")

  const [userDetail, setUserDetail] = useState<User>(initialUser)

  const getDataById = useCallback(async () => {
    dispatch(setLoading(true))

    try {
      const res = await getUserById(userId)
      setUserDetail(res.data)
    } catch (error) {
      dispatch(setAlert({ type: "danger", message: error.message }))
    }

    dispatch(setLoading(false))
  }, [userId])

  const createOrUpdateUser = useCallback(
    async (data: any, callback: any) => {
      dispatch(setLoading(true))

      try {
        const next = !!userId ? updateUser : createUser
        await next(data)
        callback && callback()
      } catch (error) {
        dispatch(setAlert({ type: "danger", message: error.message }))
      }

      dispatch(setLoading(false))
    },
    [userId]
  )

  useEffect(() => {
    !!userId ? getDataById() : setUserDetail(initialUser)
  }, [userId])

  return {
    userDetail,
    userId,
    setUserId,
    setUserDetail,
    createOrUpdateUser,
  }
}

export default useUserDetail
