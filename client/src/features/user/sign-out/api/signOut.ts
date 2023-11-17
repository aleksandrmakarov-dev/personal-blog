import { userKeys } from "@/entities/user/api/userApi";
import userService from "@/services/user/userService";
import {
  GenericErrorModelDTO,
  GenericResponseModelDTO,
} from "@/shared/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSignOut = () => {
  return useMutation<
    GenericResponseModelDTO,
    AxiosError<GenericErrorModelDTO>,
    unknown,
    unknown
  >({
    mutationKey: userKeys.mutation.signOut(),
    mutationFn: async () => {
      return await userService.signOut();
    },
  });
};
