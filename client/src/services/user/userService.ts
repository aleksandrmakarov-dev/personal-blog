import { GenericResponseModelDTO } from "@/shared/lib/types";
import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/api/users`;

export interface UserProfileDTO {
  id: string;
  slug: string;
  name: string;
  image: string;
}

export interface UserAccountDTO {
  id: string;
  slug: string;
  name: string;
  email: string;
  image?: string;
  role: string;
}

export type SignInWithPasswordDTO = {
  email: string;
  password: string;
};

async function signInWithPassword(
  values: SignInWithPasswordDTO
): Promise<UserAccountDTO> {
  const response = await axios.post<UserAccountDTO>(
    `${baseUrl}/sign-in/password`,
    values
  );
  return response.data;
}

async function signInWithGoogle(): Promise<UserAccountDTO> {
  const user: UserAccountDTO = {
    id: "1",
    slug: "test-user",
    name: "Test User",
    email: "test@example.com",
    role: "user",
  };

  return user;
}

async function signInWithGithub(): Promise<UserAccountDTO> {
  const user: UserAccountDTO = {
    id: "1",
    slug: "test-user",
    name: "Test User",
    email: "test@example.com",
    role: "user",
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

async function refreshToken(): Promise<UserAccountDTO> {
  const response = await axios.post<UserAccountDTO>(`${baseUrl}/refresh-token`);
  return response.data;
}

async function signOut(): Promise<GenericResponseModelDTO> {
  const response = await axios.post<GenericResponseModelDTO>(
    `${baseUrl}/sign-out`
  );
  return response.data;
}

export default {
  signInWithPassword,
  signUpWithPassword,
  signInWithGoogle,
  signInWithGithub,
  refreshToken,
  signOut,
};
