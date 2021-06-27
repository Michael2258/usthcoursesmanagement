import React, { FC } from "react"
import { Formik } from "formik"
import * as yup from "yup"
import ErrorHandler from "../../../components/Alerts/ErrorHandler"
import { Button, Form, FormGroup, Input, CustomInput, Label } from "reactstrap"
import loginform from "../styles/loginform.module.scss"
import PasswordInput from "./PasswordInput"
import useLogin from "../hooks/useLogin"

interface Props {}

const validationSchema = yup.object({
  email: yup.string().email("Email is invalid.").required("Email is required"),
  password: yup.string().required("Password is required"),
})

const LoginForm: FC<Props> = () => {
  // const togglePasswordVisible = () => setIsPasswordShown(!isPasswordShown)

  const { initData, userLogin } = useLogin()

  return (
    <Formik
      initialValues={initData}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          userLogin(values)
        } catch (err) {
          console.error(err)
        }
      }}
    >
      {(formikProps) => {
        const {
          handleBlur,
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
        } = formikProps

        const emailError = touched.email && errors.email
        const passwordError = touched.password && errors.password

        return (
          <div className={`${loginform["login-form__container"]}`}>
            <Form
              className={`${loginform["login-form__sub-container"]}`}
              onSubmit={handleSubmit}
            >
              <div className={`${loginform["login-form__header-text"]}`}>
                <span>Login</span>
              </div>

              <FormGroup
                className={`${loginform["login-form__email-container"]}`}
              >
                <Label for="email">Email</Label>

                <Input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur("email")}
                  required
                />
                {emailError && <ErrorHandler text={errors.email as string} />}
              </FormGroup>

              <FormGroup
                className={`${loginform["login-form__password-container"]}`}
              >
                <Label for="password">Password</Label>
                <PasswordInput
                  // isPasswordShown={isPasswordShown}
                  // togglePasswordVisible={togglePasswordVisible}
                  values={values}
                  handleBlur={handleBlur}
                  onChange={(e: any) =>
                    setFieldValue("password", e.target.value)
                  }
                />
                {passwordError && (
                  <ErrorHandler text={errors.password as string} />
                )}
              </FormGroup>
              <FormGroup
                className={`${loginform["login-form__remember-container"]}`}
              >
                <CustomInput type="checkbox" name="remember" id="remember" />
                <Label
                  className={`${loginform["login-form__remember-text"]}`}
                  for="remember"
                >
                  Remember me
                </Label>
              </FormGroup>
              <FormGroup
                className={`${loginform["login-form__login-btn-container"]}`}
              >
                <Button type="submit">Login</Button>
              </FormGroup>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

export default LoginForm
