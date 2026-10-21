declare const __HOSTED__: boolean;

export const hosted = typeof __HOSTED__ !== 'undefined' && __HOSTED__;

export async function apiRequest(path: string, data?: unknown): Promise<Response> {
  if (hosted) {
    const { hostedRequest } = await import('../web/hosted-api');
    return hostedRequest(path, data);
  }
  return fetch('/api/' + path, {
    method: data === undefined ? 'GET' : 'POST',
    headers: data === undefined ? {} : { 'Content-Type': 'application/json' },
    body: data === undefined ? undefined : JSON.stringify(data),
  });
}
