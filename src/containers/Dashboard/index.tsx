import React, { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Dashboard/Sidebar";
import "./Dashboard.scss";

const FamilyManage = lazy(() => import("../FamilyManage"));
const IncomeExpenseManage = lazy(() => import("../IncomeExpenseManage"));
const IncomeExpenseOverview = lazy(() => import("../IncomeExpenseOverview"));

export default function Dashboard() {
  const { t, i18n } = useTranslation("dashboard");
  const user = useSelector((state: any) => state.user);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>{t("title")}</h1>
          <div className="language-switcher">
            <button
              onClick={() => changeLanguage("en")}
              className={i18n.language === "en" ? "active" : ""}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage("zh")}
              className={i18n.language === "zh" ? "active" : ""}
            >
              中文
            </button>
          </div>
        </header>
        <main className="dashboard-main">
          <Suspense
            fallback={<div className="suspense-fallback">Loading...</div>}
          >
            <Routes>
              {user.user?.username === "admin" && (
                <>
                  <Route path="/family-manage" element={<FamilyManage />} />
                  <Route
                    path="/income-expense-manage"
                    element={<IncomeExpenseManage />}
                  />
                </>
              )}
              <Route
                path="/income-expense-overview"
                element={<IncomeExpenseOverview />}
              />
              <Route
                path="/"
                element={<Navigate to="/dashboard/income-expense-overview" />}
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
