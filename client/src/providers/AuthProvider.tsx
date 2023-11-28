import { useRefreshToken } from "@/features/user/refresh-token";
import { UserAccountDTO } from "@/services/user/userService";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
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

  const timeInterval = 1000 * 60 * 10;

  const [currentUser, setCurrentUser] = useState<UserAccountDTO>();
  const [isLoading, setIsLoading] = useState(true);

  const { mutateAsync, isError } = useRefreshToken();

  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const refreshUser = useCallback(async () => {
    try {
      const data = await mutateAsync({});
      setCurrentUser(data);
    } catch (error) {
      // Handle error if needed
      console.error(error);
      clearUser();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const setUser = (user: UserAccountDTO) => {
    setCurrentUser(user);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => refreshUser(), timeInterval);
  };

  const clearUser = () => {
    setCurrentUser(undefined);
    clearInterval(intervalRef.current);
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
