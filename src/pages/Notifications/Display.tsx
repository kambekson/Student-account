import React from "react";
import {
  Notification,
  NotificationType,
} from "@/entities/Notification";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Badge,
} from "@mui/material";
import { Delete, Notifications } from "@mui/icons-material";
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
  onClick,
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
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: !notification.isRead ? "pointer" : undefined,
        backgroundColor: notification.isRead
          ? "var(--color-background)"
          : "rgba(253, 203, 4, 0.3)",
        borderLeft: `4px solid ${
          notification.isRead ? "var(--color-inactive)" : "var(--color-alert)"
        }`,
        mb: 1,
        "&:hover": {
          boxShadow: !notification.isRead ? 3 : 0,
        },
        color: "var(--color-text)",
        transition: "background-color 0.2s, border-color 0.2s",
      }}
      onClick={!notification.isRead ? (e) => handleMarkAsRead(e) : undefined}
    >
      <CardContent
        sx={{ display: "flex", alignItems: "center", flexGrow: 1, py: 1.5 }}
      >
        <Badge
          color="error"
          variant="dot"
          invisible={notification.isRead}
          sx={{
            mr: 2,
            "& .MuiBadge-dot": {
              backgroundColor: "var(--color-alert)",
            },
          }}
        >
          <Notifications sx={{ color: "var(--color-accent)" }} />
        </Badge>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={notification.isRead ? "normal" : "bold"}
            sx={{ color: "var(--color-text)" }}
          >
            {getNotificationText(notification, t)}
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--color-text-2)" }}>
            {format(new Date(notification.createdAt), "d MMMM yyyy, HH:mm", {
              locale: ru,
            })}
          </Typography>
        </Box>
      </CardContent>
      {(onEdit || onDelete) && (
        <Box sx={{ display: "flex", alignItems: "center", pr: 1 }}>
          {onDelete && (
            <IconButton
              onClick={handleDelete}
              title={t("Удалить уведомление")}
              sx={{ color: "var(--color-alert)" }}
            >
              <Delete fontSize="small" />
            </IconButton>
          )}
        </Box>
      )}
    </Card>
  );
};
