import { Button, Divider, Input } from "@mui/material";
import FormField from "../../shared/ui/form-field/FormField";
import { NavLink } from "react-router-dom";
import { Routing } from "../../shared/lib";
import { GitHub, Google } from "@mui/icons-material";

export function LoginPage(){
    return(
        <div className="w-full max-w-md flex flex-col gap-3">
            <h5 className="text-3xl font-semibold text-center mb-5 text-foreground-primary">Sign in to your Account</h5>
            <div className="grid grid-cols-2 gap-2">
                <Button startIcon={<Google/>} variant="contained" disableElevation>Google</Button>
                <Button startIcon={<GitHub/>} variant="contained" disableElevation>Github</Button>
            </div>
            <Divider className="my-2 text-foreground-secondary">Or continue with</Divider>
            <FormField label="Email address">
                <Input fullWidth/>
            </FormField>
            <FormField label="Password" helper={<NavLink className="text-primary-600 hover:underline hover:text-primary-800" to={Routing.auth.forgotPassword}>Forgot password?</NavLink>}>
                <Input type="password" fullWidth/>
            </FormField>
            <Button variant="contained" disableElevation>Sign In</Button>
            <p className="text-center text-foreground-primary">Don't have an account? <NavLink to="/sign-up" className="text-primary-600 hover:underline hover:text-primary-800">Create new account</NavLink></p>
        </div>
    )
}