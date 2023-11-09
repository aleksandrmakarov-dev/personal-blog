import { Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import { UserSignInForm, UserSignInProviders } from "../../../entities/user";
import { Routing } from "../../../shared/lib";

export function UserSignInCard() {
  return (
    <div className="w-full max-w-md flex flex-col gap-3">
      <h5 className="text-3xl font-semibold text-center mb-5 text-foreground-primary">
        Sign in to your Account
      </h5>
      <UserSignInProviders />
      <Divider className="my-2 text-foreground-secondary">
        Or continue with
      </Divider>
      <UserSignInForm />
      <p className="text-center text-foreground-primary">
        Don't have an account?{" "}
        <NavLink
          to={Routing.auth.signUp}
          replace
          className="text-primary-600 hover:underline hover:text-primary-800"
        >
          Create new account
        </NavLink>
      </p>
    </div>
  );
}
