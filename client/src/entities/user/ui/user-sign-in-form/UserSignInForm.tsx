import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Routing } from "../../../../shared/lib";
import FormField from "../../../../shared/ui/form-field/FormField";
import { useSignInUserWithPassword } from "../../../../features/user";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../../../../providers/AuthProvider";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormType = z.infer<typeof formSchema>;

export function UserSignInForm() {
  const { mutateAsync, isPending } = useSignInUserWithPassword();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormType) => {
    try {
      const user = await mutateAsync(values);
      signIn(user);
      navigate(Routing.root, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Controller
        control={control}
        name="email"
        disabled={isPending}
        render={({ field, fieldState: { error } }) => (
          <FormField label="Email address" error={error}>
            <Input {...field} fullWidth size="small" />
          </FormField>
        )}
      />
      <Controller
        control={control}
        name="password"
        disabled={isPending}
        render={({ field, fieldState: { error } }) => (
          <FormField
            label="Password"
            error={error}
            helper={
              <NavLink
                className="text-primary-600 hover:underline hover:text-primary-800"
                to={Routing.auth.forgotPassword}
              >
                Forgot password?
              </NavLink>
            }
          >
            <Input {...field} type="password" fullWidth size="small" />
          </FormField>
        )}
      />
      <LoadingButton
        loading={isPending}
        type="submit"
        variant="contained"
        disableElevation
      >
        Sign In
      </LoadingButton>
    </form>
  );
}
