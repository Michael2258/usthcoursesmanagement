import React from "react";
import { Row, Col, Input, Label, Button } from "reactstrap";
import { Formik } from "formik";
import * as yup from "yup";

import useCourseDetail from "../hooks/useCourseDetail";
import { useParams } from "react-router";
import ErrorHandler from "../../../components/Alerts/ErrorHandler";
import AttachmentFile from "./AttachmentFile";
import { Container } from "reactstrap";
import course from "../styles/course.module.scss";
import { FormGroup } from "reactstrap";
import TeacherSelector from "../../../components/Selectors/TeacherSelector";
import { useHistory } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  semester: yup.number().required("Semester is required"),
  schoolYear: yup.string().required("School year is required"),
  description: yup.string(),
});

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    courseDetail,
    createOrUpdateCourse,
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
  } = useCourseDetail(parseInt(id));

  const submitHandler = (values: any) => {
    createOrUpdateCourse(values);
  };

  const history = useHistory();

  return (
    <Container>
      <Formik
        initialValues={courseDetail}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          submitHandler(values);
        }}
      >
        {(formikProps) => {
          const { values, touched, errors, setFieldValue, handleBlur } =
            formikProps;

          const courseBooks = values?.courseDetail?.attachments.filter(
            (file) => file.uploadedFileType === 1
          );

          const courseBookList = fileUpload.filter(
            (file: any) => file.uploadedFileType === 1
          );

          const slides = values?.courseDetail?.attachments.filter(
            (file) => file.uploadedFileType === 2
          );

          const slideList = fileUpload.filter(
            (file: any) => file.uploadedFileType === 2
          );

          const downloadFileHandler = (key: string) => {
            const url = `/api/file/download?key=${key}`;
            window.open(url, "_blank");
          };

          return (
            <div id="course-detail">
              <Row>
                <Col className={`${course["course-detail__header"]}`}>
                  <p>{!!id ? "Course detail" : "Create a new course"}</p>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col>
                  <Label className={`${course["course-detail__label"]}`}>
                    Name
                  </Label>
                  <Input
                    disabled={isTeacher}
                    className={`${course["course-detail-input"]}`}
                    placeholder="Course name"
                    type="text"
                    name="course-name"
                    value={values.name}
                    onChange={(e) => setFieldValue("name", e.target.value)}
                    onBlur={handleBlur("course-name")}
                    required
                  />
                  {touched.name && errors.name && (
                    <ErrorHandler text={errors.name} />
                  )}
                </Col>
              </Row>

              <Row className="mb-2">
                <Col>
                  <Label className={`${course["course-detail__label"]}`}>
                    Semester
                  </Label>

                  <Input
                    disabled={isTeacher}
                    className={`${course["course-detail-input"]}`}
                    placeholder="Semester"
                    type="number"
                    name="semester"
                    value={values.semester}
                    onChange={(e) => setFieldValue("semester", e.target.value)}
                    onBlur={handleBlur("semester")}
                    required
                  />
                  {/* {touched?.semester && errors?.semester && (
                  <ErrorHandler text={errors?.semester} />
                )} */}
                </Col>

                <Col>
                  <Label className={`${course["course-detail__label"]}`}>
                    School Year
                  </Label>
                  <Input
                    disabled={isTeacher}
                    className={`${course["course-detail-input"]}`}
                    placeholder="School year"
                    type="number"
                    name="schoolYear"
                    value={values?.schoolYear}
                    onChange={(e) =>
                      setFieldValue("schoolYear", e.target.value)
                    }
                    onBlur={handleBlur("description")}
                  />
                </Col>
              </Row>

              <Row className="mb-2 d-flex flex-column">
                <Col>
                  <Label className={`${course["course-detail__label"]}`}>
                    Lecturer
                  </Label>
                  <div>
                    <TeacherSelector
                      disabled={isTeacher}
                      value={values.teacherId}
                      onChange={(e: any) => setFieldValue("teacherId", e.value)}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col>
                  <Label className={`${course["course-detail__label"]}`}>
                    Description
                  </Label>
                  <Input
                    className={`${course["course-detail__input-desc"]}`}
                    placeholder="Course description"
                    type="textarea"
                    name="description"
                    value={values?.courseDetail?.description}
                    onChange={(e) =>
                      setFieldValue("courseDetail.description", e.target.value)
                    }
                    onBlur={handleBlur("description")}
                  />
                </Col>
              </Row>
              {!!id && (
                <Row>
                  <FormGroup
                    className={`${course["course-detail__attached-files-container"]}`}
                  >
                    <legend>Attached Files</legend>
                    <FormGroup>
                      <Label>
                        <Input
                          value="course-book"
                          onChange={(e: any) =>
                            setSelectedFileType(e.target.value)
                          }
                          checked={selectedFileType === "course-book"}
                          type="radio"
                          name="course-book"
                        />
                        Course book
                      </Label>
                    </FormGroup>

                    {selectedFileType === "course-book" && (
                      <div>
                        <Row>
                          <Col>
                            <Button
                              className={`${course["course-detail__upload-btn"]}`}
                              size="sm"
                              onClick={onAttachFileCourseBook}
                            >
                              <span>Add Course Book</span>
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          {!!courseBooks &&
                            courseBooks.map((attached) => {
                              return (
                                <Col
                                  md={3}
                                  key={attached.key}
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <AttachmentFile
                                    downloadFile={() =>
                                      downloadFileHandler(attached.key)
                                    }
                                    fileType={attached.name.substr(
                                      attached.name.indexOf(".") + 1
                                    )}
                                    label={attached.name}
                                    onRemove={() => {
                                      setFieldValue(
                                        "courseDetail.attachments",
                                        values?.courseDetail?.attachments.filter(
                                          (i) => i.name !== attached.name
                                        )
                                      );

                                      removeFile(attached.key);

                                      if (attached.id) {
                                        removeAttachedFile(attached.id);
                                      }
                                    }}
                                  />
                                </Col>
                              );
                            })}
                          {!!courseBookList &&
                            courseBookList.map((file: any, index: number) => (
                              <Col
                                md={3}
                                key={index}
                                className="d-flex align-items-center justify-content-center"
                              >
                                <AttachmentFile
                                  fileType={file.name.substr(
                                    file.name.indexOf(".") + 1
                                  )}
                                  label={file.name}
                                  onRemove={() => {
                                    removeAttachment(file.id, file.name);
                                  }}
                                />
                              </Col>
                            ))}
                        </Row>
                      </div>
                    )}

                    <FormGroup>
                      <Label>
                        <Input
                          value="slide"
                          onChange={(e: any) =>
                            setSelectedFileType(e.target.value)
                          }
                          checked={selectedFileType === "slide"}
                          type="radio"
                          name="slide"
                        />
                        Slide
                      </Label>
                    </FormGroup>

                    {selectedFileType === "slide" && (
                      <div>
                        <Row>
                          <Col>
                            <Button
                              className={`${course["course-detail__upload-btn"]}`}
                              size="sm"
                              onClick={onAttachFileSlide}
                            >
                              <span>Add Slides</span>
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          {!!slides &&
                            slides.map((attached) => (
                              <Col
                                md={3}
                                key={attached.key}
                                className="d-flex align-items-center justify-content-center"
                              >
                                <AttachmentFile
                                  downloadFile={() =>
                                    downloadFileHandler(attached.key)
                                  }
                                  fileType={attached.name.substr(
                                    attached.name.indexOf(".") + 1
                                  )}
                                  label={attached.name}
                                  onRemove={() => {
                                    setFieldValue(
                                      "courseDetail.attachments",
                                      values?.courseDetail?.attachments.filter(
                                        (i) => i.name !== attached.name
                                      )
                                    );

                                    removeFile(attached.key);

                                    if (attached.id) {
                                      removeAttachedFile(attached.id);
                                    }
                                  }}
                                />
                              </Col>
                            ))}
                          {!!slideList &&
                            slideList.map((file: any, index: number) => (
                              <Col
                                md={3}
                                key={index}
                                className="d-flex align-items-center justify-content-center"
                              >
                                <AttachmentFile
                                  fileType={file.name.substr(
                                    file.name.indexOf(".") + 1
                                  )}
                                  label={file.name}
                                  onRemove={() =>
                                    removeAttachment(file.id, file.name)
                                  }
                                />
                              </Col>
                            ))}
                        </Row>
                      </div>
                    )}
                  </FormGroup>
                </Row>
              )}

              <Row form>
                <Col className="d-flex" style={{ padding: "20px 0" }}>
                  <Button
                    color="primary"
                    size="sm"
                    type="submit"
                    className={`${course["course-detail__submit-btn"]} px-4 pl-1 mr-2 ml-3`}
                    onClick={() => submitHandler(values)}
                  >
                    {!!id ? "Update" : "Create"}
                  </Button>
                  <Button
                    size="sm"
                    onClick={
                      isTeacher
                        ? () => {
                            history.goBack();
                          }
                        : backToList
                    }
                    className={`${course["course-detail__cancel-btn"]} px-4 mr-2 ml-2`}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </div>
          );
        }}
      </Formik>
    </Container>
  );
};

export default CourseDetail;
