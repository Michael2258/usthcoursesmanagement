import React from "react";
import Select from "react-select";

const GenderSelector = (props: any) => {
  const { value, disabled } = props;

  const isDisabled = !!disabled;

  const options = [
    { value: 0, label: "Male" },
    { value: 1, label: "Female" },
    { value: 2, label: "Others" },
  ];

  const _value = options.find((options) => options.value === value);

  return (
    <div>
      <Select isDisabled={isDisabled} options={options} value={_value} />
    </div>
  );
};

export default GenderSelector;
