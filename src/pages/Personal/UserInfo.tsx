import React, { useState } from "react";
import {
  Badge,
  IconButton,
  CircularProgress,
  TextField,
  Tooltip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import Card from "@/shared/ui/Card";
import avatarPlaceholder from "@/shared/assets/images/avatar-placeholder.png";
import { CoinBalance } from "./CoinBalance";
import { User, UserStudent, UserUpdate } from "@/entities/User";
import {
  inputLabelStyle,
  outlinedInputStyle,
} from "@/shared/ui/utils/muiInputs";
import { useTranslation } from "react-i18next";

interface UserInfoProps {
  user: User | null;
  userStudent?: UserStudent;
  isUpdatingAvatar: boolean;
  handleLogout: () => void;
  handleAvatarUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateUser: (userUpdate: UserUpdate) => Promise<void>;
  handleOnBalanceClick: () => void;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  user,
  userStudent,
  isUpdatingAvatar,
  handleLogout,
  handleAvatarUpload,
  handleUpdateUser,
  handleOnBalanceClick,
}) => {
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError(t("Имя и фамилия не могут быть пустыми"));
      return;
    }

    setError("");
    await handleUpdateUser({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
  };

  return (
    <>
      {isUpdatingAvatar && (
        <div className="loading-overlay">
          <CircularProgress color="primary" size={60} />
        </div>
      )}
      <Card
        className="accent-2-border"
        style={{ gap: "30px", position: "relative" }}
      >
        <center>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            sx={{ cursor: "pointer" }}
            badgeContent={
              <label htmlFor="avatar-upload">
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAvatarUpload}
                />
                <IconButton
                  component="span"
                  sx={{
                    bgcolor: "var(--color-accent)",
                    color: "white",
                    width: "28px",
                    height: "28px",
                    "&:hover": { bgcolor: "var(--color-accent-dark)" },
                  }}
                >
                  <AddIcon sx={{ fontSize: "18px", color: "black" }} />
                </IconButton>
              </label>
            }
          >
            <img
              src={user?.avatar ? user.avatar.url : avatarPlaceholder}
              alt={t("аватар")}
              className="avatar personal-page"
            />
          </Badge>
        </center>

        {isEditing ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <TextField
              size="small"
              label={t("Имя")}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={outlinedInputStyle()}
              slotProps={{
                input: { sx: outlinedInputStyle() },
                inputLabel: { sx: inputLabelStyle() },
              }}
            />

            <TextField
              size="small"
              label={t("Фамилия")}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={outlinedInputStyle()}
              slotProps={{
                input: { sx: outlinedInputStyle() },
                inputLabel: { sx: inputLabelStyle() },
              }}
            />
            {error && (
              <span style={{ color: "var(--color-alert)", fontSize: "14px" }}>
                {error}
              </span>
            )}
            <div style={{ display: "flex", gap: "10px" }}>
              <Tooltip title={t("Сохранить")}>
                <IconButton
                  onClick={handleSave}
                  sx={{ color: "var(--color-good)" }}
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("Отмена")}>
                <IconButton
                  onClick={handleCancel}
                  sx={{ color: "var(--color-alert)" }}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <h1 style={{ margin: 0, color: "var(--color-text)" }}>
              {`${user?.firstName} ${user?.lastName}`}
            </h1>
            <Tooltip title={t("Редактировать")}>
              <IconButton
                size="small"
                onClick={() => setIsEditing(true)}
                sx={{
                  padding: 0,
                  marginTop: "2px",
                  color: "var(--color-text-2)",
                  "&:hover": {
                    color: "var(--color-accent)",
                  },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        )}

        <CoinBalance
          totalPoints={userStudent?.totalPoints || 0}
          onBalanceClick={handleOnBalanceClick}
          showShopButton={false}
        />
        <center>
          <span className="text-button" onClick={handleLogout}>
            {t("Выйти из профиля")}
          </span>
        </center>
      </Card>
    </>
  );
};
