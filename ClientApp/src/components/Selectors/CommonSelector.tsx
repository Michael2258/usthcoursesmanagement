import React from "react"
import Select from "react-select"

const CommonSelector = ({
  defaultValue,
  options,
  isDisabled,
  ...rest
}: any) => {
  const initValue =
    defaultValue !== null && typeof defaultValue !== "undefined"
      ? options.find((option: any) => option.value === defaultValue) || null
      : null

  return (
    <Select
      isDisabled={isDisabled}
      options={options}
      value={initValue}
      {...rest}
    />
  )
}

export default CommonSelector
