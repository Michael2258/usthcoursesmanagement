import React from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Row,
  Col,
} from "reactstrap"
import { Formik } from "formik"
import * as yup from "yup"
import user from "../styles/user.module.scss"

type UserBasicInfo = {
  userName: string
  firstName: string
  lastName: string
  email: string
  roles: string[]
  gender: string
  dateOfBirth: string
  avatar: string
}

const AddUserModal = (props: any) => {
  const { className, toggle, modal, createOrUpdate, headerText, userDetail } =
    props

  const validationSchema = yup.object({
    userName: yup.string().required("User Name is required"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .required("Email is required.")
      .email("Email is invalid"),
    roles: yup.array().of(yup.string()).required("Role is required."),
    dateOfBirth: yup.string().required("Date of birth is required"),
    gender: yup.string().required("Gender is required."),
    avatar: yup.string(),
  })

  return (
    <Formik
      initialValues={userDetail}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        createOrUpdate(values, () => actions.resetForm())
      }}
    >
      {(formikProps) => {
        const { values, handleBlur, handleSubmit, setFieldValue } = formikProps

        const onCancel = () => {
          formikProps.resetForm()
          formikProps.setTouched({})
          formikProps.setErrors({})
          !!toggle && toggle()
        }

        return (
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalBody className={`${user["add-user-modal-body"]}`}>
              <Form>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label
                        className={`${user["add-user-modal-label"]}`}
                        for="first-name"
                      >
                        First Name <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        className={`${user["add-user-modal-first-name"]}`}
                        type="text"
                        placeholder="Your first name..."
                        name="first-name"
                        value={values?.firstName}
                        onChange={(e: any) =>
                          setFieldValue("firstName", e.target.value)
                        }
                        onBlur={handleBlur}
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup>
                      <Label
                        className={`${user["add-user-modal-label"]}`}
                        for="last-name"
                      >
                        Last Name <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        className={`${user["add-user-modal-last-name"]}`}
                        type="text"
                        placeholder="Your last name..."
                        name="last-name"
                        value={values?.lastName}
                        onChange={(e: any) =>
                          setFieldValue("lastName", e.target.value)
                        }
                        onBlur={handleBlur}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                  <Label
                    className={`${user["add-user-modal-label"]}`}
                    for="user-name"
                  >
                    User Name <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    className={`${user["add-user-modal-username"]}`}
                    type="text"
                    placeholder="Your user name..."
                    name="user-name"
                    value={values?.userName}
                    onChange={(e: any) =>
                      setFieldValue("userName", e.target.value)
                    }
                    onBlur={handleBlur}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label
                    className={`${user["add-user-modal-label"]}`}
                    for="gender"
                  >
                    Gender <span style={{ color: "red" }}>*</span>
                  </Label>
                  <div className={`${user["add-user-modal-gender"]}`}>
                    <CustomInput
                      type="radio"
                      id="gender-male"
                      name="gender"
                      label="Male"
                      value="Male"
                      checked={values?.gender === "Male"}
                      onChange={(e: any) =>
                        setFieldValue("gender", e.target.value)
                      }
                    />
                    <CustomInput
                      type="radio"
                      id="gender-female"
                      name="gender"
                      label="Female"
                      value="Female"
                      checked={values?.gender === "Female"}
                      onChange={(e: any) =>
                        setFieldValue("gender", e.target.value)
                      }
                    />
                    <CustomInput
                      type="radio"
                      id="gender-others"
                      name="gender"
                      label="Others"
                      value="Others"
                      checked={values?.gender === "Others"}
                      onChange={(e: any) =>
                        setFieldValue("gender", e.target.value)
                      }
                    />
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label
                    className={`${user["add-user-modal-label"]}`}
                    for="email"
                  >
                    Email <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    className={`${user["add-user-modal-email"]}`}
                    type="email"
                    placeholder="Your email..."
                    name="email"
                    value={values?.email}
                    onChange={(e: any) =>
                      setFieldValue("email", e.target.value)
                    }
                    onBlur={handleBlur}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label
                    className={`${user["add-user-modal-label"]}`}
                    for="roles"
                  >
                    Roles <span style={{ color: "red" }}>*</span>
                  </Label>
                  <div className={`${user["add-user-modal-roles"]}`}>
                    <CustomInput
                      type="radio"
                      id="role-admin"
                      name="roles"
                      label="Admin"
                      value="Admin"
                      checked={values?.roles.includes("Admin")}
                      onChange={(e: any) => {
                        setFieldValue("roles", [e.target.value])
                      }}
                    />
                    <CustomInput
                      type="radio"
                      id="role-teacher"
                      name="roles"
                      label="Teacher"
                      value="Teacher"
                      checked={values?.roles.includes("Teacher")}
                      onChange={(e: any) =>
                        setFieldValue("roles", [e.target.value])
                      }
                    />
                    <CustomInput
                      type="radio"
                      id="role-student"
                      name="roles"
                      label="Student"
                      value="Student"
                      checked={values?.roles.includes("Student")}
                      onChange={(e: any) =>
                        setFieldValue("roles", [e.target.value])
                      }
                    />
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label
                    className={`${user["add-user-modal-label"]}`}
                    for="avatar"
                  >
                    Date Of Birth
                  </Label>
                  <Input
                    className={`${user["add-user-modal-dob"]}`}
                    type="date"
                    name="date"
                    id="date"
                    value={values?.dateOfBirth}
                    onChange={(e: any) =>
                      setFieldValue("dateOfBirth", e.target.value)
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label
                    className={`${user["add-user-modal-label"]}`}
                    for="avatar"
                  >
                    Avatar
                  </Label>
                  <Input
                    type="file"
                    name="avatar"
                    id="avatar"
                    value={values?.avatar}
                    onChange={(e: any) =>
                      setFieldValue("avatar", e.target.value)
                    }
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                className={`${user["add-user-modal-btn"]}`}
                type="submit"
                onClick={() => handleSubmit()}
              >
                Add
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </Button>{" "}
              <Button
                onClick={onCancel}
                className={`${user["add-user-modal-btn"]}`}
              >
                Cancel
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </Button>
            </ModalFooter>
          </Modal>
        )
      }}
    </Formik>
  )
}

export default AddUserModal
