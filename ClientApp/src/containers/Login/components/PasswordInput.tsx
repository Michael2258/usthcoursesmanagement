import React, { CSSProperties } from "react"
import { Input } from "reactstrap"
import loginform from "../styles/loginform.module.scss"

const PasswordInput = (props: any) => {
  const {
    values,
    handleBlur,
    isPasswordShown,
    togglePasswordVisible,
    onChange,
  } = props

  const eyeIconStyle: CSSProperties = {
    fontSize: "20px",
  }

  return (
    <div className={`${loginform["password-input__wrapper"]}`}>
      <Input
        className={`${loginform["password-input"]}`}
        type={isPasswordShown ? "text" : "password"}
        name="password"
        placeholder="Password"
        value={values.password}
        onChange={onChange}
        onBlur={handleBlur("password")}
        required
      />
      <i
        className={`far ${
          isPasswordShown ? "fa-eye-slash" : "fa-eye"
        } mx-2 cursor-pointer`}
        onClick={() => togglePasswordVisible()}
        title={isPasswordShown ? "Hide" : "Show"}
        style={eyeIconStyle}
      />
    </div>
  )
}

export default PasswordInput
