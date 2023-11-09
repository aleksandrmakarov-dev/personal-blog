import { PropsWithChildren, createContext, useContext, useState } from "react";

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  image?: string;
};

export type AuthContextType = {
  currentUser?: CurrentUser;
  isLoading: boolean;
  isError?: string;
  signIn: (user: CurrentUser) => void;
  signOut: () => void;
};

const defaultValue: AuthContextType = {
  currentUser: undefined,
  isLoading: false,
  isError: undefined,
  signIn: () => {},
  signOut: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider(props: PropsWithChildren<{}>) {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();

  const signIn = (user: CurrentUser) => {
    setCurrentUser(user);
  };

  const signOut = () => {
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        isLoading: isLoading,
        isError: isError,
        signIn: signIn,
        signOut: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
