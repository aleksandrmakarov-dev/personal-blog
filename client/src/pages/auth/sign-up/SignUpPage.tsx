import { UserSignUpForm } from "@/entities/user";
import { Routing } from "@/shared/lib";
import { NavLink } from "react-router-dom";

export default function SignUpPage() {
  return (
    <div className="w-full max-w-md flex flex-col gap-3">
      <h5 className="text-3xl font-semibold text-center mb-5 text-foreground-primary">
        Create your account
      </h5>
      <UserSignUpForm />
      <p className="text-center text-foreground-primary">
        Already have an account?{" "}
        <NavLink
          to={Routing.auth.signIn}
          replace
          className="text-primary-600 hover:underline hover:text-primary-800"
        >
          Sign in
        </NavLink>
      </p>
    </div>
  );
}
