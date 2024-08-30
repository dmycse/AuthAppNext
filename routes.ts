
/**
 * These routes don't require authentication
 * @type{ stirng[] }
 */
export const publicRoutes = [
  '/',
];

/**
 * These routes redirect "signed in" users to '/settings'
 * @type{ stirng[] }
 */
export const authRoutes = [
  '/auth/signin',
  '/auth/signup'
];

/**
 * Routes that begin with this prefix are used for
 * API authentication purposes
 * @type{ stirng } 
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after signin
 * @type{ stirng }
 */
export const DEFAULT_SIGNIN_REDIRECT = '/settings';