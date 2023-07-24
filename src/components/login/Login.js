import { React, useState, useContext } from "react";
import styles from "./Login.module.css";

import { QuizContext } from "../../store/QuizContext";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { NavLink, useNavigate } from "react-router-dom";

import Layout from "../UI/Layout";

import CustomBtn from "../UI/CustomBtn";
import CustomInput from "../UI/CustomInput";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/game");
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode, errorMessage);
      });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h2>LOGIN</h2>
        <div>
          <form className={styles.form}>
            <CustomInput type={"email"} required onChange={onEmailChange}>
              Email
            </CustomInput>
            <CustomInput type={"password"} required onChange={onPasswordChange}>
              Password
            </CustomInput>
            <div className={styles.btn}>
              <CustomBtn onClick={onSubmitSignIn}>Login</CustomBtn>
            </div>
            <CustomBtn>Register</CustomBtn>
          </form>
          <div className={styles.forgot}>
            <a>Forgot your password?</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
