import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAlert, setLoading } from "../../../redux/commons/action";
import { get, remove } from "../../../services/courseService";
import { Filter } from "../../../types/Filter";
import { DEFAULT_FILTER } from "../../../utils/constants";
interface Course {
  id: number;
  name: string;
  semester: number;
  schoolYear: string;
  teacherId: number;
  numYear: number;
  department: number;
}

const initValue = [
  {
    id: 0,
    name: "",
    semester: 0,
    schoolYear: "",
    teacherId: 0,
    numYear: 0,
    department: 0,
  },
];

const useCourseList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [courseList, setCourseList] = useState<Course[]>(initValue);

  const [filter, setFilter] = useState<Filter>(DEFAULT_FILTER);

  const changeFilters = (updateFilters: any) => {
    setFilter({ ...filter, ...updateFilters });
  };

  const getData = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const res = await get(filter);
      setCourseList(res.data.items);
    } catch (err) {
      dispatch(setAlert({ type: "danger", message: err.message }));
    }

    dispatch(setLoading(false));
  }, [filter, courseList]);

  const removeCourse = useCallback(async (id: number) => {
    dispatch(setLoading(true));

    try {
      await remove(id);
      dispatch(
        setAlert({ type: "success", message: "Remove course successfully." })
      );
      changeFilters({ currentPage: 1 });
    } catch (err) {
      dispatch(setAlert({ type: "danger", message: err.message }));
    }

    dispatch(setLoading(false));
  }, []);

  const goToDetail = useCallback((id?: number) => {
    const url = !!id ? `/admin/course/${id}` : "/admin/createcourse";
    history.push(url);
  }, []);

  useEffect(() => {
    getData();
  }, [filter]);

  return {
    courseList,
    changeFilters,
    removeCourse,
    goToDetail,
    filter,
  };
};

export default useCourseList;
