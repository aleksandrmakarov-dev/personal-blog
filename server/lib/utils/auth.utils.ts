import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { JWTPayload } from "../types/user.types";

const AuthConfig = {
  TOKEN_SECRET:
    "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611",
  ACCESS_TOKEN_EXPIRES: 60 * 60 * 24 * 7, // 7 days
};

async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function verifyPassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  const isPasswordCorrect = await bcrypt.compare(password, passwordHash);
  return isPasswordCorrect;
}

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

function generateAccessToken(payload: JWTPayload) {
  return jsonwebtoken.sign(payload, AuthConfig.TOKEN_SECRET, {
    expiresIn: AuthConfig.ACCESS_TOKEN_EXPIRES,
  });
}

function verifyAccessToken(token: string) {
  return jsonwebtoken.verify(token, AuthConfig.TOKEN_SECRET);
}

export default {
  generateToken,
  generateAccessToken,
  verifyAccessToken,
  hashPassword,
  verifyPassword,
};
