import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseGrades } from "../../../services/importCSVService";

interface CourseGrades {
  courseId: number;
  midtermTestFailed: number;
  finalTestFailed: number;
  finalResultFailed: number;
}

const useGradesCourse = () => {
  const [courseGrades, setCourseGrades] = useState<CourseGrades>();

  const { courseId } = useParams<{ courseId: string }>();

  const getCourseGradesHandler = useCallback(async () => {
    const res = await getCourseGrades(Number(courseId));
    setCourseGrades(res.data.result);
  }, [courseId]);

  useEffect(() => {
    !!courseId && getCourseGradesHandler();
  }, [courseId]);

  return { courseGrades };
};

export default useGradesCourse;
