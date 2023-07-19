import { React, useState } from "react";

import { Button, Checkbox, Form } from "semantic-ui-react";

export default function Register(onRouteChange, loadUser) {
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

  const onSubmitRegister = () => {
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
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
      <h2>REGISTER</h2>
      <Form className="shadow-5 pa3">
        <Form.Field>
          <label>Name</label>
          <input placeholder="Name" onChange={onNameChange} />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input placeholder="Email" onChange={onEmailChange} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Password" onChange={onPasswordChange} />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button type="submit" onClick={onSubmitRegister}>
          Register
        </Button>
      </Form>
    </div>
  );
}
