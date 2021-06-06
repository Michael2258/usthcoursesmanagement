import React from "react"
import LoginForm from "../components/LoginForm"
import loginform from "../styles/loginform.module.scss"

function Login() {
  return (
    <div className={`${loginform["login-page__container"]}`}>
      <div className={`${loginform["usth-logo-login__container"]}`}>
        <img src={require("../../../assets/icons/USTH_logo.png")} />
      </div>

      <LoginForm />
    </div>
  )
}

export default Login
