import React, { useRef, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { observer } from "mobx-react-lite";
import useDispatch from "../../../hooks/useDispatch";
import MyInput from "../../IU/input/MyInput";

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userData } = useDispatch();
  const ref = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        alert("Авторизация прошла успешно");
        userData({
          id: user.uid,
          email: user.email,
          accessToken: user.accessToken,
        });
      })
      .catch((err) => {
        alert("Пользователь не найден");
        ref.current.innerText = `Длина пароля должна быть не менее 6 символов!!!`;
        ref.current.style.color = "red";
      });
  };

  return (
    <div className="sign_in">
      <h1 className="mb-3">Вход на сайт</h1>
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
        <h5 ref={ref}></h5>
        <div className="d-flex justify-content-around  align-items-center">
          <Button type="submit" className="py-2 mx-2">
            Авторизоваться
          </Button>
          <Link to="/signup">Регистрация</Link>
        </div>
      </form>
    </div>
  );
});

export default Login;
