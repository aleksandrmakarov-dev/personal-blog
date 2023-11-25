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
  const [isLoading, setIsLoading] = useState(true);

  const { mutateAsync, isError } = useRefreshToken();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await mutateAsync({});
        setCurrentUser(data);
      } catch (error) {
        // Handle error if needed
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
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
        currentUser,
        isLoading,
        isError,
        setUser,
        clearUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
