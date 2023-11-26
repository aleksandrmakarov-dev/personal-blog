import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { LoadingButton } from "@mui/lab";
import { useSignInUserWithPassword } from "@/features/user";
import { useAuth } from "@/providers/AuthProvider";
import { Routing } from "@/shared/lib";
import FormField from "@/shared/ui/form-field/FormField";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(50),
});

type FormType = z.infer<typeof formSchema>;

export function UserSignInForm() {
  const { mutate, isPending, isError, error } = useSignInUserWithPassword();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormType) => {
    mutate(values, {
      onSuccess: (data) => {
        setUser(data);
        navigate(Routing.root, { replace: true });
      },
      onError: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      {isError && (
        <Alert severity="error">{error.response?.data.message}</Alert>
      )}
      <Controller
        control={control}
        name="email"
        disabled={isPending}
        render={({ field, fieldState: { error } }) => (
          <FormField label="Email address" error={error}>
            <TextField {...field} fullWidth size="small" />
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
            <TextField {...field} type="password" fullWidth size="small" />
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
