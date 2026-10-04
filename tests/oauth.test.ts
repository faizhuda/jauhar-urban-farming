import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import {
  createAuthorization,
  validState,
  exchangeCode,
  authorizationResponse,
} from '../src/server/github-oauth.ts';

test('authorization binds random state, PKCE and the registered callback without private repo access', () => {
  const first = createAuthorization('test-client', 'https://example.com');
  const second = createAuthorization('test-client', 'https://example.com');
  const params = new URL(first.url).searchParams;
  assert.notEqual(first.state, second.state);
  assert.notEqual(first.verifier, second.verifier);
  assert.equal(params.get('scope'), 'public_repo');
  assert.equal(params.get('redirect_uri'), 'https://example.com/oauth/callback');
  assert.equal(params.get('code_challenge_method'), 'S256');
  assert.equal(
    params.get('code_challenge'),
    createHash('sha256').update(first.verifier).digest('base64url'),
  );
  assert.equal(validState(first.state, first.state), true);
  for (const [received, expected] of [
    [null, first.state],
    [first.state, undefined],
    [second.state, first.state],
    ['x', first.state],
    [first.state, 'é'.repeat(43)],
  ] as const) {
    assert.equal(validState(received, expected), false);
  }
});

test('code exchange sends the verifier and requires write access to this repository', async () => {
  const calls: { url: string; options?: RequestInit }[] = [];
  const request = (async (url: string | URL | Request, options?: RequestInit) => {
    calls.push({ url: String(url), options });
    return Response.json(
      calls.length === 1 ? { access_token: 'test-token' } : { permissions: { push: true } },
    );
  }) as typeof fetch;
  const options = {
    clientId: 'test-client',
    clientSecret: 'test-secret',
    origin: 'https://example.com',
    code: 'test-code',
    verifier: 'test-verifier',
  };
  assert.equal(await exchangeCode(options, request), 'test-token');
  assert.equal(JSON.parse(String(calls[0].options?.body)).code_verifier, 'test-verifier');
  assert.equal(calls[1].url, 'https://api.github.com/repos/faizhuda/jauhar-urban-farming');
  let count = 0;
  const noAccess = (async () =>
    Response.json(
      ++count === 1 ? { access_token: 'test-token' } : { permissions: { push: false } },
    )) as typeof fetch;
  await assert.rejects(exchangeCode(options, noAccess), /not been invited/);
  const invalidCode = (async () =>
    Response.json({ error: 'bad_verification_code' }, { status: 400 })) as typeof fetch;
  await assert.rejects(exchangeCode(options, invalidCode), /could not complete/);
});

test('popup sends credentials only to the exact opener after the expected handshake', async () => {
  const response = authorizationResponse('https://example.com', {
    token: 'test-token</script><script>bad()</script>',
  });
  const html = await response.text();
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.match(response.headers.get('content-security-policy')!, /script-src 'nonce-/);
  assert.equal(html.includes('<script>bad()'), false);
  const sent: { message: string; origin: string }[] = [];
  let listener: (event: { origin: string; source: object; data: string }) => void = () => {};
  const opener = {
    postMessage: (message: string, origin: string) => sent.push({ message, origin }),
  };
  const script = html.match(/<script nonce="[^"]+">([\s\S]+)<\/script>/)![1];
  runInNewContext(script, {
    document: { getElementById: () => ({ textContent: '' }) },
    window: {
      opener,
      addEventListener: (_name: string, callback: typeof listener) => {
        listener = callback;
      },
      removeEventListener: () => {},
    },
  });
  assert.deepEqual(sent, [{ message: 'authorizing:github', origin: 'https://example.com' }]);
  listener({ origin: 'https://attacker.test', source: opener, data: 'authorizing:github' });
  listener({ origin: 'https://example.com', source: {}, data: 'authorizing:github' });
  listener({ origin: 'https://example.com', source: opener, data: 'wrong-handshake' });
  assert.equal(sent.length, 1);
  listener({ origin: 'https://example.com', source: opener, data: 'authorizing:github' });
  assert.equal(sent.length, 2);
  assert.equal(sent[1].origin, 'https://example.com');
  assert.match(sent[1].message, /^authorization:github:success:/);
});

test('a failed direct sign-in still explains the problem without a popup opener', async () => {
  const response = authorizationResponse(
    'https://example.com',
    { error: 'Website sign-in is not configured. Contact the website owner.' },
    503,
  );
  const html = await response.text();
  const status = { textContent: '' };
  runInNewContext(html.match(/<script nonce="[^"]+">([\s\S]+)<\/script>/)![1], {
    document: { getElementById: () => status },
    window: { opener: null },
  });
  assert.equal(response.status, 503);
  assert.match(status.textContent, /not configured/);
});
