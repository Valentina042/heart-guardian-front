import React, { useState } from "react";
import "./Login.scss";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button } from "primereact/button";

export type LoginProps = {
  message?: string;
};

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const MySwal = withReactContent(Swal);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetch("https://heart-guardian-back.vercel.app//users/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.json();
        }
      })
      .then((data) => {
        localStorage.setItem('userStored', JSON.stringify(data));
        navigate("/home");
      })
      .catch((error) => {
        error.then((errorMessage: any) => {
          MySwal.fire({
            position: "center",
            icon: "error",
            title: errorMessage,
            showConfirmButton: true,
            timer: 2500,
          });
        });
      });
    //
  };

  const handleSignUp = (event: any) => {
    event.preventDefault();
    navigate("/signup");
  };

  return (
    <Card title="Heart Guardian" id="login-card">
      <div className="image-container">
        <img src="/login.png" alt="Your Image" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-content-center">
          <InputText
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="login-inputs"
            type="email"
          />
        </div>
        <div className="flex justify-content-center">
          <Password
            value={password}
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            feedback={false}
            className="login-inputs"
          />
        </div>
        <Button type="submit" label="Iniciar Sesion" className="login-inputs" />
      </form>
      <div className="flex justify-content-center">
        <Button
          label="Registrarse"
          onClick={handleSignUp}
          className="login-inputs"
        />
      </div>
    </Card>
  );
};

export default Login;
