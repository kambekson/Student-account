import {
  ScheduledAssignment,
  ScheduledAssignmentFilter,
} from "@/entities/ScheduledAssignment";
import { Pagination } from "@/entities/Common";
import { getClient } from "@/shared/api/base";
import { Components, Paths } from "types/openapi";
import BaseMapper from "@/entities/Common/api/mapper";
import { ScheduledAssignmentMapper } from "@/entities/ScheduledAssignment/api/mapper";
import { UUID } from "@/entities/Common";

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
