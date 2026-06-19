import { UUID } from "@/entities/Common";
import { CommonAPI } from "@/entities/Common";
import { UserAPI } from "@/entities/User";

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
