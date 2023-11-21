import { UseQueryOptions } from "@tanstack/react-query";
import { GenericErrorModelDTO } from "../../../shared/lib/types";

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
}

export const userKeys = {
  user: {
    root: ["user"],
    currentUser: () => [...userKeys.user.root, "currentUser"],
  },
  mutation: {
    signIn: () => [...userKeys.user.root, "sign-in"],
    signInWithPassword: () => [...userKeys.user.root, "sign-in-with-password"],
    signInWithGoogle: () => [...userKeys.user.root, "sign-in-with-google"],
    signInWithGithub: () => [...userKeys.user.root, "sign-in-with-github"],
    signUp: () => [...userKeys.user.root, "sign-up"],
    refreshToken: () => [...userKeys.user.root, "refresh-token"],
    signOut: () => [...userKeys.user.root, "sign-out"],
  },
};

type UseRefreshUserQuery = UseQueryOptions<
  User,
  GenericErrorModelDTO,
  User,
  string[]
>;

type UseRefreshUserOptions = Omit<UseRefreshUserQuery, "queryKey" | "queryFn">;
