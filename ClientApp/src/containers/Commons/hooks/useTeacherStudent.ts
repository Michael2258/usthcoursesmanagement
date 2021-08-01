import { useState } from "react";

const useTeacherStudent = () => {
  const [selectedCourse, setSelectedCourse] = useState<any>();

  return {
    selectedCourse,
    setSelectedCourse,
  };
};

export default useTeacherStudent;
