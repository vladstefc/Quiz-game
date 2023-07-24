import { React, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import Layout from "../UI/Layout";
import styles from "./Register.module.css";

import CustomBtn from "../UI/CustomBtn";
import CustomInput from "../UI/CustomInput";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const userRR = {
    name: name,
    email: email,
    password: password,
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    console.log(userRR);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h2>REGISTER</h2>
        <div>
          <form className={styles.form}>
            {/* <CustomInput onCHange={onNameChange}>Name</CustomInput> */}
            <CustomInput onCHange={onEmailChange} type={"email"}>
              Email
            </CustomInput>
            <CustomInput onCHange={onPasswordChange} type={"password"}>
              Password
            </CustomInput>
            <div className={styles.btn}>
              <CustomBtn onClick={onSubmitRegister}>Register</CustomBtn>
            </div>
          </form>
          <p>
            Already have an account? <NavLink to="/login">Sign in</NavLink>
          </p>
        </div>
      </div>
    </Layout>
  );
}
