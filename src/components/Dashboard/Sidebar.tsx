import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "./Sidebar.scss";

export default function Sidebar() {
  const { t } = useTranslation("dashboard");
  const user = useSelector((state: any) => state.user);
  return (
    <nav className="sidebar">
      <ul>
        {user.user?.username === "admin" && (
          <>
            <li>
              <Link to="/dashboard/family-manage">{t("family-manage")}</Link>
            </li>
            <li>
              <Link to="/dashboard/income-expense-manage">
                {t("income-expense-manage")}
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="/dashboard/income-expense-overview">
            {t("income-expense-overview")}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
