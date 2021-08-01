import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAlert, setLoading } from "../../../redux/commons/action";
import {
  getById,
  create,
  update,
  removeAttachedFile,
} from "../../../services/courseService";
import {
  uploadCoursebook,
  uploadSlide,
  removeFile,
} from "../../../services/fileService";

interface Attachment {
  id?: number;
  name: string;
  key: string;
  uploadedFileType: number;
}

interface CourseDetail {
  id?: number;
  description: string;
  attachments: Attachment[];
}

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

const initValue: Course = {
  id: 0,
  name: "",
  semester: 0,
  schoolYear: "",
  teacherId: 0,
  numYear: 0,
  department: 0,
  courseDetail: {
    id: 0,
    description: "",
    attachments: [],
  },
};

const useCourseDetail = (id?: number) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [courseDetail, setCourseDetail] = useState<Course>(initValue);
  const [fileUpload, setFileUpload] = useState<any>([]);
  const [removedFiles, setRemovedFiles] = useState<string[]>([]);

  const [selectedFileType, setSelectedFileType] = useState<string>("");

  useEffect(() => {
    !!id && getData();
  }, [id]);

  const getData = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const res = await getById(id as number);
      setCourseDetail(res.data);
    } catch (err) {
      dispatch(setAlert({ type: "danger", message: err.message }));
    }

    dispatch(setLoading(false));
  }, [id]);

  const backToList = useCallback(() => {
    history.push("/admin/course");
  }, []);

  const isTeacher = useSelector(
    (state: any) => state.commons?.user?.roles
  )?.includes("Teacher");

  // add or edit course in database
  const createOrUpdateCourse = useCallback(
    async (data: any) => {
      dispatch(setLoading(true));

      try {
        if (!!fileUpload && !!fileUpload.length) {
          const fileDataCourseBook: any = await uploadCourseBooksHandler();

          const fileDataSlide: any = await uploadSlidesHandler();

          const newCourseBooks = !!fileDataCourseBook
            ? fileDataCourseBook.map((item: any) => ({
                key: item.data.key,
                name: item.data.name,
                uploadedFileType: 1,
              }))
            : [];

          const newSlides = !!fileDataSlide
            ? fileDataSlide.map((item: any) => ({
                key: item.data.key.trim(),
                name: item.data.name,
                uploadedFileType: 2,
              }))
            : [];

          data.courseDetail.attachments = [
            ...data.courseDetail.attachments,
            ...newCourseBooks,
            ...newSlides,
          ];
        }

        const createOrUpdate = !!id ? update : create;

        await createOrUpdate(data);

        dispatch(
          setAlert({
            type: "success",
            message: `${!!id ? "Update" : "Create"} course successfully.`,
          })
        );

        !isTeacher && backToList();
      } catch (err) {
        dispatch(setAlert({ type: "danger", message: err.message }));
      }

      dispatch(setLoading(false));
    },
    [id, fileUpload]
  );

  // upload course books to AWS
  const uploadCourseBooksHandler = async () => {
    const attachmentInputs: any = document.getElementsByClassName(
      "input-attachment-course-book"
    );

    const promises: Promise<any>[] = [];

    for (const attachmentInput of attachmentInputs) {
      for (const file of attachmentInput.files) {
        const { name } = file;

        const formData = new FormData();
        formData.append("file", file, name);

        promises.push(uploadCoursebook(formData));
      }
    }

    return Promise.all(promises);
  };

  // upload slides to AWS
  const uploadSlidesHandler = async () => {
    const attachmentInputs: any = document.getElementsByClassName(
      "input-attachment-slide"
    );

    const promises: Promise<any>[] = [];

    for (const attachmentInput of attachmentInputs) {
      for (const file of attachmentInput.files) {
        const { name } = file;

        const formData = new FormData();
        formData.append("file", file, name);

        promises.push(uploadSlide(formData));
      }
    }

    return Promise.all(promises);
  };

  const onAttachFileCourseBook = () => {
    const inputs = document.getElementsByClassName(
      "input-attachment-course-book"
    );
    const newInput = document.createElement("input");
    const courseDetail = document.getElementById("course-detail");
    courseDetail?.append(newInput);
    newInput.className = "input-attachment-course-book";
    newInput.id = `inputAttachment-${inputs.length + 1}`;
    newInput.type = "file";
    newInput.style.display = "none";
    newInput.setAttribute("multiple", "multiple");
    newInput.addEventListener("change", updateAttachment);
    newInput.click();
  };

  const onAttachFileSlide = () => {
    const inputs = document.getElementsByClassName("input-attachment-slide");
    const newInput = document.createElement("input");
    const courseDetail = document.getElementById("course-detail");
    courseDetail?.append(newInput);
    newInput.className = "input-attachment-slide";
    newInput.id = `inputAttachment-${inputs.length + 1}`;
    newInput.type = "file";
    newInput.style.display = "none";
    newInput.setAttribute("multiple", "multiple");
    newInput.addEventListener("change", updateAttachment);
    newInput.click();
  };

  const updateAttachment = () => {
    const files: any = [];

    const attachmentInputsCourseBook: any = document.getElementsByClassName(
      "input-attachment-course-book"
    );

    const attachmentInputsSlide: any = document.getElementsByClassName(
      "input-attachment-slide"
    );

    for (const attachmentInput of attachmentInputsCourseBook) {
      for (const file of attachmentInput.files) {
        const { name } = file;

        if (
          !removedFiles.includes(file) &&
          !files.some((file: any) => file.label == name)
        ) {
          files.push({
            name: name,
            id: attachmentInput.id,
            uploadedFileType: 1,
          });
        }
      }
      continue;
    }

    for (const attachmentInput of attachmentInputsSlide) {
      for (const file of attachmentInput.files) {
        const { name } = file;

        if (
          !removedFiles.includes(file) &&
          !files.some((file: any) => file.label == name)
        ) {
          files.push({
            name: name,
            id: attachmentInput.id,
            uploadedFileType: 2,
          });
        }
      }
      continue;
    }

    setFileUpload(files);
  };

  const removeAttachment = (id: string, fileName: string) => {
    if (fileUpload.filter((item: any) => item.id === id).length === 1) {
      const thisInput = document.getElementById(id);
      thisInput?.remove();

      let newRemovedFile = fileUpload.filter(
        (removed: any) => removed.id === id
      );

      fileUpload.filter((item: any) => item.id !== newRemovedFile.id);
      removedFiles.push(newRemovedFile);

      setRemovedFiles([...removedFiles]);
      setFileUpload([...fileUpload]);
      return;
    }

    setRemovedFiles([...removedFiles, fileName]);
  };

  useEffect(() => {
    updateAttachment();
  }, [removedFiles]);

  return {
    courseDetail,
    createOrUpdateCourse,
    updateAttachment,
    backToList,
    removeAttachment,
    fileUpload,
    onAttachFileCourseBook,
    onAttachFileSlide,
    selectedFileType,
    setSelectedFileType,
    removeAttachedFile,
    removeFile,
    isTeacher,
  };
};

export default useCourseDetail;
