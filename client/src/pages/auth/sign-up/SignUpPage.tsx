import { GitHub } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Input,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Routing } from "../../../shared/lib";
import FormField from "../../../shared/ui/form-field/FormField";

export default function SignUpPage() {
  return (
    <div className="w-full max-w-md flex flex-col gap-3">
      <h5 className="text-3xl font-semibold text-center mb-5 text-foreground-primary">
        Create your account
      </h5>
      <FormField label="Email address">
        <Input fullWidth size="small" type="email" />
      </FormField>
      <FormField label="Password">
        <Input type="password" fullWidth size="small" />
      </FormField>
      <FormField label="Confirm password">
        <Input type="password" fullWidth size="small" />
      </FormField>
      <FormControlLabel
        control={<Checkbox />}
        label={
          <p>
            I accept{" "}
            <NavLink
              className="text-primary-600 hover:underline hover:text-primary-800"
              to={"/"}
            >
              Terms and Conditions
            </NavLink>
          </p>
        }
      />
      <Button variant="contained" disableElevation>
        Create account
      </Button>
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
