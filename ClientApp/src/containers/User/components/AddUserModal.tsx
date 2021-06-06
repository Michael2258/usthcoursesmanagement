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
} from "reactstrap"
import { Formik } from "formik"
import * as yup from "yup"

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
            <ModalHeader toggle={toggle}>{headerText}</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="first-name">First Name</Label>
                  <Input
                    type="text"
                    placeholder="You first name..."
                    name="first-name"
                    value={values?.firstName}
                    onChange={(e: any) =>
                      setFieldValue("firstName", e.target.value)
                    }
                    onBlur={handleBlur}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="last-name">Last Name</Label>
                  <Input
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
                <FormGroup>
                  <Label for="user-name">User Name</Label>
                  <Input
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
                  <Label for="email">Email</Label>
                  <Input
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
                  <Label for="roles">Roles</Label>
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
                </FormGroup>

                <FormGroup>
                  <Label for="gender">Gender</Label>
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
                </FormGroup>

                <FormGroup>
                  <Label for="avatar">Date Of Birth</Label>
                  <Input
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
                  <Label for="avatar">Avatar</Label>
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
                type="submit"
                color="primary"
                onClick={() => handleSubmit()}
              >
                Add
              </Button>{" "}
              <Button color="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        )
      }}
    </Formik>
  )
}

export default AddUserModal
