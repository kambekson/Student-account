import { Components } from "types/openapi";
import {
  MiniUser,
  User,
  UserRole,
  UserStudent,
} from "@/entities/User";
import BaseMapper from "@/entities/Common/api/mapper";
import { PointMapper } from "@/entities/PointWallet/api/pointMapper";

export class UserMapper {
  static toUserRole(apiResponse: Components.Schemas.UserRole): UserRole {
    const roleMap: Record<Components.Schemas.UserRole, UserRole> = {
      admin: UserRole.ADMIN,
      director: UserRole.DIRECTOR,
      manager: UserRole.MANAGER,
      methodist: UserRole.METHODIST,
      teacher: UserRole.TEACHER,
      client: UserRole.CLIENT,
    };

    const mappedRole = roleMap[apiResponse];
    if (!mappedRole) {
      throw new Error(`Unknown user role: ${apiResponse}`);
    }
    return mappedRole;
  }

  static toMiniUser(apiResponse: Components.Schemas.MiniUser): MiniUser {
    return {
      id: apiResponse.id,
      username: apiResponse.username,
      firstName: apiResponse.firstName,
      lastName: apiResponse.lastName,
      avatar:
        apiResponse.avatar && BaseMapper.toServiceFile(apiResponse.avatar),
      schoolId: apiResponse.schoolId,
    };
  }

  static toUser(apiResponse: Components.Schemas.User): User {
    return {
      id: apiResponse.id,
      clientId: apiResponse.clientId,
      username: apiResponse.username,
      description: apiResponse.description,
      firstName: apiResponse.firstName,
      lastName: apiResponse.lastName,
      roles: apiResponse.roles.map(UserMapper.toUserRole),
      avatar:
        apiResponse.avatar && BaseMapper.toServiceFile(apiResponse.avatar),
      schoolId: apiResponse.schoolId,
      notificationCount: apiResponse.notificationCount,
      language: BaseMapper.toLanguage(apiResponse.language),
    };
  }

  static toUserStudent(
    apiResponse: Components.Schemas.UserStudent
  ): UserStudent {
    return {
      id: apiResponse.id,
      username: apiResponse.username,
      description: apiResponse.description,
      firstName: apiResponse.firstName,
      lastName: apiResponse.lastName,
      email: apiResponse.email,
      avatar:
        apiResponse.avatar && BaseMapper.toServiceFile(apiResponse.avatar),
      schoolId: apiResponse.schoolId,
      clientId: apiResponse.clientId,
      totalPoints: apiResponse.totalPoints,
      pointWallets: apiResponse.pointWallets.map(PointMapper.toPointWallet),
      notificationCount: apiResponse.notificationCount,
      language: BaseMapper.toLanguage(apiResponse.language),
    };
  }
}
