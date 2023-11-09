export interface GenericErrorModelDto {
  status: string;
  message: string;
}

export interface SignInWithPasswordDto {
  email: string;
  password: string;
}

export interface SignUpWithPasswordDto {
  email: string;
  password: string;
}
