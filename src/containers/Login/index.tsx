import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../store";
import "./Login.scss";
import { loginUser } from "../../store/slices/user";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { t } = useTranslation("login");
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof store.dispatch>();
  const userState = useSelector((state: RootState) => state.user);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ username, password })).then((action) => {
      if (loginUser.fulfilled.match(action)) {
        navigate("/dashboard");
      }
    });
  };

  return (
    <div className="container">
      <div className="logo">
        <h1>{t("project")}</h1>
        <p>{t("description")}</p>
      </div>
      <div className="login_container">
        <h1>{t("title")}</h1>
        <form onSubmit={handleLogin}>
          <div className="form_group">
            <label htmlFor="username">{t("username")}</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form_group">
            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">{t("login")}</button>
        </form>
        {userState.status === "failed" && (
          <div className="error">{userState.error}</div>
        )}
        {userState.status === "loading" && (
          <div className="loading">Loading...</div>
        )}
      </div>
    </div>
  );
}
