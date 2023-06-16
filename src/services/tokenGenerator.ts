import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class TokenGenerator {
  public generate = (input: AuthenticationData): string => {
    const newToken = jwt.sign(
      {
        id: input.id,
        email: input.email,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      }
    );
    return newToken;
  };

  public verify(token: string) {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = { id: payload.id, email: payload.email };
    return result;
  }
}

export interface AuthenticationData {
  id: string;
  email: string;
}

export default new TokenGenerator();
