import React, { useState } from "react";
import { Plus, Pencil, Check, X } from "lucide-react";

import Card from "@/shared/ui/Card";
import avatarPlaceholder from "@/shared/assets/images/avatar-placeholder.png";
import { CoinBalance } from "./CoinBalance";
import { User, UserStudent, UserUpdate } from "@/entities/User";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

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
        <div className="loading-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent-2)]"></div>
        </div>
      )}
      <Card
        className="accent-2-border"
        style={{ gap: "30px", position: "relative" }}
      >
        <div className="flex justify-center">
          <div className="relative inline-block cursor-pointer">
            <img
              src={user?.avatar ? user.avatar.url : avatarPlaceholder}
              alt={t("аватар")}
              className="avatar personal-page w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0">
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
              <span className="w-7 h-7 bg-[var(--color-accent)] hover:bg-amber-400 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md transition-colors">
                <Plus className="w-4 h-4 text-black" />
              </span>
            </label>
          </div>
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-2.5 items-center w-full max-w-xs mx-auto">
            <div className="w-full flex flex-col gap-2">
              <Input
                type="text"
                placeholder={t("Имя")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-10"
              />
              <Input
                type="text"
                placeholder={t("Фамилия")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-10"
              />
            </div>
            {error && (
              <span className="text-sm text-[var(--color-alert)]">
                {error}
              </span>
            )}
            <div className="flex gap-2.5">
              <button
                onClick={handleSave}
                title={t("Сохранить")}
                className="p-2 text-[var(--color-good)] hover:bg-green-50 rounded-full transition-colors focus:outline-none"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={handleCancel}
                title={t("Отмена")}
                className="p-2 text-[var(--color-alert)] hover:bg-red-50 rounded-full transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <h1 className="m-0 text-2xl font-bold text-[var(--color-text)]">
              {`${user?.firstName} ${user?.lastName}`}
            </h1>
            <button
              onClick={() => setIsEditing(true)}
              title={t("Редактировать")}
              className="p-1 text-[var(--color-text-2)] hover:text-[var(--color-accent)] rounded-full transition-colors focus:outline-none mt-0.5"
            >
              <Pencil className="w-4.5 h-4.5" />
            </button>
          </div>
        )}

        <CoinBalance
          totalPoints={userStudent?.totalPoints || 0}
          onBalanceClick={handleOnBalanceClick}
          showShopButton={false}
        />
        <div className="flex justify-center">
          <span className="text-button" onClick={handleLogout}>
            {t("Выйти из профиля")}
          </span>
        </div>
      </Card>
    </>
  );
};
