import { NextRequest, NextResponse } from 'next/server';

const serverApiUrl = process.env.API_URL ?? 'http://localhost:13001';

async function proxy(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const target = new URL(`${serverApiUrl}/${path.join('/')}`);
  request.nextUrl.searchParams.forEach((value, key) => target.searchParams.set(key, value));

  const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.text();
  const response = await fetch(target, {
    method: request.method,
    headers: { 'Content-Type': request.headers.get('content-type') ?? 'application/json' },
    body,
    cache: 'no-store',
  });

  const text = await response.text();
  return new NextResponse(text, {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('content-type') ?? 'application/json',
    },
  });
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
