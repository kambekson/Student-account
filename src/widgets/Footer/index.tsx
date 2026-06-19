import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import "./style.css";

import { LuPhone } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { LiaTelegram } from "react-icons/lia";

import logo from "@/shared/assets/images/logo.png";
import info from "@/shared/assets/info/footer.json";

import { openInNewTab } from "@/shared/ui/utils";

const Footer: FC = () => {
  const handleLinkClick = (path: string) => {
    openInNewTab(path);
  };

  const { t } = useTranslation();

  return (
    <div
      className="main-grid "
      style={{ backgroundColor: "var(--color-background-2)" }}
    >
      <div></div>
      <div className="footer">
        <div className="info-column">
          <div className="logoContainer">
            <img src={logo} alt={t("Логотип")} className="footer-logo" />
            <div>
              <span>EduSpace - {t("Школа программирования и робототехники")}</span>
            </div>
          </div>
        </div>
        <div className="info-column">
          {info.addresses.map((address) => (
            <span>{t(address)}</span>
          ))}
          {info.phones.map((phone) => (
            <div className="phone">
              <span className="icon">
                <LuPhone size={24} color="var(--color-accent)" />
              </span>
              <span>{phone}</span>
            </div>
          ))}

          <div className="links">
            <FaWhatsapp
              size={24}
              color="var(--color-accent)"
              onClick={() => handleLinkClick(info.whatsapp)}
              style={{ cursor: "pointer" }}
            />
            <LiaTelegram
              size={24}
              color="var(--color-accent)"
              onClick={() => handleLinkClick(info.telegram)}
              style={{ cursor: "pointer" }}
            />
            <FaInstagram
              size={24}
              color="var(--color-accent)"
              onClick={() => handleLinkClick(info.instagram)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="info-column"></div>
      </div>
      <div></div>
    </div>
  );
};

export default Footer;
