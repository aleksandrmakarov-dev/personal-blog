import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import {
  GenericErrorModelDto,
  SignInWithPasswordDto,
} from "../../../../shared/api/Api";
import { User, userKeys } from "../../../../entities/user/api/userApi";
import UserService from "../../../../services/user.service";

type UseSignInUserWithPasswordMutation = UseMutationOptions<
  User,
  GenericErrorModelDto,
  SignInWithPasswordDto,
  unknown
>;

type UseSignInUserWithPasswordOptions = Omit<
  UseSignInUserWithPasswordMutation,
  "mutationFn" | "mutationKey"
>;

export const useSignInUserWithPassword = (
  options?: UseSignInUserWithPasswordOptions
) => {
  return useMutation({
    mutationKey: userKeys.mutation.signIn(),
    mutationFn: async (values: SignInWithPasswordDto) => {
      return await UserService.signInWithPassword(values);
    },
    ...options,
  });
};
