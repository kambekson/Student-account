import { FC } from "react";
import { Notification } from "@/entities/Notification";
import { UUID } from "@/entities/Common";
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
        <div ref={loaderRef} className="flex justify-center py-4">
          {isFetchingNextPage ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent-2)]"></div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              {t("Прокрутите вниз для загрузки")}
            </p>
          )}
        </div>
      )}
    </>
  );
};
