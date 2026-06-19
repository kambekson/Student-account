import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "@/shared/ui/Card";

import "./style.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { logout } from "@/entities/Auth";
import { useTranslation } from "react-i18next";

const ConfirmExitPage: React.FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = (): void => {
    dispatch(logout());
  };

  return (
    <>
      <div className="page">
        <div
          className="main-grid"
          style={{ backgroundColor: "var(--color-background)" }}
        >
          <div></div>
          <div className="exit-confirmation-page">
            <Card>
              <div className="exit-confirmation-container">
                <h2 className="regular">
                  {t("Вы дейсвительно хотите выйти из профиля")}?
                </h2>
                <div className="buttons-container">
                  <button
                    className="primary-button"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <span>{t("нет, вернуться назад")}</span>
                  </button>
                  <button
                    className="accent-2-button"
                    onClick={() => handleLogout()}
                  >
                    <span>{t("да, выйти")}</span>
                  </button>
                </div>
              </div>
            </Card>
            <div className="to-main-button-container">
              <button
                className="accent-button confirm-exit-button"
                onClick={() => {
                  navigate("/me");
                }}
              >
                <span>{t("На главную")}</span>
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ConfirmExitPage;
