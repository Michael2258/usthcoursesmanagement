import React from "react";
import CommonSelector from "./CommonSelector";

const SchoolYearSelector = (props: any) => {
  const { schoolYears, onChange, defaultValue } = props;

  const options = schoolYears.map((schoolyear: any) => ({
    label: schoolyear?.year,
    value: schoolyear?.id,
  }));

  return (
    <CommonSelector
      defaultValue={defaultValue}
      options={options}
      onChange={onChange}
    />
  );
};

export default SchoolYearSelector;
