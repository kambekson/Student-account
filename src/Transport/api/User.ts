import {
  User,
  UserFilter,
  UserStudent,
  UserUpdate,
} from "@/Common/Entity/Base/User";
import { Pagination } from "@/Common/Entity/Pagination";
import { getClient } from "..";
import BaseMapper from "../mappers";
import { Components, Paths } from "types/openapi";
import { UserMapper } from "../mappers/user";
import { UUID } from "@/Common/Entity/Base/Common";

export default class UserAPI {
  static async fetchUsers(filter: UserFilter): Promise<Pagination<User>> {
    const client = await getClient();
    const response = await client.getUsers(filter);

    return BaseMapper.paginationFromApi(
      response.data as Paths.GetUsers.Responses.$200,
      UserMapper.toUser
    );
  }

  static async fetchUserById(id: UUID): Promise<User> {
    const client = await getClient();
    const response = await client.getUser(id);

    return UserMapper.toUser(response.data as Components.Schemas.User);
  }

  static async updateUserAvatar(id: UUID, name: string): Promise<string> {
    const client = await getClient();
    const response = await client.updateUserAvatar(id, {
      name,
    });

    return (response.data as Paths.UpdateUserAvatar.Responses.$200).putLink;
  }

  static async updateUser(id: UUID, update: UserUpdate): Promise<User> {
    const client = await getClient();
    const response = await client.updateUser(id, update);

    return UserMapper.toUser(response.data as Components.Schemas.User);
  }

  static async fetchUserStudentById(id: UUID): Promise<UserStudent> {
    const client = await getClient();
    const response = await client.getUserStudent(id);

    return UserMapper.toUserStudent(
      response.data as Components.Schemas.UserStudent
    );
  }

  static async recoveryPasswordSendLink(recovery: {
    domain: string;
    email: string;
  }): Promise<void> {
    const client = await getClient();
    await client.recoveryPasswordSendLink({}, recovery);
  }

  static async recoveryPassword(recovery: {
    token: string;
    newPassword: string;
  }): Promise<void> {
    const client = await getClient();
    await client.recoveryPassword({}, recovery);
  }
}
