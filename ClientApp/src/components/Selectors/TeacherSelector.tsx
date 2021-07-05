import React from "react"
import CommonSelector from "./CommonSelector"
import { getTeacherForSelector } from "../../services/teacherService"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { setAlert, setLoading } from "../../redux/commons/action"
import { useState } from "react"
import { useEffect } from "react"

const TeacherSelector = ({ value, onChange }: any) => {
  const dispatch = useDispatch()

  const [teachers, setTeachers] = useState([])

  const getTeacherForSelectorHandler = useCallback(async () => {
    dispatch(setLoading(true))

    try {
      const res = await getTeacherForSelector()
      setTeachers(res.data)
    } catch (err) {
      dispatch(setAlert(err.message))
    }

    dispatch(setLoading(false))
  }, [])

  useEffect(() => {
    getTeacherForSelectorHandler()
  }, [])

  const options = teachers.map((teacher: any) => {
    const fullName = `${teacher.firstName} ${teacher.lastName}`

    return {
      value: teacher.id,
      label: fullName,
    }
  })

  console.log(options)
  console.log(value)

  return (
    <CommonSelector
      defaultValue={value}
      options={options}
      onChange={onChange}
    />
  )
}

export default TeacherSelector
