import { getClient } from "@/shared/api/base";
import { Pagination } from "@/entities/Common";
import BaseMapper from "@/entities/Common/api/mapper";
import { Components, Paths } from "types/openapi";
import { UUID } from "@/entities/Common";
import { GroupCourseMapper } from "@/entities/GroupCourse/api/mapper";
import { Group, GroupFilter } from "@/entities/GroupCourse";

export default class GroupAPI {
  static async fetchGroups(fitler: GroupFilter): Promise<Pagination<Group>> {
    const client = await getClient();
    const response = await client.getGroups(fitler);

    return BaseMapper.paginationFromApi(
      response.data as Paths.GetGroups.Responses.$200,
      GroupCourseMapper.toGroup
    );
  }

  static async fetchGroupById(id: UUID): Promise<Group> {
    const client = await getClient();
    const response = await client.getGroup(id);

    return GroupCourseMapper.toGroup(response.data as Components.Schemas.Group);
  }
}
