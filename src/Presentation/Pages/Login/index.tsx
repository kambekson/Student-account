import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginAndFetchUserAsync } from "../../../Domain/Slice/Auth";
import { RootState, AppDispatch } from "../../../store";
import { addSubDomainToUrl, getSubdomain } from "../../../Common/utils";

import { hasRole, User, UserRole } from "../../../Common/Entity/Base/User";
import logoImage from "@/assets/images/logo.png";
import "@/Presentation/Styles/authorization.scss";
import { CircularProgress } from "@mui/material";
import { MODE, REDIRECT_URL } from "../../../Transport";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/Presentation/Components/Switcher/LanguageSwitcher";
import SchoolAPI from "@/Transport/api/School";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, isAuthloading } = useSelector(
    (state: RootState) => state.auth
  );

  const { t, i18n } = useTranslation();

  const user = useSelector((state: RootState) => state.auth.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const domain = getSubdomain();

  const handleRedirectToCrm = async (redirectedUser: User) => {
    let subDomain = getSubdomain();

    if (hasRole([UserRole.ADMIN, UserRole.DIRECTOR], redirectedUser.roles)) {
      let directorId;
      if (hasRole([UserRole.DIRECTOR], redirectedUser.roles))
        directorId = redirectedUser.id;

      if (subDomain === "school") {
        const schools = await SchoolAPI.fetchSchools({
          page: 1,
          pageSize: 1,
          directorId,
        });
        subDomain = schools.items[0].domain;
      }
    }
    if (MODE !== "development")
      window.location.replace(addSubDomainToUrl(REDIRECT_URL, subDomain));
  };

  const handleRedirectToRegister = async () => {
    window.location.replace(
      `${addSubDomainToUrl(REDIRECT_URL, "school")}/register`
    );
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      if (hasRole([UserRole.CLIENT], user?.roles)) {
        navigate("/me");
      } else {
        handleRedirectToCrm(user);
      }
    }
  }, [isAuthenticated, navigate, user]);

  const handleLogin = async () => {
    setError(null);
    const domain = getSubdomain();
    const result = await dispatch(
      loginAndFetchUserAsync({ username, password, domain: domain || "" })
    );
    if (loginAndFetchUserAsync.fulfilled.match(result)) {
      if (hasRole([UserRole.CLIENT], result.payload?.user.roles)) {
        if (i18n.language !== result.payload.user?.language) {
          i18n.changeLanguage(result.payload?.user.language);
        }
        navigate("/me");
      } else {
        handleRedirectToCrm(result.payload?.user);
      }
    } else {
      setError(
        `${t("Неверный логин, пароль или поддомен")}. ${t(
          "Попробуйте еще раз"
        )}`
      );
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-left-panel">
        <div className="login-left-content">
          <img src={logoImage} alt="EduSpace Logo" className="login-brand-logo" />
          <h1 className="login-brand-title">EduSpace</h1>
          <p className="login-brand-subtitle">
            {t("Универсальная образовательная платформа для обучения и управления учебными центрами.")}
          </p>
        </div>
      </div>

      <div className="login-right-panel">
        <div className="login-language-container">
          <LanguageSwitcher />
        </div>

        <div className="login-form-container">
          <h2 className="login-form-title">{t("Вход в личный кабинет")}</h2>

          <div className={`login-input-group ${error ? "has-error" : ""}`}>
            <label htmlFor="username">{t("Логин")}</label>
            <div className="login-input-wrapper">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("Введите ваш логин")}
              />
            </div>
          </div>

          <div className={`login-input-group ${error ? "has-error" : ""}`}>
            <label htmlFor="password">{t("Пароль")}</label>
            <div className="login-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("Введите ваш пароль")}
              />
              <button
                type="button"
                className="login-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error && <span className="login-error-text">{error}</span>}
          </div>

          <div className="login-actions-group">
            {isAuthloading ? (
              <center>
                <CircularProgress color="primary" />
              </center>
            ) : (
              <button onClick={handleLogin} className="login-submit-button">
                <span>{t("Войти")}</span>
              </button>
            )}
          </div>

          <div className="login-links-group">
            <button
              type="button"
              className="login-link-btn"
              onClick={() => navigate("/recovery-password")}
            >
              {t("Забыли пароль")}?
            </button>

            {domain === "school" && (
              <button
                type="button"
                className="login-link-btn primary"
                onClick={handleRedirectToRegister}
              >
                {t("Зарегистрировать школу")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
