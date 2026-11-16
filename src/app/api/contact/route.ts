import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // Honeypot field
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
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
    const toEmail = process.env.CONTACT_TO_EMAIL || "pubuduhar@gmail.com";

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
          to: [toEmail],
          reply_to: email,
          subject: `New Portfolio Enquiry from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
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

    // No RESEND_API_KEY configured yet; client can still offer direct mailto/WhatsApp
    return NextResponse.json({ ok: true, mode: "fallback" });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
