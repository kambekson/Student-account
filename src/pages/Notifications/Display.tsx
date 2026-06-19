import React from "react";
import {
  Notification,
  NotificationType,
} from "@/entities/Notification";
import { Trash2, Bell } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { useTranslation } from "react-i18next";

interface NotificationDisplayProps {
  notification: Notification;
  onEdit?: (notification: Notification) => void;
  onClick?: (notification: Notification) => void;
  onDelete?: () => void;
}

const getNotificationText = (
  notification: Notification,
  t: (text: string) => string
): string => {
  switch (notification.type) {
    case NotificationType.LESSON_SUBSCRIPTION_EXPIRING: {
      const lessonsLeft = (notification.parameters as { lessonsLeft?: number })
        ?.lessonsLeft;

      if (lessonsLeft === 0) {
        return `${t("У вас закончился абонемент на занятия")}.`;
      } else if (lessonsLeft !== undefined) {
        return `${t("У вас заканчивается абонемент")}. ${t(
          "Осталось занятий"
        )}: ${lessonsLeft}`;
      } else {
        return `${t("У вас заканчивается абонемент")}.`;
      }
    }

    default:
      return `${t("У вас новое уведомление")}.`;
  }
};

export const NotificationDisplay: React.FC<NotificationDisplayProps> = ({
  notification,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(notification);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <div
      onClick={!notification.isRead ? (e) => handleMarkAsRead(e) : undefined}
      className={`flex items-center rounded-xl border p-4 mb-2 transition-all duration-200 ${
        !notification.isRead
          ? "cursor-pointer bg-[rgba(253,203,4,0.15)] hover:shadow-md border-amber-300"
          : "bg-[var(--color-background)] border-gray-200"
      }`}
      style={{
        borderLeft: `4px solid ${
          notification.isRead ? "var(--color-inactive)" : "var(--color-alert)"
        }`,
      }}
    >
      <div className="flex items-center flex-grow">
        <div className="relative mr-4 flex-shrink-0">
          <Bell className="w-5 h-5 text-[var(--color-accent)]" />
          {!notification.isRead && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[var(--color-alert)]"></span>
          )}
        </div>
        <div>
          <h4
            className={`text-sm ${
              notification.isRead ? "font-normal" : "font-semibold"
            } text-[var(--color-text)]`}
          >
            {getNotificationText(notification, t)}
          </h4>
          <p className="text-xs text-[var(--color-text-2)] mt-1">
            {format(new Date(notification.createdAt), "d MMMM yyyy, HH:mm", {
              locale: ru,
            })}
          </p>
        </div>
      </div>
      {onDelete && (
        <div className="flex items-center pl-2">
          <button
            onClick={handleDelete}
            title={t("Удалить уведомление")}
            className="p-1.5 rounded-full hover:bg-black/5 text-[var(--color-alert)] transition-colors focus:outline-none"
          >
            <Trash2 className="w-4.5 h-4.5" />
          </button>
        </div>
      )}
    </div>
  );
};
