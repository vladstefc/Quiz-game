import { React, useState } from "react";
import "./Login.css";

import { Button, Form } from "semantic-ui-react";

export default function Login(onRouteChange, loadUser) {
  const [signInEmail, setsignInEmail] = useState("");
  const [signInPassword, setsignInPassword] = useState("");

  const onEmailChange = (event) => {
    setsignInEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setsignInPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        }
      });
  };
  return (
    <div className="login">
      <Form className="shadow-5 pa3">
        <h2>SIGN IN</h2>
        <Form.Field>
          <label>Email</label>
          <input placeholder="Email" onChange={onEmailChange} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Password" onChange={onPasswordChange} />
        </Form.Field>

        <Button type="submit" onClick={onSubmitSignIn}>
          Sign In
        </Button>
      </Form>
    </div>
  );
}
