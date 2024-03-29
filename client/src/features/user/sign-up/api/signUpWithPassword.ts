import { userKeys } from "@/entities/user/api/userApi";
import userService, {
  SignUpWithPasswordDTO,
} from "@/services/user/userService";
import {
  GenericErrorModelDTO,
  GenericResponseModelDTO,
} from "@/shared/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSignUpWithPassword = () => {
  return useMutation<
    GenericResponseModelDTO,
    AxiosError<GenericErrorModelDTO>,
    SignUpWithPasswordDTO,
    unknown
  >({
    mutationKey: userKeys.mutation.signUp(),
    mutationFn: async (values: SignUpWithPasswordDTO) => {
      return await userService.signUpWithPassword(values);
    },
  });
};
