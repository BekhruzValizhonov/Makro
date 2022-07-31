import React, { useState } from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";

import useDispatch from "../../../hooks/useDispatch";
import MyInput from "../../IU/input/MyInput";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { userData } = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        navigate("/");
        alert("Вы успешно зарегистрировались");
        userData({
          id: user.uid,
          email: user.email,
          accessToken: user.accessToken,
        });
      })
      .catch((err) => {
        alert("Пользователь не найден");
      });
  };

  return (
    <div className="sign_in">
      <h3>Регистрация в интернет-магазине</h3>
      <form onSubmit={handleSubmit} className="w-50">
        <MyInput
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <MyInput
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="d-flex justify-content-around  align-items-center">
          <Button type="submit" className="py-2 mx-2">
            Зарегистрироваться
          </Button>
          <Link to="/login">Войти</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
