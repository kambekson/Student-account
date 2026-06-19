import { getClient } from "..";
import { Pagination } from "@/Common/Entity/Pagination";
import BaseMapper from "../mappers";
import { Paths } from "types/openapi";
import { UUID } from "@/Common/Entity/Base/Common";
import { NotificationMapper } from "../mappers/notification";
import {
  Notification,
  NotificationFilter,
} from "@/Common/Entity/Base/Notification";

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
