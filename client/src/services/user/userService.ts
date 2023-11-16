import { User } from "@/entities/user/api/userApi";
import { GenericResponseModelDTO } from "@/shared/lib/types";
import axios, { AxiosResponse } from "axios";

export interface UserProfileDTO {
  slug: string;
  name: string;
  bio: string;
  image: string;
  following: boolean;
}

export type SignInWithPasswordDTO = {
  email: string;
  password: string;
};

async function signInWithPassword(
  values: SignInWithPasswordDTO
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
  email: string;
  password: string;
};

async function signUpWithPassword(
  values: SignUpWithPasswordDTO
): Promise<GenericResponseModelDTO> {
  console.log("signUpWithPasssword:", values);

  const response = await axios.post<GenericResponseModelDTO>(
    "/api/users/sign-up",
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
