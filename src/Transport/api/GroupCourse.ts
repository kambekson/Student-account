import { getClient } from "..";
import {
  GroupCourse,
  GroupCourseFilter,
} from "@/Common/Entity/Base/GroupCourse";
import { Pagination } from "@/Common/Entity/Pagination";
import { Components, Paths } from "types/openapi";
import { GroupCourseMapper } from "../mappers/groupCourses";
import BaseMapper from "../mappers";
import { UUID } from "@/Common/Entity/Base/Common";

export default class GroupCourseAPI {
  static async fetchGroupCourses(
    filter: GroupCourseFilter
  ): Promise<Pagination<GroupCourse>> {
    const client = await getClient();
    const response = await client.getGroupCourses(filter);

    return BaseMapper.paginationFromApi(
      response.data as Paths.GetGroupCourses.Responses.$200,
      GroupCourseMapper.toGroupCourse
    );
  }

  static async fetchGroupCourseById(id: UUID): Promise<GroupCourse> {
    const client = await getClient();
    const response = await client.getGroupCourse(id);

    return GroupCourseMapper.toGroupCourse(
      response.data as Components.Schemas.GroupCourse
    );
  }
}
