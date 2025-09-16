import { createCookieSessionStorage } from "react-router";

const COMPANY_SESSION_SECRET =
  import.meta.env.VITE_SESSION_COMPANY_SECRET || "default_secret_key";

if (!import.meta.env.VITE_SESSION_COMPANY_SECRET) {
  console.warn(
    "Warning: VITE_SESSION_COMPANY_SECRET is not set in environment variables. Using an insecure default key."
  );
}

export const companySessionStorage = createCookieSessionStorage({
  cookie: {
    name: "company_auth_token", // Cookie name
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    httpOnly: true, // Prevent JavaScript access
    sameSite: "lax", // Protect against CSRF
    path: "/", // Available on all routes
    maxAge: 60 * 60 * 24, // 1 day
    secrets: [COMPANY_SESSION_SECRET],
  },
});

export const {
  getSession: getCompanySession,
  commitSession: commitCompanySession,
  destroySession: destroyCompanySession,
} = companySessionStorage;

// User session
const USER_SESSION_SECRET =
  import.meta.env.VITE_SESSION_USER_SECRET || "default_user_secret";

if (!import.meta.env.VITE_SESSION_USER_SECRET) {
  console.warn(
    "Warning: VITE_SESSION_USER_SECRET is not set in environment variables. Using an insecure default key."
  );
}

const userSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "user_auth_token",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
    secrets: [USER_SESSION_SECRET],
  },
});

export const {
  getSession: getUserSession,
  commitSession: commitUserSession,
  destroySession: destroyUserSession,
} = userSessionStorage;
//TODO :DElete this file