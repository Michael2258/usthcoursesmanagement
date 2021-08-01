import React from "react";
import CommonSelector from "./CommonSelector";

const StudentYearSelector = (props: any) => {
  const { onChange, defaultValue, studentYears } = props;

  return (
    <CommonSelector
      options={studentYears}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};

export default StudentYearSelector;
