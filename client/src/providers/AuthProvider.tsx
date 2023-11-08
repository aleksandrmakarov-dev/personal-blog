import { PropsWithChildren, createContext, useState } from "react";

type CurrentUser = {
  id:string;
  email:string;
  name:string;
  image?:string;
}

type AuthContextType = {
  currentUser?:CurrentUser;
  signIn:(provider:string,data:any) => void;
  signOut:() => void;
}

const defaultValue: AuthContextType = {
  signIn:()=>{},
  signOut:()=>{}
}

const AuthContext = createContext<AuthContextType>(defaultValue);

export default function AuthProvider(props:PropsWithChildren<{}>){
  const {children} = props;

  const [currentUser,setCurrentUser] = useState<CurrentUser>();
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [isError,setIsError] = useState<string>();

  const signIn = () => {
    
  }

  const signOut = () => {

  }

  return (
    <AuthContext.Provider value={{
      signIn:signIn,
      signOut:signOut 
    }}>
      {children}
    </AuthContext.Provider>
  )
}