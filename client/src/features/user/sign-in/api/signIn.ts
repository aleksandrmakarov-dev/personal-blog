import { User, userKeys } from "@/entities/user/api/userApi";
import userService, {
  SignInWithPasswordDTO,
} from "@/services/user/userService";
import { GenericErrorModelDTO } from "@/shared/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSignInUserWithPassword = () => {
  return useMutation<
    User,
    AxiosError<GenericErrorModelDTO>,
    SignInWithPasswordDTO,
    unknown
  >({
    mutationKey: userKeys.mutation.signInWithPassword(),
    mutationFn: async (credentials: SignInWithPasswordDTO) => {
      return await userService.signInWithPassword(credentials);
    },
  });
};

export const useSignInWithGoogle = () => {
  return useMutation<User, AxiosError<GenericErrorModelDTO>, void, unknown>({
    mutationKey: userKeys.mutation.signInWithGoogle(),
    mutationFn: async () => {
      return await userService.signInWithGoogle();
    },
  });
};

export const useSignInWithGithub = () => {
  return useMutation<User, AxiosError<GenericErrorModelDTO>, void, unknown>({
    mutationKey: userKeys.mutation.signInWithGithub(),
    mutationFn: async () => {
      return await userService.signInWithGithub();
    },
  });
};
