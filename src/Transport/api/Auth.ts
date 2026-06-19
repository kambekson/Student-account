import { getClient } from "..";
import { Auth, AuthToken } from "../../Common/Entity/Base/Auth";

export default class AuthAPI {
  static async login(auth: Auth): Promise<AuthToken> {
    const client = await getClient();
    const response = await client.login(null, auth);
    
    return response.data as AuthToken;
  }

  static async refresh(refreshToken: string): Promise<AuthToken> {
    const client = await getClient();
    const response = await client.refresh(null, {
      token: refreshToken,
    });

    return response.data as AuthToken;
  }

  static async logout(): Promise<void> {
    const client = await getClient();
    await client.logout(null);
  }
}
