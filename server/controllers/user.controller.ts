import { Request, Response } from "express";
import { SignUpWithPasswordValidationSchema } from "../lib/validations/user/sign-up.validation";
import UserModel from "../models/user.model";
import { Message, Ok } from "../lib/utils/express.utils";
import authUtils from "../lib/utils/auth.utils";
import { BadRequestError, NotFoundError } from "../lib/api.errors";
import { SignInWithPasswordValidationSchema } from "../lib/validations/user/sign-in.validation";

async function signUp(req: Request, res: Response) {
  const { name, email, password } = SignUpWithPasswordValidationSchema.parse(
    req.body
  );

  const foundUser = await UserModel.findByEmail(email);

  if (foundUser) {
    throw new BadRequestError("User already exists");
  }

  const passwordHash = await authUtils.hashPassword(password);

  const createdUser = await UserModel.create({
    name: name,
    email: email,
    created: Date.now(),
    passwordHash: passwordHash,
    // add email verification
    emailVerified: true,
  });

  return Message(
    res,
    "User registered",
    "Check your email for verification letter!",
    201
  );
}

async function signInWithPassword(req: Request, res: Response) {
  const { email, password } = SignInWithPasswordValidationSchema.parse(
    req.body
  );

  const foundUser = await UserModel.findByEmail(email);

  if (!foundUser) {
    throw new NotFoundError(`User with email ${email} not found`);
  }

  if (!foundUser.passwordHash) {
    throw new BadRequestError(
      "If you have signed up with social media, please sign in with it"
    );
  }

  const isPasswordCorrect = await authUtils.verifyPassword(
    password,
    foundUser.passwordHash
  );

  if (!isPasswordCorrect) {
    throw new BadRequestError("Invaid email or password");
  }

  // const createdAccout = await AccountModel.create({
  //   user: foundUser._id,
  //   provider: "local",
  //   tokenType: "Bearer",
  //   scope: "any",
  //   refreshToken: "",
  //   expiresAt: 0,
  // });

  // if (!createdAccout) {
  //   throw new InternalError("Something went wrong");
  // }

  const userAccount = foundUser.toUserAccount();
  console.log("account:", userAccount);
  return Ok(res, userAccount);
}

export default {
  signUp,
  signInWithPassword,
};
