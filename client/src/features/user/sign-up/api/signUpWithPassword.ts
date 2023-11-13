import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import {
  GenericErrorModelDto,
  SignUpWithPasswordDto,
} from "../../../../shared/api/Api";
import { userKeys } from "../../../../entities/user/api/userApi";
import UserService from "../../../../services/user/userService";

type UseSignUpUserWithPasswordMutation = UseMutationOptions<
  any,
  GenericErrorModelDto,
  SignUpWithPasswordDto,
  unknown
>;

type UseSignUpUserWithPasswordOptions = Omit<
  UseSignUpUserWithPasswordMutation,
  "mutationFn" | "mutationKey"
>;

export const useSignUpUserWithPassword = (
  options?: UseSignUpUserWithPasswordOptions
) => {
  return useMutation({
    mutationKey: userKeys.mutation.signUp(),
    mutationFn: async (values: SignUpWithPasswordDto) => {
      return await UserService.signUpWithPassword(values);
    },
    ...options,
  });
};
