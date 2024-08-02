/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { env } from "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    env: {
      DATABASE_URL: env.DATABASE_URL,
      DIRECT_URL: env.DIRECT_URL,
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: env.PUBLIC_CLERK_PUBLISHABLE_KEY,
      CLERK_SECRET_KEY: env.CLERK_SECRET_KEY,
      NEXT_PUBLIC_CLERK_SIGN_IN_URL: env.PUBLIC_CLERK_SIGN_IN_URL,
      NEXT_PUBLIC_CLERK_SIGN_UP_URL: env.PUBLIC_CLERK_SIGN_UP_URL,
      NODE_ENV: env.NODE_ENV,
    },
  };

export default config;
