import React from "react"
import Select from "react-select"

const GenderSelector = (props: any) => {
  const {} = props

  const options = [
    { value: 0, label: "Male" },
    { value: 1, label: "Female" },
    { value: 2, label: "Others" },
  ]

  return (
    <div>
      <Select options={options} />
    </div>
  )
}

export default GenderSelector
