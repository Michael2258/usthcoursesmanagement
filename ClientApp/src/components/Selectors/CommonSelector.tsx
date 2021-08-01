import React from "react";
import Select from "react-select";

const CommonSelector = ({
  defaultValue,
  options,
  isDisabled,
  ...rest
}: any) => {
  const initValue =
    defaultValue !== null && typeof defaultValue !== "undefined"
      ? options.find((option: any) => option.value === defaultValue) || null
      : null;

  const colourStyles = {
    control: (base: any) => ({
      ...base,
      background: "#152033",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "#fff",
    }),
    input: (base: any) => ({
      ...base,
      color: "#fff",
    }),
    menu: (base: any) => ({
      ...base,
      color: "#000",
    }),
  };

  return (
    <Select
      styles={colourStyles}
      isDisabled={isDisabled}
      options={options}
      value={initValue}
      {...rest}
    />
  );
};

export default CommonSelector;
