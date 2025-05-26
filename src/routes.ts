/** An array of routes that are accessible to authenticated uses */
export const privateRoutes = ["/private"];

/** An array of routes that are accessible to admin uses */
export const adminRoutes = ["/admin"];

/** Authentication routes */
export const authRoutes = ["/auth"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix = "/api/auth";

/** The signin route */
export const SIGNIN_ROUTE = "/auth/signin";

/** The default redirect path after logging in */
export const DEFAULT_LOGIN_REDIRECT = "/private/home";

/** The default redirect path after logging out */
export const DEFAULT_LOGOUT_REDIRECT = "/";
