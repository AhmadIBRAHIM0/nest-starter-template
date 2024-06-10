export const jwtConstants: JwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
};

export interface JwtConstants {
  secret: string;
  expiresIn: string;
}
