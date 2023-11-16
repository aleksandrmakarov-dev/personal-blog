import { User } from "@/entities/user/api/userApi";
import { GenericResponseModelDTO } from "@/shared/lib/types";
import axios from "axios";

const baseUrl = "/api/users";

export interface UserProfileDTO {
  slug: string;
  name: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface UserAccountDTO {
  id: string;
  name: string;
  email: string;
  image?: string;
  roles: string[];
}

export type SignInWithPasswordDTO = {
  email: string;
  password: string;
};

async function signInWithPassword(
  values: SignInWithPasswordDTO
): Promise<User> {
  const response = await axios.post<UserAccountDTO>(
    `${baseUrl}/sign-in/password`,
    values
  );
  return response.data;
}

async function signInWithGoogle(): Promise<User> {
  const user = {
    id: "1",
    slug: "test-user",
    name: "Test User",
    email: "test@example.com",
  };

  return user;
}

async function signInWithGithub(): Promise<User> {
  const user = {
    id: "1",
    slug: "test-user",
    name: "Test User",
    email: "test@example.com",
  };

  return user;
}

export type SignUpWithPasswordDTO = {
  name: string;
  email: string;
  password: string;
};

async function signUpWithPassword(
  values: SignUpWithPasswordDTO
): Promise<GenericResponseModelDTO> {
  const response = await axios.post<GenericResponseModelDTO>(
    `${baseUrl}/sign-up`,
    values
  );
  return response.data;
}

export default {
  signInWithPassword,
  signUpWithPassword,
  signInWithGoogle,
  signInWithGithub,
};
