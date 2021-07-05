import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setAlert, setLoading } from "../../../redux/commons/action";
import { get } from "../../../services/courseService";
import {
  uploadGradesCSVfile,
  updateGradesCSVfile,
  getStudentGradesFromCourseId,
} from "../../../services/importCSVService";

interface Course {
  id: number;
  name: string;
  semester: number;
  schoolYear: string;
  teacherId: number;
  courseDetail?: CourseDetail;
}

interface CourseDetail {}

interface StudentGrades {
  studentId: string;
  firstName: string;
  lastName: string;
  attendance: number;
  midtermTest: number;
  finalTest: number;
  finalResult: number;
}

const useGrades = () => {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState<Course[]>([]);

  const { courseId } = useParams<{ courseId: string }>();

  const [studentGrades, setStudentGrades] = useState<StudentGrades[]>([]);

  const selectedCourse = courses.find(
    (course: any) => course.id === Number(courseId)
  );

  const getAllCourses = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const res = await get({ page: 1, limit: 10000, search: "" });
      setCourses(res.data.items);
    } catch (err) {
      dispatch(setAlert({ type: "danger", message: err.Message }));
    }

    dispatch(setLoading(false));
  }, []);

  const UploadGradesCSVFileHandler = async (file: any) => {
    dispatch(setLoading(true));

    try {
      const { name } = file;

      const formData = new FormData();
      formData.append("file", file, name);

      await uploadGradesCSVfile(formData);

      await getStudentGradesHandler();

      dispatch(setAlert({ type: "success", message: "Upload successfully" }));
    } catch (err) {
      dispatch(setAlert({ type: "danger", message: err.Message }));
    }

    dispatch(setLoading(false));
  };

  const UpdateGradesCSVFileHandler = async (file: any) => {
    dispatch(setLoading(true));

    try {
      const { name } = file;

      const formData = new FormData();
      formData.append("file", file, name);

      await updateGradesCSVfile(formData);

      await getStudentGradesHandler();

      dispatch(setAlert({ type: "success", message: "Update successfully" }));
    } catch (err) {
      dispatch(setAlert({ type: "danger", message: err.Message }));
    }

    dispatch(setLoading(false));
  };

  const getStudentGradesHandler = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const res = await getStudentGradesFromCourseId(Number(courseId));
      setStudentGrades(res.data.result);
    } catch (err) {
      dispatch(setAlert({ type: "danger", message: err.Message }));
    }

    dispatch(setLoading(false));
  }, [courseId]);

  useEffect(() => {
    getAllCourses();
    !!courseId && getStudentGradesHandler();
  }, [courseId]);

  return {
    courses,
    UploadGradesCSVFileHandler,
    UpdateGradesCSVFileHandler,
    studentGrades,
    selectedCourse,
  };
};

export default useGrades;
