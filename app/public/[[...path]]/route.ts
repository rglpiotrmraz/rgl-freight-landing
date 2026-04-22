import { NextRequest, NextResponse } from "next/server";

const LISTMONK_API_URL = process.env.LISTMONK_API_URL;

async function proxyToListmonk(request: NextRequest) {
  if (!LISTMONK_API_URL) {
    console.error("LISTMONK_API_URL not set");
    return new NextResponse("Server configuration error", { status: 500 });
  }

  const { pathname, search } = request.nextUrl;
  const targetUrl = `${LISTMONK_API_URL}${pathname}${search}`;

  const headers = new Headers();
  headers.set("ngrok-skip-browser-warning", "1");

  const forwardHeaders = ["accept", "accept-language", "content-type", "cookie"];
  for (const name of forwardHeaders) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  const body =
    request.method !== "GET" && request.method !== "HEAD"
      ? await request.arrayBuffer()
      : undefined;

  try {
    const upstream = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
    });

    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.delete("content-encoding");

    return new NextResponse(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy to listmonk failed:", error);
    return new NextResponse("Upstream service unavailable", { status: 502 });
  }
}

export const GET = proxyToListmonk;
export const POST = proxyToListmonk;
export const HEAD = proxyToListmonk;
