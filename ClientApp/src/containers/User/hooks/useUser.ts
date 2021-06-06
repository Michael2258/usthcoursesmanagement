import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setLoading } from "../../../redux/commons/action"
import { getUser, removeUser } from "../../../services/userServices"
import { setUserList, setUserListTotalItems } from "../../../redux/users/action"
import { DEFAULT_FILTER } from "../../../utils/constants"

interface Filter {
  page: number
  limit: number
  search: string
}

const useUser = () => {
  const userList = useSelector((state: any) => state.users?.userList)

  const totalItems: number = useSelector(
    (state: any) => state.users?.totalItems
  )

  const dispatch = useDispatch()

  const [filters, setFilters] = useState<Filter>(DEFAULT_FILTER)

  const changeFilter = (value: any) =>
    setFilters({
      ...filters,
      ...value,
    })

  const getData = useCallback(async () => {
    dispatch(setLoading(true))

    try {
      const res = await getUser(filters)
      const { items, totalItems } = res.data

      dispatch(setUserList(items))
      dispatch(setUserListTotalItems(totalItems))
    } catch (err) {
      dispatch(setAlert({ type: "danger", message: err.message }))
    }

    dispatch(setLoading(false))
  }, [filters])

  const deleteUserHandler = useCallback(
    async (userId: string, callback: any) => {
      dispatch(setLoading(true))

      try {
        await removeUser(userId)
        callback && callback()

        const newUserList = [...userList]
        newUserList.filter((item: any) => item?.id !== userId)
        dispatch(setUserList(newUserList))

        dispatch(
          setAlert({
            type: "success",
            message: "Delete user successfully",
          })
        )
      } catch (err) {
        dispatch(setAlert({ type: "danger", message: err.message }))
      }

      dispatch(setLoading(false))
    },
    []
  )

  useEffect(() => {
    getData()
  }, [filters])

  return {
    changeFilter,
    filters,
    totalItems,
    deleteUserHandler,
    userList,
    getData,
  }
}

export default useUser
