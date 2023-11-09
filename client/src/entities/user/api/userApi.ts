import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { GenericErrorModelDto } from "../../../shared/api/Api";
import UserService from "../../../services/user.service";
import { useAuth } from "../../../providers/AuthProvider";

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
      const user = await UserService.refreshUser();
      signIn({ ...user });
      return user;
    },
    ...options,
  });
};
