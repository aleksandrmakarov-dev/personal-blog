import { User } from "@/entities/user/api/userApi";

export interface UserProfileDTO {
  slug: string;
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export type SignInWithPasswordDTO = {
  email: string;
  password: string;
};

async function signInWithPassword(
  credentials: SignInWithPasswordDTO
): Promise<User> {
  const user = {
    id: "1",
    slug: "test-user",
    name: "Test User",
    email: "test@example.com",
    bio: "Test Bio",
    image: "https://static.productionready.io/images/smiley-cyrus.jpg",
  };

  return user;
}

export type SignUpWithPasswordDTO = {
  email: string;
  password: string;
};

async function signUpWithPassword(
  credentiols: SignUpWithPasswordDTO
): Promise<void> {
  return;
}

export default {
  signInWithPassword,
  signUpWithPassword,
};
