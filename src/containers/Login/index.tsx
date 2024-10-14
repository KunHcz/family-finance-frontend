import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

export default function Login() {
  const { t } = useTranslation("login");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/dashboard");
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
            <input type="text" id="username" name="username" />
          </div>
          <div className="form_group">
            <label htmlFor="password">{t("password")}</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit">{t("login")}</button>
        </form>
      </div>
    </div>
  );
}
