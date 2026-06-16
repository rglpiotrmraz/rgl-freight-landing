import { NextRequest, NextResponse } from "next/server";

const LISTMONK_API_URL = process.env.LISTMONK_API_URL;

const RGL_CSS = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap');

/* Mirror the homepage subscription form (app/components/subscription-form.tsx):
   Geist font, white card with gray-200 border + rounded-lg + shadow-sm,
   gray-300 inputs with black focus ring, solid black primary button. */

* {
  box-sizing: border-box;
}

html, body {
  font-family: 'Geist', system-ui, -apple-system, sans-serif !important;
  background: #ffffff !important;
  color: #111827 !important;
  margin: 0 !important;
  padding: 0 !important;
  line-height: 1.6 !important;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

body {
  display: flex;
  flex-direction: column;
}

main, .container, .wrap {
  flex: 1 0 auto;
}

/* Outer wrapper is just a centered column — strip Listmonk's frame/shadow */
.container, .wrap {
  width: 100% !important;
  max-width: 480px !important;
  margin: 0 auto !important;
  padding: 56px 24px !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* Header only held the (now stripped) Listmonk logo — hide its empty frame */
header, .header {
  display: none !important;
}

h1, .title {
  font-size: 28px !important;
  font-weight: 700 !important;
  letter-spacing: -0.025em !important;
  color: #111827 !important;
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  line-height: 1.15 !important;
}

h2 {
  font-size: 20px !important;
  font-weight: 600 !important;
  letter-spacing: -0.015em !important;
  color: #111827 !important;
  margin-top: 0 !important;
  margin-bottom: 16px !important;
}

h3 {
  font-size: 16px !important;
  font-weight: 600 !important;
  color: #111827 !important;
  margin-top: 0 !important;
  margin-bottom: 12px !important;
}

p {
  color: #4b5563 !important;
  font-size: 14px !important;
  line-height: 1.6 !important;
}

a {
  color: #111827 !important;
  text-decoration: underline !important;
  text-underline-offset: 2px !important;
}

a:hover {
  opacity: 0.7 !important;
}

/* Card: every section is one consistent white card. Opt-in, unsubscribe and
   privacy blocks all wrap their content in a <section>. No nested/outer frames. */
section {
  background: #ffffff !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 8px !important;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05) !important;
  padding: 28px 24px !important;
  margin: 0 0 16px 0 !important;
}

/* Forms are layout wrappers inside cards — never draw their own frame */
form.optin-form,
form.unsub-form,
form.data-form,
section form {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* Opt-in: the single mailing-list name adds nothing — hide it. The hidden
   <input name="l"> inside the same <ul> still submits (display:none doesn't
   stop form submission), so confirmation keeps working. */
.optin-form ul {
  display: none !important;
}

label {
  display: block !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #374151 !important;
  margin-bottom: 6px !important;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
textarea,
select {
  width: 100% !important;
  padding: 10px 12px !important;
  border: 1px solid #d1d5db !important;
  border-radius: 6px !important;
  font-size: 14px !important;
  color: #111827 !important;
  background: #ffffff !important;
  margin-top: 4px !important;
  margin-bottom: 16px !important;
  font-family: inherit !important;
  transition: border-color 0.15s, box-shadow 0.15s !important;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
input[type="number"]:focus,
textarea:focus,
select:focus {
  outline: none !important;
  border-color: transparent !important;
  box-shadow: 0 0 0 2px #000000 !important;
}

input[type="checkbox"],
input[type="radio"] {
  width: 18px !important;
  height: 18px !important;
  margin: 0 10px 0 0 !important;
  accent-color: #111827 !important;
  cursor: pointer !important;
  flex-shrink: 0 !important;
}

/* Rows that pair a control with its label (unsubscribe / privacy options) */
.row {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  margin-bottom: 10px !important;
}

.checkbox label,
label.checkbox,
label:has(input[type="checkbox"]),
label:has(input[type="radio"]) {
  display: flex !important;
  align-items: center !important;
  font-size: 14px !important;
  color: #374151 !important;
  cursor: pointer !important;
  margin-bottom: 12px !important;
}

/* Primary button — matches the black homepage Subscribe button */
button[type="submit"],
input[type="submit"],
.button, button {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  padding: 11px 24px !important;
  background: #000000 !important;
  color: #ffffff !important;
  border: 1px solid #000000 !important;
  border-radius: 6px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  cursor: pointer !important;
  margin-top: 8px !important;
  transition: background-color 0.15s, border-color 0.15s !important;
  font-family: inherit !important;
}

button[type="submit"]:hover,
input[type="submit"]:hover,
.button:hover,
button:hover {
  background: #1f2937 !important;
  border-color: #1f2937 !important;
}

/* Secondary / outline button (e.g. "Continue" on the data form) */
.button-outline,
input.button-outline {
  background: #ffffff !important;
  color: #111827 !important;
  border: 1px solid #d1d5db !important;
}

.button-outline:hover,
input.button-outline:hover {
  background: #f9fafb !important;
  border-color: #d1d5db !important;
}

ul {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 0 20px 0 !important;
}

li {
  padding: 12px 0 !important;
  border-bottom: 1px solid #f3f4f6 !important;
  font-size: 14px !important;
  color: #374151 !important;
}

li:last-child {
  border-bottom: none !important;
}

.message, .alert, .notice, .success, .error {
  padding: 16px !important;
  border-radius: 6px !important;
  margin-bottom: 20px !important;
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
  margin-bottom: 20px !important;
}

td, th {
  padding: 12px !important;
  border-bottom: 1px solid #f3f4f6 !important;
  text-align: left !important;
  font-size: 14px !important;
}

th {
  font-weight: 600 !important;
  color: #111827 !important;
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

    // Strip listmonk branding — remove text, links, images and containers
    modified = modified.replace(/Powered by\s*listmonk/gi, "");
    modified = modified.replace(/<p[^>]*>[\s\S]*?Powered by[\s\S]*?<\/p>/gi, "");
    modified = modified.replace(/<div[^>]*>[\s\S]*?Powered by[\s\S]*?<\/div>/gi, "");
    modified = modified.replace(/<span[^>]*>[\s\S]*?Powered by[\s\S]*?<\/span>/gi, "");
    modified = modified.replace(/<footer[^>]*>[\s\S]*?Powered by[\s\S]*?<\/footer>/gi, "");
    modified = modified.replace(/<a[^>]*href=["'][^"']*listmonk\.app[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, "");
    modified = modified.replace(/<img[^>]*(?:src|alt)=["'][^"']*listmonk[^"']*["'][^>]*\/?>/gi, "");
    // Listmonk's logo is served from /public/static/logo.svg with a generic
    // alt ("Confirm subscription" / "Unsubscribe..."), so it contains no
    // "listmonk" token — strip it by its source path and alt text instead.
    modified = modified.replace(/<img[^>]*src=["'][^"']*\/static\/logo[^"']*["'][^>]*\/?>/gi, "");
    modified = modified.replace(/<img[^>]*alt=["'][^"']*(?:subscription|unsubscribe)[^"']*["'][^>]*\/?>/gi, "");
    modified = modified.replace(/<[^>]*>\s*listmonk\s*<\/[^>]*>/gi, "");
    // Remove logo link with image (listmonk logo in <a> containing <img>)
    modified = modified.replace(/<a[^>]*href=["'][^"']*listmonk[^"']*["'][^>]*>[\s\S]*?<img[^>]*>[\s\S]*?<\/a>/gi, "");
    // Remove logo container div (e.g. <div class="logo"> with link+image)
    modified = modified.replace(/<div[^>]*class=["']logo["'][^>]*>[\s\S]*?<\/div>/gi, "");
    // Clean up empty elements that may remain
    modified = modified.replace(/<p[^>]*>\s*<\/p>/gi, "");
    modified = modified.replace(/<div[^>]*>\s*<\/div>/gi, "");

    // Opt-in page: replace generic listmonk wording with RGL-specific copy.
    // The mailing-list name itself is hidden via CSS (.optin-form ul).
    modified = modified.replace(
      /<h2>\s*Confirm\s*<\/h2>/gi,
      "<h2>Join the RGL partner network</h2>"
    );
    modified = modified.replace(
      /You have been added to the following lists:/gi,
      "Please confirm that you would like to join the RGL Robert Gajewski partner network and receive our latest freight offers directly in your inbox."
    );

    // Replace Listmonk's favicon with the RGL one served by Next at /favicon.ico
    modified = modified.replace(/<link[^>]*rel=["']icon["'][^>]*>/gi, "");
    const RGL_FAVICON = `<link rel="icon" href="/favicon.ico" sizes="any" />`;

    if (modified.includes("</head>")) {
      modified = modified.replace("</head>", `${RGL_FAVICON}${RGL_CSS}</head>`);
    } else if (modified.includes("<head>")) {
      modified = modified.replace("<head>", `<head>${RGL_FAVICON}${RGL_CSS}`);
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
