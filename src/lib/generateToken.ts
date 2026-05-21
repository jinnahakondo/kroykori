import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

type GenerateTokenProps = {
  payload: Record<string, string>;
  expiresIn?: string;
};

export const generateToken = async ({
  payload,
  expiresIn = "1h",
}: GenerateTokenProps) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
};