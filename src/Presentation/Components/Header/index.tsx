import React, { FC, useRef, useState } from "react";

import "@/Presentation/Styles/navigationBar.scss";

import CalendarIcon from "@/assets/icons/calendar.svg?react";

import logo from "@/assets/images/logo.png";
import avatarPlaceholder from "@/assets/images/avatar-placeholder.png";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { MenuItem } from "../../../Common/Entity/Visual/menuItem";
import { PersonOutline, NotificationsNone } from "@mui/icons-material";
import { Badge, ClickAwayListener, Paper, Popper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../Switcher/LanguageSwitcher";

interface NavigationBarProps {
  selectedItemId?: string;
}

const NavigationBar: FC<NavigationBarProps> = ({ selectedItemId }) => {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);

  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    {
      id: "profile",
      label: t("Мой профиль"),
      icon: (
        <PersonOutline
          sx={{ color: "var(--color-accent)", width: 24, height: 24 }}
        />
      ),
      path: "/me",
    },
    {
      id: "notifications",
      label: t("Уведомления"),
      icon: (
        <Badge
          badgeContent={user?.notificationCount || 0}
          color="error"
          invisible={!user?.notificationCount}
          overlap="circular"
        >
          <NotificationsNone
            sx={{ color: "var(--color-accent)", width: 24, height: 24 }}
          />
        </Badge>
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
      <div className="navigationBar">
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
          <IconButton
            ref={anchorRef}
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            <MenuIcon sx={{ fontSize: 32 }} />
          </IconButton>

          <Popper
            open={openMenu}
            anchorEl={anchorRef.current}
            placement="bottom-end"
            modifiers={[{ name: "zIndex" }]}
            sx={{ zIndex: 2000 }}
          >
            <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
              <Paper className="mobile-menu" sx={{ zIndex: 2000 }}>
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="menuItem"
                    onClick={() => {
                      handleItemClick(item.path);
                      setOpenMenu(false);
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
                <center style={{ marginTop: "10px" }}>
                  <LanguageSwitcher />
                </center>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default NavigationBar;
