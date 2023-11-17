import { useRefreshToken } from "@/features/user/refresh-token";
import { UserAccountDTO } from "@/services/user/userService";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type AuthContextType = {
  currentUser?: UserAccountDTO;
  isLoading: boolean;
  isError?: boolean;
  setUser: (user: UserAccountDTO) => void;
  clearUser: () => void;
};

const defaultValue: AuthContextType = {
  currentUser: undefined,
  isLoading: false,
  isError: undefined,
  setUser: () => {},
  clearUser: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider(props: PropsWithChildren<{}>) {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState<UserAccountDTO>();

  const { mutate, isPending, isError } = useRefreshToken();

  useEffect(() => {
    mutate(
      {},
      {
        onSuccess: (data) => {
          setCurrentUser(data);
        },
      }
    );
  }, []);

  const setUser = (user: UserAccountDTO) => {
    setCurrentUser(user);
  };

  const clearUser = () => {
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        isLoading: isPending,
        isError: isError,
        setUser: setUser,
        clearUser: clearUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
