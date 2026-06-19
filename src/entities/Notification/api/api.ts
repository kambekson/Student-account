import { getClient } from "@/shared/api/base";
import { Pagination } from "@/entities/Common";
import BaseMapper from "@/entities/Common/api/mapper";
import { Paths } from "types/openapi";
import { UUID } from "@/entities/Common";
import { NotificationMapper } from "@/entities/Notification/api/mapper";
import {
  Notification,
  NotificationFilter,
} from "@/entities/Notification";

export default class NotificationAPI {
  static async fetchNotifications(
    fitler: NotificationFilter
  ): Promise<Pagination<Notification>> {
    const client = await getClient();
    const response = await client.getNotifications(fitler);

    return BaseMapper.paginationFromApi(
      response.data as Paths.GetNotifications.Responses.$200,
      NotificationMapper.toNotification
    );
  }

  static async deleteNotification(id: UUID): Promise<void> {
    const client = await getClient();
    await client.deleteNotification(id);
  }

  static async readNotification(id: UUID): Promise<void> {
    const client = await getClient();
    await client.readNotification(id);
  }
}
