import { Account, Client, ID } from "appwrite";
import APIConfig from "./api-config";
// utils
import { isDevelopment } from "./service-utils";
// mocks
import mockAuthService from "@/assets/mockAuthService";

class AuthService {
  client = new Client();
  account: any;
  constructor() {
    this.client.setEndpoint(APIConfig.appUrl).setProject(APIConfig.projectId);
    this.account = new Account(this.client);
  }
  async createUser({ email, password, name }: any) {
    await this.account.create(ID.unique(), email, password, name);
    await this.account.createEmailPasswordSession(email, password);

    return;
  }

  async login({ email, password }: any) {
    await this.account.createEmailPasswordSession(email, password);
    return await this.getCurrentUser();
  }

  async getCurrentUser() {
    return this.account.get();
  }

  async logout() {
    return await this.account.deleteSession("current");
  }
}

export default isDevelopment() ? mockAuthService : new AuthService();
