import { getClient } from "..";
import { Pagination } from "@/Common/Entity/Pagination";
import BaseMapper from "../mappers";
import { Components, Paths } from "types/openapi";
import { UUID } from "@/Common/Entity/Base/Common";
import { GroupCourseMapper } from "../mappers/groupCourses";
import { Group, GroupFilter } from "@/Common/Entity/Base/GroupCourse";

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
