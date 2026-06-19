import { BaseFilter, UUID } from "@/entities/Common";

export interface Notification {
  id: UUID;
  createdAt: Date;
  isRead: boolean;
  parameters?: NotificationParametersLessonSubscriptionExpiring;
  type: NotificationType;
}

export enum NotificationType {
  LESSON_SUBSCRIPTION_EXPIRING = "lessonSubscriptionExpiring",
}

export interface NotificationParametersLessonSubscriptionExpiring {
  lessonsLeft: number;
}

export interface NotificationFilter extends BaseFilter {
  isRead?: boolean;
}
