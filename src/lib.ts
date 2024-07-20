export const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL_PROD
    : process.env.CLIENT_URL_DEV;

export const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("No JWT secret defined");

  return secret;
};
