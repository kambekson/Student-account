import { Components } from "types/openapi";
import BaseMapper from "@/entities/Common/api/mapper";
import {
  Course,
  Group,
  GroupCourse,
} from "@/entities/GroupCourse";
import { UserMapper } from "@/entities/User/api/mapper";
import { PointMapper } from "@/entities/PointWallet/api/pointMapper";

export class GroupCourseMapper {
  static toGroup(apiResponse: Components.Schemas.Group): Group {
    return {
      id: apiResponse.id,
      name: apiResponse.name,
      description: apiResponse.description,
      schoolId: apiResponse.schoolId,
      branchId: apiResponse.branchId,
      pointType:
        apiResponse.pointType && PointMapper.toPointType(apiResponse.pointType),
    };
  }

  static toCourse(apiResponse: Components.Schemas.Course): Course {
    return {
      id: apiResponse.id,
      name: apiResponse.name,
      description: apiResponse.description,
      schoolId: apiResponse.schoolId,
    };
  }

  static toGroupCourse(
    apiResponse: Components.Schemas.GroupCourse
  ): GroupCourse {
    return {
      id: apiResponse.id,
      course: GroupCourseMapper.toCourse(apiResponse.course),
      groupId: apiResponse.groupId,
      schoolId: apiResponse.schoolId,
      teacher: UserMapper.toUser(apiResponse.teacher),
      completedAt: BaseMapper.toDate(apiResponse.completedAt),
    };
  }
}
