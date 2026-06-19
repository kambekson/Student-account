import React, { FC, useState } from "react";
import { User, Bell, Menu } from "lucide-react";

import "./style.css";

import CalendarIcon from "@/shared/assets/icons/calendar.svg?react";
import logo from "@/shared/assets/images/logo.png";
import avatarPlaceholder from "@/shared/assets/images/avatar-placeholder.png";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { MenuItem } from "@/entities/Common";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/shared/ui/Switcher/LanguageSwitcher";

interface NavigationBarProps {
  selectedItemId?: string;
}

const NavigationBar: FC<NavigationBarProps> = ({ selectedItemId }) => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    {
      id: "profile",
      label: t("Мой профиль"),
      icon: <User className="text-[var(--color-accent)] w-6 h-6" />,
      path: "/me",
    },
    {
      id: "notifications",
      label: t("Уведомления"),
      icon: (
        <div className="relative">
          <Bell className="text-[var(--color-accent)] w-6 h-6" />
          {!!user?.notificationCount && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {user.notificationCount}
            </span>
          )}
        </div>
      ),
      path: "/notifications",
    },
    {
      id: "calendar",
      label: t("Календарь"),
      icon: <CalendarIcon />,
      path: "/calendar",
    },
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="main-grid" style={{ backgroundColor: "#FFFFFF" }}>
      <div></div>
      <div className="navigationBar relative">
        <div className="leftSection">
          <div className="logoContainer">
            <img src={logo} alt={t("Логотип")} className="logo" />
            <div className="schoolName">
              <span>
                <strong>EduSpace</strong>
                <br />
                {t("Школа программирования")}
              </span>
            </div>
          </div>
        </div>

        <div className="menu">
          {menuItems.map((item) => {
            const isSelected = item.id === selectedItemId;
            return (
              <div
                key={item.id}
                className={`menuItem ${isSelected ? "selected" : ""}`}
                onClick={() => handleItemClick(item.path)}
              >
                {item.icon && <span className="icon">{item.icon}</span>}
                <span>{item.label}</span>
              </div>
            );
          })}
          <LanguageSwitcher />
        </div>

        <div className="rightSection">
          <div
            className="userInfo"
            onClick={() => {
              navigate("/me");
            }}
          >
            <div className="avatar-container">
              <img
                src={user?.avatar ? user.avatar.url : avatarPlaceholder}
                alt={t("аватар")}
                className="avatar"
              />
            </div>
            <span className="user-name-wrapper">{`${user?.firstName} ${user?.lastName}`}</span>
          </div>
        </div>

        <div className="burger-button">
          <button
            onClick={() => setOpenMenu((prev) => !prev)}
            className="p-2 rounded-full hover:bg-black/5 transition-colors focus:outline-none"
          >
            <Menu className="w-8 h-8 text-gray-700" />
          </button>

          {openMenu && (
            <>
              <div
                className="fixed inset-0 z-[1999]"
                onClick={() => setOpenMenu(false)}
              />
              <div className="mobile-menu absolute right-4 top-16 bg-white border border-gray-200 shadow-lg rounded-xl p-2 flex flex-col z-[2000] w-48">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="menuItem flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-700 transition-colors"
                    onClick={() => {
                      handleItemClick(item.path);
                      setOpenMenu(false);
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
                <div className="border-t border-gray-100 my-2 pt-2 flex justify-center">
                  <LanguageSwitcher />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default NavigationBar;
