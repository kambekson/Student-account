import { Notification } from "@/entities/Notification";
import { UUID } from "@/entities/Common";
import { NotificationDisplay } from "./Display";

interface NotificationsListProps {
  notifications: Notification[];
  onEdit?: (notification: Notification) => void;
  onDelete?: (notificationId: UUID) => void;
  onClick?: (notification: Notification) => void;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onEdit,
  onDelete,
  onClick,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {notifications.map((notification) => (
        <NotificationDisplay
          key={notification.id}
          notification={notification}
          onEdit={onEdit ? (notification) => onEdit(notification) : undefined}
          onDelete={onDelete ? () => onDelete(notification.id) : undefined}
          onClick={
            onClick ? (notification) => onClick(notification) : undefined
          }
        />
      ))}
    </div>
  );
};
