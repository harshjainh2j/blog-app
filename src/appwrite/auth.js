import { Client, Account, ID } from "appwrite"; // Import all from appwrite in one line
import conf from "../conf/conf.js";

export class AuthService {
  client=new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwrite_id) // Your API Endpoint
      .setProject(conf.appwrite_project_id); // Your project ID

  
    this.account = new Account(this.client);
  }
  async login({email, password}) {
    try {
        return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
        throw error;
    }
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
          // call another method
          return this.login({email, password});
      } else {
         return  userAccount;
      }
  } catch (error) {
      throw error;
  }
}


async getCurrentStatus() {
  try {
      return await this.account.get();
  } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
  }

  return null;
}

  async logout() {

    try {
        await this.account.deleteSessions();
    } catch (error) {
        console.log("Appwrite serive :: logout :: error", error);
    }
}


}

const authService = new AuthService();

export default authService;
