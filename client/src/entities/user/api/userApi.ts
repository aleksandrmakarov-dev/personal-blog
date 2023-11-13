import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../providers/AuthProvider";
import { GenericErrorModelDto } from "../../../shared/lib/types";

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
    signUp: () => [...userKeys.user.root, "sign-up"],
    refresh: () => [...userKeys.user.root, "refresh"],
  },
};

type UseRefreshUserQuery = UseQueryOptions<
  User,
  GenericErrorModelDto,
  User,
  string[]
>;

type UseRefreshUserOptions = Omit<UseRefreshUserQuery, "queryKey" | "queryFn">;

export const useRefreshUser = (options?: UseRefreshUserOptions) => {
  const { signIn } = useAuth();

  return useQuery({
    queryKey: userKeys.mutation.refresh(),
    queryFn: async () => {
      const user = {
        email: "alexandr.makarov.2000@gmail.com",
        id: "1",
        name: "Alexandr Makarov",
      };
      signIn(user);
      return user;
    },
    ...options,
  });
};
