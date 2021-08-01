import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setAlert, setLoading } from "../../../redux/commons/action";
import { getAll } from "../../../services/courseService";
import {
  uploadGradesCSVfile,
  updateGradesCSVfile,
  getStudentGradesFromCourseId,
  getGradesCount,
} from "../../../services/importCSVService";

interface Course {
  id: number;
  name: string;
  semester: number;
  schoolYear: string;
  teacherId: number;
  courseDetail?: CourseDetail;
  numYear: number;
  department: number;
}

interface CourseDetail {
  description: string;
  attachments: Attachments[];
}

interface Attachments {
  uploadedFileType: number;
  key: string;
  name: string;
}

interface StudentGrades {
  studentId: string;
  firstName: string;
  lastName: string;
  attendance: number;
  midtermTest: number;
  finalTest: number;
  finalResult: number;
}

interface GradesCount {
  gradeLevel: number;
  count: number;
}

const useGrades = () => {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState<Course[]>([]);

  const [gradesCount, setGradesCount] = useState<GradesCount[]>([]);

  const { courseId } = useParams<{ courseId: string }>();

  const [studentGrades, setStudentGrades] = useState<StudentGrades[]>([]);

  const selectedCourse = courses?.find(
    (course: any) => course.id === Number(courseId)
  );

  const getAllCourses = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const res = await getAll();
      setCourses(res.data);
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

  const getGradesCountHandler = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const res = await getGradesCount(Number(courseId));
      setGradesCount(res.data.result);
    } catch (err) {
      dispatch(setAlert({ type: "danger", message: err.Message }));
    }

    dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    getAllCourses();
    getGradesCountHandler();
    !!courseId && getStudentGradesHandler();
  }, [courseId]);

  return {
    courses,
    UploadGradesCSVFileHandler,
    UpdateGradesCSVFileHandler,
    studentGrades,
    selectedCourse,
    gradesCount,
    courseId,
  };
};

export default useGrades;
