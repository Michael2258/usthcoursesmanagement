import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setAlert, setLoading } from "../../../redux/commons/action"
import {
  getAllSchoolYear,
  createSchoolYear,
  removeSchoolYear,
} from "../../../services/schoolYearService"

interface Courses {
  id: number
  name: string
}
interface SchoolYear {
  id: number
  year: string
  numberOfCourses: number
  courses?: Courses
}

const useSchoolYear = () => {
  const dispatch = useDispatch()

  const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([])
  const [tempSchoolYears, setTempSchoolYear] = useState<SchoolYear[]>([])

  const initialValue: SchoolYear = {
    id: schoolYears.length + tempSchoolYears.length + 1,
    year: "",
    numberOfCourses: 0,
  }

  // add to UI
  const addTempSchoolYearHandler = () => {
    setTempSchoolYear((cur) => [...cur, initialValue])
  }

  const deleteTempSchoolYearHandler = (tempSchoolYearId: number) => {
    setTempSchoolYear(
      tempSchoolYears.filter((item: any) => item.id !== tempSchoolYearId)
    )
  }

  const getDataHandler = useCallback(async () => {
    dispatch(setLoading(true))

    try {
      const res = await getAllSchoolYear()
      setSchoolYears(res.data.items)
    } catch (err) {
      dispatch(setAlert({ type: "danger", message: err.Message }))
    }

    dispatch(setLoading(false))
  }, [])

  const createSchoolYearHandler = useCallback(async () => {
    dispatch(setLoading(true))
    try {
      const results = await Promise.all(
        tempSchoolYears.map((item: any) =>
          createSchoolYear({ year: item.year })
        )
      )

      const newList = [...schoolYears, ...results.map((item: any) => item.data)]

      setSchoolYears(newList)
      setTempSchoolYear([])
      await getDataHandler()
    } catch (err) {
      dispatch(setAlert({ type: "danger", message: err.Message }))
    }

    dispatch(setLoading(false))
  }, [tempSchoolYears])

  const deleteSchoolYearHandler = useCallback(async (schoolYearId: number) => {
    dispatch(setLoading(true))

    try {
      await removeSchoolYear(schoolYearId)
      getDataHandler()
    } catch (err) {
      dispatch(setAlert({ type: "danger", message: err.Message }))
    }

    dispatch(setLoading(false))
  }, [])

  useEffect(() => {
    getDataHandler()
  }, [])

  return {
    schoolYears,
    createSchoolYearHandler,
    deleteSchoolYearHandler,
    addTempSchoolYearHandler,
    deleteTempSchoolYearHandler,
    tempSchoolYears,
  }
}

export default useSchoolYear
