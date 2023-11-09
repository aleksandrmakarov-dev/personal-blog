import axios from "axios";
import { User } from "../entities/user/api/userApi";
import { SignInWithPasswordDto } from "../shared/api/Api";
import { sleep } from "../shared/lib/utils";

const baseUrl = "/api/users";
const mockUser = {
  email: "ac5295@student.jamk.fi",
  password: "12345678",
};

const UserService = {
  refreshUser: async (): Promise<User> => {
    const response = await axios.post<User>(`${baseUrl}/refresh-token`);
    return response.data;
  },
  signInWithPassword: async (params: SignInWithPasswordDto): Promise<User> => {
    const { email, password } = params;

    await sleep(5000);

    if (email !== mockUser.email || password !== mockUser.password) {
      throw new Error("Invalid email or password");
    }

    return {
      email: mockUser.email,
      name: "Aleksandr Makarov",
      id: "1",
    };
  },
};

export default UserService;
