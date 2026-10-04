import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

export const CMS_REPOSITORY = 'faizhuda/jauhar-urban-farming';
export const OAUTH_COOKIE_PATH = '/oauth';
export const OAUTH_COOKIE_TTL = 600;
export const STATE_COOKIE = 'jauhar_oauth_state';
export const VERIFIER_COOKIE = 'jauhar_oauth_verifier';

export function createAuthorization(clientId: string, origin: string) {
  const state = randomBytes(32).toString('base64url');
  const verifier = randomBytes(32).toString('base64url');
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${origin}/oauth/callback`,
    // This repository is public. No private-repository or profile-write scope is needed.
    scope: 'public_repo',
    state,
    code_challenge: createHash('sha256').update(verifier).digest('base64url'),
    code_challenge_method: 'S256',
  });
  return { state, verifier, url: `https://github.com/login/oauth/authorize?${params}` };
}

export function validState(received: string | null, expected: string | undefined): boolean {
  if (
    !received ||
    !expected ||
    !/^[A-Za-z0-9_-]{43}$/.test(received) ||
    !/^[A-Za-z0-9_-]{43}$/.test(expected)
  )
    return false;
  return timingSafeEqual(Buffer.from(received), Buffer.from(expected));
}

export async function exchangeCode(
  config: {
    clientId: string;
    clientSecret: string;
    origin: string;
    code: string;
    verifier: string;
  },
  request: typeof fetch = fetch,
): Promise<string> {
  const response = await request('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code: config.code,
      redirect_uri: `${config.origin}/oauth/callback`,
      code_verifier: config.verifier,
    }),
    signal: AbortSignal.timeout(15_000),
  });
  const body = await response.json();
  if (!response.ok || typeof body.access_token !== 'string' || !body.access_token)
    throw new Error('GitHub could not complete sign-in. Please try again.');

  // A successful GitHub login alone must not grant editing rights to this site.
  const repository = await request(`https://api.github.com/repos/${CMS_REPOSITORY}`, {
    headers: {
      Authorization: `Bearer ${body.access_token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    signal: AbortSignal.timeout(15_000),
  });
  const repo = await repository.json();
  if (!repository.ok || repo.permissions?.push !== true)
    throw new Error(
      'This GitHub account has not been invited to manage the website. Ask the website owner for access.',
    );
  return body.access_token;
}

function scriptValue(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

export function authorizationResponse(
  origin: string,
  result: { token: string } | { error: string },
  status = 200,
): Response {
  const nonce = randomBytes(18).toString('base64url');
  const successful = 'token' in result;
  const statusText = 'error' in result ? result.error : 'Returning to the website manager…';
  const message = `authorization:github:${successful ? 'success' : 'error'}:${JSON.stringify({ ...result, provider: 'github' })}`;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Website sign-in</title></head><body><p id="status">Returning to the website manager…</p><p><a href="/admin/">Return to the website manager</a></p><script nonce="${nonce}">
    const expectedOrigin = ${scriptValue(origin)};
    const message = ${scriptValue(message)};
    document.getElementById('status').textContent = ${scriptValue(statusText)};
    const receiveMessage = event => {
      if (event.origin !== expectedOrigin || event.source !== window.opener || event.data !== 'authorizing:github') return;
      window.opener.postMessage(message, expectedOrigin);
      window.removeEventListener('message', receiveMessage);
    };
    if (window.opener) {
      window.addEventListener('message', receiveMessage);
      window.opener.postMessage('authorizing:github', expectedOrigin);
    } else if (${successful}) {
      document.getElementById('status').textContent = 'Open the website manager and choose Sign in with GitHub.';
    }
  </script></body></html>`;
  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Referrer-Policy': 'no-referrer',
      'X-Robots-Tag': 'noindex, nofollow',
      'Content-Security-Policy': `default-src 'none'; script-src 'nonce-${nonce}'; base-uri 'none'; frame-ancestors 'none'`,
    },
  });
}
