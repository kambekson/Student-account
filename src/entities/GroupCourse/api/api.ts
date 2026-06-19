import { getClient } from "@/shared/api/base";
import {
  GroupCourse,
  GroupCourseFilter,
} from "@/entities/GroupCourse";
import { Pagination } from "@/entities/Common";
import { Components, Paths } from "types/openapi";
import { GroupCourseMapper } from "@/entities/GroupCourse/api/mapper";
import BaseMapper from "@/entities/Common/api/mapper";
import { UUID } from "@/entities/Common";

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
