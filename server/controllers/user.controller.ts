import { Request, Response } from "express";
import { SignUpWithPasswordValidationSchema } from "../lib/validations/user/sign-up.validation";
import UserModel from "../models/user.model";
import { Message, Ok } from "../lib/utils/express.utils";
import authUtils from "../lib/utils/auth.utils";
import {
  BadRequestError,
  InternalError,
  NotFoundError,
  UnAuthorizedError,
} from "../lib/api.errors";
import { SignInWithPasswordValidationSchema } from "../lib/validations/user/sign-in.validation";
import AccountModel from "../models/account.model";
import requestIp from "request-ip";

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

  const refreshToken = authUtils.generateToken();
  const ipAddress = requestIp.getClientIp(req);

  // create account

  // Expires after 7 days
  const refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const createdAccount = await AccountModel.create({
    user: foundUser._id,
    refreshToken: refreshToken,
    created: Date.now(),
    createdByIp: ipAddress,
    provider: "password",
    expires: refreshTokenExpires,
  });

  if (!createdAccount) {
    throw new InternalError("Something went wrong");
  }

  const accessToken = authUtils.generateAccessToken({
    id: foundUser._id,
    roles: foundUser.roles,
  });

  // Expires after 15 minutes
  const accessTokenExpires = new Date(Date.now() + 15 * 60 * 1000);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    expires: refreshTokenExpires,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    expires: accessTokenExpires,
  });

  const userAccount = foundUser.toUserAccount();
  return Ok(res, userAccount);
}

async function refreshToken(req: Request, res: Response) {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    throw new UnAuthorizedError("Refresh token not found");
  }

  const foundAccount = await AccountModel.findByRefreshToken(refreshToken);

  if (!foundAccount) {
    throw new UnAuthorizedError("Invalid refresh token");
  }

  if (foundAccount.expires < new Date()) {
    throw new UnAuthorizedError("Refresh token expired");
  }

  if (foundAccount.revoked) {
    throw new UnAuthorizedError("Refresh token revoked");
  }

  if (foundAccount.replacedBy) {
    throw new UnAuthorizedError("Refresh token replaced");
  }

  const foundUser = await UserModel.findById(foundAccount.user);

  if (!foundUser) {
    throw new NotFoundError("User not found");
  }

  const accessToken = authUtils.generateAccessToken({
    id: foundUser._id,
    roles: foundUser.roles,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 15 * 60 * 1000),
  });

  const userAccount = foundUser.toUserAccount();

  return Ok(res, userAccount);
}

async function signOut(_req: Request, res: Response) {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return Message(res, "Signed out", "Signed out successfully", 200);
}

export default {
  signUp,
  signInWithPassword,
  refreshToken,
  signOut,
};
