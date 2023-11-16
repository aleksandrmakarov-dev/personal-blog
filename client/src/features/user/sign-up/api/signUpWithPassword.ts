import { userKeys } from "@/entities/user/api/userApi";
import userService, {
  SignUpWithPasswordDTO,
} from "@/services/user/userService";
import {
  GenericErrorModelDTO,
  GenericResponseModelDTO,
} from "@/shared/lib/types";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

type UseSignUpWithPasswordMutation = UseMutationOptions<
  GenericResponseModelDTO,
  GenericErrorModelDTO,
  SignUpWithPasswordDTO,
  unknown
>;

type UseSignUpWithPasswordOptions = Omit<
  UseSignUpWithPasswordMutation,
  "mutationFn" | "mutationKey"
>;

export const useSignUpWithPassword = (
  options?: UseSignUpWithPasswordOptions
) => {
  return useMutation({
    mutationKey: userKeys.mutation.signUp(),
    mutationFn: async (values: SignUpWithPasswordDTO) => {
      return await userService.signUpWithPassword(values);
    },
    ...options,
  });
};
