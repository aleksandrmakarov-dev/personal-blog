import { userKeys } from "@/entities/user/api/userApi";
import userService, {
  SignUpWithPasswordDTO,
} from "@/services/user/userService";
import { GenericErrorModelDto } from "@/shared/lib/types";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

type UseSignUpUserWithPasswordMutation = UseMutationOptions<
  any,
  GenericErrorModelDto,
  SignUpWithPasswordDTO,
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
    mutationFn: async (values: SignUpWithPasswordDTO) => {
      return await userService.signUpWithPassword(values);
    },
    ...options,
  });
};
