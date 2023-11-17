import { userKeys } from "@/entities/user/api/userApi";
import userService, { UserAccountDTO } from "@/services/user/userService";
import { GenericErrorModelDTO } from "@/shared/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useRefreshToken = () => {
  return useMutation<
    UserAccountDTO,
    AxiosError<GenericErrorModelDTO>,
    unknown,
    unknown
  >({
    mutationKey: userKeys.mutation.refreshToken(),
    mutationFn: async () => {
      return await userService.refreshToken();
    },
  });
};
