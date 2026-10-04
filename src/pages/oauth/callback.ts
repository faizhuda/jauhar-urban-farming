import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import {
  validState,
  exchangeCode,
  authorizationResponse,
  OAUTH_COOKIE_PATH,
  STATE_COOKIE,
  VERIFIER_COOKIE,
} from '../../server/github-oauth';

export const prerender = false;
export const GET: APIRoute = async ({ cookies, site, url }) => {
  const origin = import.meta.env.DEV ? url.origin : site!.origin;
  const state = cookies.get(STATE_COOKIE)?.value;
  const verifier = cookies.get(VERIFIER_COOKIE)?.value;
  cookies.delete(STATE_COOKIE, { path: OAUTH_COOKIE_PATH });
  cookies.delete(VERIFIER_COOKIE, { path: OAUTH_COOKIE_PATH });
  if (
    !validState(url.searchParams.get('state'), state) ||
    !verifier ||
    !/^[A-Za-z0-9_-]{43}$/.test(verifier)
  ) {
    return authorizationResponse(
      origin,
      { error: 'Sign-in expired or could not be verified. Please sign in again.' },
      400,
    );
  }
  const clientId = getSecret('OAUTH_GITHUB_CLIENT_ID');
  const clientSecret = getSecret('OAUTH_GITHUB_CLIENT_SECRET');
  const code = url.searchParams.get('code');
  if (!clientId || !clientSecret)
    return authorizationResponse(
      origin,
      { error: 'Website sign-in is not configured. Contact the website owner.' },
      503,
    );
  if (!code || url.searchParams.has('error'))
    return authorizationResponse(
      origin,
      { error: 'GitHub sign-in was cancelled. Please try again.' },
      400,
    );
  try {
    const token = await exchangeCode({ clientId, clientSecret, origin, code, verifier });
    return authorizationResponse(origin, { token });
  } catch (error) {
    // Neither tokens nor GitHub response bodies are written to logs or error URLs.
    const message =
      error instanceof Error &&
      !['AbortError', 'TimeoutError', 'SyntaxError', 'TypeError'].includes(error.name)
        ? error.message
        : 'GitHub is temporarily unavailable. Please try signing in again.';
    return authorizationResponse(origin, { error: message }, 502);
  }
};
