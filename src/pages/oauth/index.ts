import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import {
  createAuthorization,
  authorizationResponse,
  OAUTH_COOKIE_PATH,
  OAUTH_COOKIE_TTL,
  STATE_COOKIE,
  VERIFIER_COOKIE,
} from '../../server/github-oauth';

export const prerender = false;
export const GET: APIRoute = ({ cookies, site, url }) => {
  const origin = import.meta.env.DEV ? url.origin : site!.origin;
  if (url.origin !== origin)
    return new Response(null, {
      status: 302,
      headers: { Location: `${origin}/admin/`, 'Cache-Control': 'no-store' },
    });
  const clientId = getSecret('OAUTH_GITHUB_CLIENT_ID');
  const clientSecret = getSecret('OAUTH_GITHUB_CLIENT_SECRET');
  if (!clientId || !clientSecret)
    return authorizationResponse(
      origin,
      {
        error:
          'Website sign-in is not configured. Ask the website owner to check the login settings.',
      },
      503,
    );
  const auth = createAuthorization(clientId, origin);
  const options = {
    path: OAUTH_COOKIE_PATH,
    httpOnly: true,
    secure: url.protocol === 'https:',
    sameSite: 'lax' as const,
    maxAge: OAUTH_COOKIE_TTL,
  };
  cookies.set(STATE_COOKIE, auth.state, options);
  cookies.set(VERIFIER_COOKIE, auth.verifier, options);
  return new Response(null, {
    status: 302,
    headers: { Location: auth.url, 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' },
  });
};
