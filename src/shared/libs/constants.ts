/** Base URL of the application */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? '';

/** Base URL of the external API */
export const APP_API = process.env.NEXT_PUBLIC_APP_API ?? '';

/** Cookie key used to store the auth session token */
export const AUTH_TOKEN_KEY = 'auth_token';

/** Routes that require authentication */
export const PROTECTED_ROUTES = ['/admin'];

/** Public-only routes (redirect to dashboard if already authenticated) */
export const PUBLIC_ONLY_ROUTES = ['/login'];

/** Default redirect after successful login */
export const DEFAULT_AUTH_REDIRECT = '/admin/dashboard';

/** Default redirect when unauthenticated */
export const DEFAULT_LOGIN_REDIRECT = '/login';
