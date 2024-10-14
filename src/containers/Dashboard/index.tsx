import React from "react";
import { useTranslation } from "react-i18next";
import "./Dashboard.scss";

export default function Dashboard() {
  const { t } = useTranslation("dashboard");

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>{t("welcome")}</h1>
      </header>
      <main className="dashboard-main">
        <section className="dashboard-section">
          <h2>{t("section1.title")}</h2>
          <p>{t("section1.content")}</p>
        </section>
        <section className="dashboard-section">
          <h2>{t("section2.title")}</h2>
          <p>{t("section2.content")}</p>
        </section>
      </main>
    </div>
  );
}
