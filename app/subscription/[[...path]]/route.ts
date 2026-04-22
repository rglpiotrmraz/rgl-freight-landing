import { NextRequest, NextResponse } from "next/server";

const LISTMONK_API_URL = process.env.LISTMONK_API_URL;

const RGL_CSS = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
  background: #ffffff !important;
  color: #111111 !important;
  margin: 0 !important;
  padding: 0 !important;
  line-height: 1.6 !important;
}

.container {
  max-width: 680px !important;
  margin: 0 auto !important;
  padding: 48px 24px !important;
}

header {
  text-align: center !important;
  margin-bottom: 40px !important;
}

header h1, h1, h2, h3 {
  font-weight: 600 !important;
  color: #111111 !important;
  margin-top: 0 !important;
}

header p, p {
  color: #666666 !important;
}

main {
  min-height: calc(100vh - 400px) !important;
}

form {
  margin-top: 24px !important;
}

form h3 {
  font-size: 18px !important;
  margin-bottom: 16px !important;
}

label {
  display: flex !important;
  align-items: center !important;
  font-size: 15px !important;
  color: #374151 !important;
  cursor: pointer !important;
}

input[type="checkbox"] {
  width: 18px !important;
  height: 18px !important;
  margin-right: 10px !important;
  accent-color: #111111 !important;
  cursor: pointer !important;
  flex-shrink: 0 !important;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea {
  width: 100% !important;
  padding: 12px 16px !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 8px !important;
  font-size: 16px !important;
  color: #111111 !important;
  background: #ffffff !important;
  margin-top: 8px !important;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
textarea:focus {
  outline: none !important;
  border-color: #111111 !important;
}

button[type="submit"],
input[type="submit"],
button {
  width: 100% !important;
  padding: 14px 24px !important;
  background: #111111 !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 8px !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  cursor: pointer !important;
  margin-top: 24px !important;
  transition: opacity 0.2s !important;
}

button[type="submit"]:hover,
input[type="submit"]:hover,
button:hover {
  opacity: 0.9 !important;
}

ul {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 0 24px 0 !important;
}

li {
  padding: 12px 0 !important;
  border-bottom: 1px solid #f3f4f6 !important;
}

li:last-child {
  border-bottom: none !important;
}

.message, .alert, .notice {
  padding: 16px !important;
  border-radius: 8px !important;
  margin-bottom: 24px !important;
}

a {
  color: #111111 !important;
  text-decoration: underline !important;
}

a:hover {
  opacity: 0.8 !important;
}
</style>
`;

const RGL_FOOTER = `
<footer style="border-top:1px solid #e5e7eb;background:#ffffff;margin-top:64px;padding:48px 24px 32px;font-family:'Inter',system-ui,sans-serif;">
  <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;">
    <div>
      <h4 style="font-size:16px;font-weight:600;color:#111;margin:0 0 16px 0;">Contact</h4>
      <address style="font-style:normal;font-size:14px;line-height:1.6;color:#666;">
        RGL Freight Polska Sp. z o.o.<br>
        ul. Wielicka 28<br>
        30-552 Kraków<br>
        <a href="mailto:biuro@rgl.com.pl" style="color:#666;text-decoration:none;">biuro@rgl.com.pl</a><br>
        <a href="tel:+48123064050" style="color:#666;text-decoration:none;">+48 12 306 40 50</a>
      </address>
    </div>
    <div>
      <h4 style="font-size:16px;font-weight:600;color:#111;margin:0 0 16px 0;">Business Info</h4>
      <div style="font-size:14px;line-height:1.6;color:#666;">
        NIP: 6751722268<br>
        KRS: 0000926410<br>
        REGON: 520424402
      </div>
    </div>
  </div>
  <div style="max-width:1200px;margin:32px auto 0;padding-top:24px;border-top:1px solid #e5e7eb;text-align:center;font-size:12px;color:#9ca3af;">
    © 2025 RGL Freight Polska Sp. z o.o. All rights reserved.
  </div>
</footer>
`;

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

    const contentType = upstream.headers.get("content-type") || "";
    const isHtml = contentType.includes("text/html");

    // Stream non-HTML and redirects unchanged
    if (!isHtml || (upstream.status >= 300 && upstream.status < 400)) {
      const responseHeaders = new Headers(upstream.headers);
      responseHeaders.delete("content-encoding");
      return new NextResponse(upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers: responseHeaders,
      });
    }

    // For HTML: inject RGL branding
    const html = await upstream.text();
    let modified = html;

    if (modified.includes("</head>")) {
      modified = modified.replace("</head>", `${RGL_CSS}</head>`);
    } else if (modified.includes("<head>")) {
      modified = modified.replace("<head>", `<head>${RGL_CSS}`);
    }

    if (modified.includes("</body>")) {
      modified = modified.replace("</body>", `${RGL_FOOTER}</body>`);
    }

    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.set(
      "content-length",
      String(new TextEncoder().encode(modified).length)
    );

    return new NextResponse(modified, {
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
