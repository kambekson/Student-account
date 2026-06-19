import { Components } from "types/openapi";
import BaseMapper from ".";
import {
  Notification,
  NotificationParametersLessonSubscriptionExpiring,
  NotificationType,
} from "@/Common/Entity/Base/Notification";

export class NotificationMapper {
  static toNotification(
    apiResponse: Components.Schemas.Notification
  ): Notification {
    return {
      id: apiResponse.id,
      createdAt: BaseMapper.toDate(apiResponse.createdAt) as Date,
      isRead: apiResponse.isRead,
      parameters: apiResponse.parameters
        ? NotificationMapper.toNotificationParametersLessonSubscriptionExpiring(
            apiResponse.parameters
          )
        : undefined,
      type: NotificationMapper.toNotificationType(apiResponse.type),
    };
  }

  static toNotificationParametersLessonSubscriptionExpiring(
    apiResponse: Components.Schemas.NotificationParametersLessonSubscriptionExpiring
  ): NotificationParametersLessonSubscriptionExpiring {
    return {
      lessonsLeft: apiResponse.lessonsLeft,
    };
  }

  static toNotificationType(
    apiResponse: Components.Schemas.NotificationType
  ): NotificationType {
    const typeMap: Record<
      Components.Schemas.NotificationType,
      NotificationType
    > = {
      lessonSubscriptionExpiring: NotificationType.LESSON_SUBSCRIPTION_EXPIRING,
    };

    const mappedType = typeMap[apiResponse];
    if (!mappedType) {
      throw new Error(`Unknown notification type: ${apiResponse}`);
    }
    return mappedType;
  }
}
