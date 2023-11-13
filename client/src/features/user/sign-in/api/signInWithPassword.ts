import { useMutation } from "@tanstack/react-query";
import { User, userKeys } from "../../../../entities/user/api/userApi";
import userService, {
  SignInWithPasswordDTO,
} from "../../../../services/user/userService";
import { GenericErrorModelDto } from "../../../../shared/lib/types";

export const useSignInUserWithPassword = () => {
  return useMutation<
    User,
    GenericErrorModelDto,
    SignInWithPasswordDTO,
    unknown
  >({
    mutationKey: userKeys.mutation.signInWithPassword(),
    mutationFn: async (credentials: SignInWithPasswordDTO) => {
      return await userService.signInWithPassword(credentials);
    },
  });
};
