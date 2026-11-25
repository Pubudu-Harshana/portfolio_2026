import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // Honeypot field
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  if (rateLimitMap.size > 500) {
    for (const [key, entry] of rateLimitMap.entries()) {
      if (entry.resetAt <= now) rateLimitMap.delete(key);
    }
  }

  const current = rateLimitMap.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEnquiryEmailHtml(params: {
  name: string;
  email: string;
  message: string;
  siteUrl: string;
}): string {
  const safeName = escapeHtml(params.name);
  const safeEmail = escapeHtml(params.email);
  const safeMessage = escapeHtml(params.message).replace(/\r?\n/g, "<br />");
  const replySubject = encodeURIComponent("Re: Your enquiry on pubudu.online");
  const replyHref = `mailto:${encodeURIComponent(params.email)}?subject=${replySubject}`;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Portfolio Enquiry</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F4F1ED;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#141414;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F4F1ED;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#FFFFFF;border-radius:20px;overflow:hidden;border:1px solid #EAE6E1;">
            <!-- Header -->
            <tr>
              <td style="background-color:#141414;padding:28px 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <span style="display:inline-block;width:30px;height:30px;line-height:30px;text-align:center;border-radius:8px;background-color:#E85D04;color:#FFFFFF;font-weight:800;font-size:16px;vertical-align:middle;">P</span>
                      <span style="margin-left:10px;color:#FFFFFF;font-size:15px;font-weight:700;letter-spacing:0.04em;vertical-align:middle;">Pubudu H.</span>
                    </td>
                    <td align="right" style="vertical-align:middle;">
                      <span style="display:inline-block;padding:5px 12px;border-radius:999px;background-color:rgba(232,93,4,0.18);border:1px solid rgba(255,123,0,0.4);color:#FF9E44;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">New Enquiry</span>
                    </td>
                  </tr>
                </table>
                <h1 style="margin:20px 0 6px;color:#FFFFFF;font-size:24px;line-height:1.25;font-weight:800;letter-spacing:-0.02em;">
                  New project message from ${safeName}
                </h1>
                <p style="margin:0;color:#A3A3A3;font-size:13px;">
                  Submitted via your portfolio contact form
                </p>
              </td>
            </tr>

            <!-- Sender Details -->
            <tr>
              <td style="padding:28px 32px 0;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#FAF8F6;border:1px solid #EAE6E1;border-radius:14px;padding:18px 20px;">
                  <tr>
                    <td style="padding-bottom:10px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8A8A8A;width:90px;">From</td>
                    <td style="padding-bottom:10px;font-size:14px;font-weight:700;color:#141414;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8A8A8A;">Email</td>
                    <td style="font-size:14px;font-weight:600;">
                      <a href="mailto:${safeEmail}" style="color:#E85D04;text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Message Body -->
            <tr>
              <td style="padding:22px 32px 0;">
                <div style="font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#E85D04;margin-bottom:10px;">
                  Project Brief
                </div>
                <div style="background-color:#FAF8F6;border-left:3px solid #E85D04;border-radius:10px;padding:18px 20px;font-size:15px;line-height:1.65;color:#262626;">
                  ${safeMessage}
                </div>
              </td>
            </tr>

            <!-- Reply CTA -->
            <tr>
              <td style="padding:28px 32px 32px;">
                <a href="${replyHref}" style="display:inline-block;background-color:#E85D04;color:#FFFFFF;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:14px 26px;border-radius:999px;">
                  Reply to ${safeName} &rarr;
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#FAF8F6;border-top:1px solid #EAE6E1;padding:18px 32px;font-size:12px;color:#737373;">
                Sent from <a href="${escapeHtml(params.siteUrl)}" style="color:#141414;font-weight:600;text-decoration:none;">${escapeHtml(params.siteUrl.replace(/^https?:\/\//, ""))}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for") || "";
    const clientIp =
      forwardedFor.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const rate = checkRateLimit(clientIp);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many enquiries sent. Please try again in a few minutes." },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSec) },
        }
      );
    }

    const body = (await request.json()) as ContactPayload;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();
    const honeypot = (body.company ?? "").trim();

    // Silently accept bot submissions that fill the hidden honeypot
    if (honeypot.length > 0) {
      return NextResponse.json({ ok: true, mode: "accepted" });
    }

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json(
        { error: "Please enter your name (2–120 characters)." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email) || email.length > 160) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 3000) {
      return NextResponse.json(
        { error: "Please share a brief project message (10–3000 characters)." },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    const rawToEmails = process.env.CONTACT_TO_EMAIL || "pubuduhar@gmail.com";
    const toEmails = rawToEmails
      .split(",")
      .map((addr) => addr.trim())
      .filter(Boolean);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pubudu.online";

    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "Portfolio Enquiry <onboarding@resend.dev>",
          to: toEmails.length > 0 ? toEmails : ["pubuduhar@gmail.com"],
          reply_to: email,
          subject: `New Portfolio Enquiry from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: buildEnquiryEmailHtml({ name, email, message, siteUrl }),
        }),
      });

      if (!res.ok) {
        return NextResponse.json(
          { error: "Unable to send email right now. Please try WhatsApp or direct email." },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true, mode: "delivered" });
    }

    return NextResponse.json({ ok: true, mode: "fallback" });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
