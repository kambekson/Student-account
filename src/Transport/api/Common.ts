import axios, { AxiosResponse } from "axios";

export default class CommonAPI {
  static async uploadFileOnServer(
    file: File,
    uploadUrl: string
  ): Promise<AxiosResponse> {
    try {
      const response = await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      return response;
    } catch (error) {
      console.error("Произошла ошибка при загрузке файла:", error);

      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.statusText || error.message);
      }

      throw error;
    }
  }
}
