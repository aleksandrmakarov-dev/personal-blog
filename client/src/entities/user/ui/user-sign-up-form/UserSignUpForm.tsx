import { Input, FormControlLabel, Checkbox } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import FormField from "../../../../shared/ui/form-field/FormField";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Routing } from "../../../../shared/lib";
import { useSignUpUserWithPassword } from "../../../../features/user";
import { LoadingButton } from "@mui/lab";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  passwordConfirm: z.string().min(6),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, { message: "Accept Terms and Conditions" }),
});

type FormType = z.infer<typeof formSchema>;

export function UserSignUpForm() {
  const { mutateAsync, isPending } = useSignUpUserWithPassword();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (values: FormType) => {
    try {
      await mutateAsync(values);
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
            <Input {...field} fullWidth size="small" type="email" />
          </FormField>
        )}
      />
      <Controller
        control={control}
        name="password"
        disabled={isPending}
        render={({ field, fieldState: { error } }) => (
          <FormField label="Password" error={error}>
            <Input {...field} type="password" fullWidth size="small" />
          </FormField>
        )}
      />
      <Controller
        control={control}
        name="passwordConfirm"
        disabled={isPending}
        render={({ field, fieldState: { error } }) => (
          <FormField label="Confirm password" error={error}>
            <Input {...field} type="password" fullWidth size="small" />
          </FormField>
        )}
      />
      <Controller
        control={control}
        name="acceptTerms"
        disabled={isPending}
        render={({ field, fieldState: { error } }) => (
          <FormField error={error}>
            <FormControlLabel
              control={<Checkbox size="small" {...field} />}
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
          </FormField>
        )}
      />
      <LoadingButton
        type="submit"
        variant="contained"
        loading={isPending}
        fullWidth
        disableElevation
      >
        Create account
      </LoadingButton>
    </form>
  );
}
