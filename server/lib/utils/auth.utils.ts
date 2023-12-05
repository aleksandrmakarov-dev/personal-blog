import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { JWTPayload } from "../types/user.types";
import appConfig from "../../config/app.config";

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
  return jsonwebtoken.sign(payload, appConfig.accessToken.secretKey, {
    expiresIn: appConfig.accessToken.ttl,
  });
}

function verifyAccessToken(token: string) {
  return jsonwebtoken.verify(token, appConfig.accessToken.secretKey);
}

export default {
  generateToken,
  generateAccessToken,
  verifyAccessToken,
  hashPassword,
  verifyPassword,
};
