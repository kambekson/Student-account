import { FC } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Notification } from "@/Common/Entity/Base/Notification";
import { UUID } from "@/Common/Entity/Base/Common";
import { NotificationsList } from "./List";
import { useTranslation } from "react-i18next";

interface NotificationsContentProps {
  notifications: Notification[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  loaderRef: React.RefObject<HTMLDivElement>;
  onEdit: (notification: Notification) => void;
  onDelete: (notificationId: UUID) => void;
  onClick?: (notification: Notification) => void;
}

export const NotificationsContent: FC<NotificationsContentProps> = ({
  notifications,
  hasNextPage,
  isFetchingNextPage,
  loaderRef,
  onEdit,
  onDelete,
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <NotificationsList
        notifications={notifications}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={onClick}
      />

      {hasNextPage && (
        <Box ref={loaderRef} display="flex" justifyContent="center" py={2}>
          {isFetchingNextPage ? (
            <div className="loading-overlay">
              <CircularProgress color="primary" size={60} />
            </div>
          ) : (
            <Typography variant="body2" color="textSecondary">
              {t("Прокрутите вниз для загрузки")}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};
