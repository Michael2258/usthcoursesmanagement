import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setAlert, setLoading } from "../../../redux/commons/action"
import { getAllSchoolYear } from "../../../services/schoolYearService"

const useGrades = () => {
  const dispatch = useDispatch()

  const [schoolYears, setSchoolYears] = useState([])

  const getDataHandler = async () => {
    dispatch(setLoading(true))

    try {
      const res = await getAllSchoolYear()
      setSchoolYears(res.data.items)
    } catch (err) {
      dispatch(setAlert({ type: "danger", message: err.Message }))
    }

    dispatch(setLoading(false))
  }

  useEffect(() => {
    getDataHandler()
  }, [])

  return { schoolYears }
}

export default useGrades
