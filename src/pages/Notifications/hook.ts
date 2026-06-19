import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UUID } from "@/entities/Common";
import { InformationSystemError } from "@/entities/Common";
import { subcodeMap } from "@/entities/Common";
import { notifyError } from "@/shared/ui/Toasts/options";
import {
  Notification,
  NotificationFilter,
} from "@/entities/Notification";
import { useInfiniteList } from "@/shared/lib/hooks/InfiniteList";
import { NotificationAPI } from "@/entities/Notification";
import { useTranslation } from "react-i18next";

const defaultQueryKey = "notifications";

interface UseNotificationsOptions {
  notificationFilter?: NotificationFilter;
  enabled?: boolean;
}

export function useNotifications({
  notificationFilter = { page: 1, pageSize: 10 },
  enabled = true,
}: UseNotificationsOptions) {
  const queryClient = useQueryClient();
  const queryKey = [defaultQueryKey];

  const { t } = useTranslation();

  const {
    items: notifications,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    loaderRef,
    refetch,
    totalItems,
  } = useInfiniteList<Notification, NotificationFilter>({
    queryKey: [...queryKey, notificationFilter],
    fetchFn: NotificationAPI.fetchNotifications,
    filter: { ...notificationFilter },
    enabled,
  });

  const readNotificationMutation = useMutation({
    mutationFn: async (notificationId: UUID) => {
      return await NotificationAPI.readNotification(notificationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error: InformationSystemError) => {
      notifyError(
        `${t("Не удалось отметить уведомление как прочитанное")}.`,
        `${t("Ошибка")}: ${
          error.subcode ? t(subcodeMap[error.subcode]) : error.message
        }`
      );
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: async (notificationId: UUID) => {
      return await NotificationAPI.deleteNotification(notificationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error: InformationSystemError) => {
      notifyError(
        `${t("Не удалось удалить уведомление")}.`,
        `${t("Ошибка")}: ${
          error.subcode ? t(subcodeMap[error.subcode]) : error.message
        }`
      );
    },
  });

  return {
    notifications,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    totalItems,
    loaderRef,
    refetch,
    deleteNotification: deleteNotificationMutation.mutateAsync,
    isDeleting: deleteNotificationMutation.isPending,
    readNotification: readNotificationMutation.mutateAsync,
    isReading: readNotificationMutation.isPending,
  };
}
