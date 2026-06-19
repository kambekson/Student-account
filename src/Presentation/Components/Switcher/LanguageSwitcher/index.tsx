import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";
import { Language } from "@/Common/Entity/Base/Common";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setUser } from "@/Domain/Slice/Auth";
import UserAPI from "@/Transport/api/User";
import { CircularProgress } from "@mui/material";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language as Language;

  const dispatch = useDispatch<AppDispatch>();

  const [isUpdating, setIsUpdating] = useState(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const languages = Object.entries(Language);

  const handleChange = async (lang: Language) => {
    setIsUpdating(true);
    i18n.changeLanguage(lang);

    if (isAuthenticated) {
      const updatesUser = await UserAPI.updateUser(user!.id, {
        language: lang,
      });
      dispatch(setUser(updatesUser));
    }
    setIsUpdating(false);
  };

  if (isUpdating) return <CircularProgress color="primary" size={40} />;

  return (
    <div className="lang-switcher">
      {languages.map(([label, code], index) => {
        const isActive = currentLang === code;
        const isFirst = index === 0;
        const isLast = index === languages.length - 1;

        return (
          <button
            key={code}
            className={`lang-btn ${isActive ? "active" : ""} ${
              isFirst ? "left-rounded" : isLast ? "right-rounded" : ""
            } `}
            onClick={() => handleChange(code as Language)}
          >
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
