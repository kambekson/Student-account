import {
  ScheduledAssignment,
  ScheduledAssignmentFilter,
} from "@/Common/Entity/Base/ScheduledAssignment";
import { Pagination } from "@/Common/Entity/Pagination";
import { getClient } from "..";
import { Components, Paths } from "types/openapi";
import BaseMapper from "../mappers";
import { ScheduledAssignmentMapper } from "../mappers/scheduledAssignment";
import { UUID } from "@/Common/Entity/Base/Common";

export default class ScheduledAssignmentAPI {
  static async fetchScheduledAssignments(
    filter: ScheduledAssignmentFilter
  ): Promise<Pagination<ScheduledAssignment>> {
    const client = await getClient();
    const response = await client.getScheduledAssignments(filter);

    return BaseMapper.paginationFromApi(
      response.data as Paths.GetScheduledAssignments.Responses.$200,
      ScheduledAssignmentMapper.toScheduledAssignment
    );
  }

  static async fetchScheduledAssignmentById(
    id: UUID
  ): Promise<ScheduledAssignment> {
    const client = await getClient();
    const response = await client.getScheduledAssignment(id);

    return ScheduledAssignmentMapper.toScheduledAssignment(
      response.data as Components.Schemas.ScheduledAssignment
    );
  }
}
