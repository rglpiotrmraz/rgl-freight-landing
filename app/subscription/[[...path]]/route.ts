import { NextRequest, NextResponse } from "next/server";

const LISTMONK_API_URL = process.env.LISTMONK_API_URL;

const RGL_CSS = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
}

html, body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
  background: #ffffff !important;
  color: #111111 !important;
  margin: 0 !important;
  padding: 0 !important;
  line-height: 1.6 !important;
  min-height: 100vh;
}

body {
  display: flex;
  flex-direction: column;
}

main, .container, .wrap, section {
  flex: 1 0 auto;
}

.container, .wrap {
  max-width: 680px !important;
  margin: 0 auto !important;
  padding: 48px 24px !important;
}

header, .header {
  text-align: center !important;
  margin-bottom: 40px !important;
}

h1, .title {
  font-size: 36px !important;
  font-weight: 700 !important;
  letter-spacing: -0.025em !important;
  color: #000000 !important;
  margin-top: 0 !important;
  margin-bottom: 16px !important;
  line-height: 1.1 !important;
}

h2 {
  font-size: 24px !important;
  font-weight: 600 !important;
  color: #111111 !important;
  margin-top: 0 !important;
}

h3 {
  font-size: 18px !important;
  font-weight: 600 !important;
  color: #111111 !important;
  margin-top: 0 !important;
  margin-bottom: 16px !important;
}

p {
  color: #4b5563 !important;
  font-size: 16px !important;
  line-height: 1.6 !important;
}

a {
  color: #111111 !important;
  text-decoration: underline !important;
}

a:hover {
  opacity: 0.8 !important;
}

form {
  margin-top: 24px !important;
  background: #ffffff !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 8px !important;
  padding: 32px 24px !important;
}

label {
  display: block !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #374151 !important;
  margin-bottom: 4px !important;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
textarea,
select {
  width: 100% !important;
  padding: 10px 14px !important;
  border: 1px solid #d1d5db !important;
  border-radius: 6px !important;
  font-size: 14px !important;
  color: #111111 !important;
  background: #ffffff !important;
  margin-top: 4px !important;
  margin-bottom: 16px !important;
  font-family: 'Inter', system-ui, sans-serif !important;
  transition: border-color 0.15s, box-shadow 0.15s !important;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
input[type="number"]:focus,
textarea:focus,
select:focus {
  outline: none !important;
  border-color: #111111 !important;
  box-shadow: 0 0 0 2px rgba(0,0,0,0.05) !important;
}

input[type="checkbox"],
input[type="radio"] {
  width: 18px !important;
  height: 18px !important;
  margin-right: 10px !important;
  accent-color: #dc2626 !important;
  cursor: pointer !important;
  flex-shrink: 0 !important;
}

.checkbox label,
label.checkbox,
label:has(input[type="checkbox"]) {
  display: flex !important;
  align-items: center !important;
  font-size: 14px !important;
  color: #374151 !important;
  cursor: pointer !important;
  margin-bottom: 12px !important;
}

button[type="submit"],
input[type="submit"],
.button, button {
  width: 100% !important;
  padding: 12px 24px !important;
  background: #dc2626 !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 6px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  margin-top: 8px !important;
  transition: background-color 0.2s !important;
  font-family: 'Inter', system-ui, sans-serif !important;
}

button[type="submit"]:hover,
input[type="submit"]:hover,
.button:hover,
button:hover {
  background: #b91c1c !important;
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

.message, .alert, .notice, .success, .error {
  padding: 16px !important;
  border-radius: 8px !important;
  margin-bottom: 24px !important;
  font-size: 14px !important;
}

.message.success, .success {
  background: #f0fdf4 !important;
  color: #166534 !important;
  border: 1px solid #bbf7d0 !important;
}

.message.error, .error {
  background: #fef2f2 !important;
  color: #991b1b !important;
  border: 1px solid #fecaca !important;
}

table {
  width: 100% !important;
  border-collapse: collapse !important;
  margin-bottom: 24px !important;
}

td, th {
  padding: 12px !important;
  border-bottom: 1px solid #f3f4f6 !important;
  text-align: left !important;
  font-size: 14px !important;
}

th {
  font-weight: 600 !important;
  color: #111111 !important;
  border-bottom: 2px solid #e5e7eb !important;
}

code, pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 13px !important;
  background: #f9fafb !important;
  padding: 2px 6px !important;
  border-radius: 4px !important;
}

pre {
  padding: 16px !important;
  overflow-x: auto !important;
}
</style>
`;

const RGL_FOOTER = `
<footer style="border-top:1px solid #e5e7eb;background:#ffffff;margin-top:auto;font-family:'Inter',system-ui,sans-serif;">
  <div style="max-width:1024px;margin:0 auto;padding:48px 16px 32px;">
    <div style="margin-bottom:40px;">
      <img src="https://img2.gimm.io/6cb3626c-e7fc-4185-bf1a-8236cccf1c51/-/resize/266x186/img.png" alt="RGL Logistics Network logo" width="140" style="height:auto;display:block;">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;">
      <div>
        <h2 style="font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#111827;border-bottom:2px solid #374151;padding-bottom:8px;margin:0 0 16px 0;">Contact</h2>
        <address style="font-style:normal;font-size:14px;line-height:1.6;color:#4b5563;">
          <p style="margin:0 0 4px 0;font-weight:500;color:#111827;">Piotr Mraz</p>
          <p style="margin:0 0 4px 0;"><a href="mailto:p.mraz@rgl.com.pl" style="color:#4b5563;text-decoration:underline;text-underline-offset:2px;">p.mraz@rgl.com.pl</a></p>
          <p style="margin:0 0 4px 0;"><a href="tel:+48577930002" style="color:#4b5563;text-decoration:none;">+48 577 930 002</a></p>
          <p style="margin:0;"><a href="https://www.rgl.com.pl" target="_blank" rel="noopener noreferrer" style="color:#4b5563;text-decoration:underline;text-underline-offset:2px;">www.rgl.com.pl</a></p>
        </address>
      </div>
      <div>
        <h2 style="font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#111827;border-bottom:2px solid #374151;padding-bottom:8px;margin:0 0 16px 0;">Business Info</h2>
        <div style="font-size:14px;line-height:1.6;color:#4b5563;">
          <p style="margin:0 0 4px 0;font-weight:500;color:#111827;">RGL Robert Gajewski</p>
          <p style="margin:0 0 4px 0;">ul. Krakowska 28a</p>
          <p style="margin:0 0 4px 0;">45-018 Opole</p>
          <p style="margin:0 0 4px 0;">NIP: PL7532000665</p>
          <p style="margin:0;">Timocom ID: 330086</p>
        </div>
      </div>
    </div>
    <div style="margin-top:40px;border-top:1px solid #e5e7eb;padding-top:24px;text-align:center;">
      <p style="font-size:12px;color:#6b7280;margin:0;">&copy; 2026 RGL Logistics Network. All rights reserved.</p>
    </div>
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

    // For HTML: inject RGL branding and strip listmonk branding
    const html = await upstream.text();
    let modified = html;

    // Strip "Powered by listmonk"
    modified = modified.replace(/Powered by listmonk/gi, "");
    modified = modified.replace(/<[^>]*>\s*listmonk\s*<\/[^>]*>/gi, "");

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
    responseHeaders.set("content-type", "text/html; charset=utf-8");
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
