import { UUID } from "@/Common/Entity/Base/Common";
import CommonAPI from "@/Transport/api/Common";
import UserAPI from "@/Transport/api/User";

class UserService {
  async updateUserAvatar(id: UUID, file: File): Promise<void> {
    try {
      const putLink = await UserAPI.updateUserAvatar(id, file.name);
      await CommonAPI.uploadFileOnServer(file, putLink);
    } catch (error) {
      console.error(error);
      throw new Error("Unable to update user avatar");
    }
  }
}

const userService = new UserService();
export default userService;
