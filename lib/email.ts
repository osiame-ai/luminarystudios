/**
 * Luminary Studios — Resend email template
 * Clean HTML, table-based for email client compatibility.
 *
 * SECURITY: every interpolated value is passed through escapeHtml() below.
 * Do not insert user-supplied data into the template without escaping.
 */

interface EmailData {
  name:     string;
  company?: string;
  email:    string;
  message:  string;
  service?: string;
  phone?:   string;
  subject?: string; // override for booking requests
}

/** Escape the 5 HTML special chars so user input cannot break the template or inject markup. */
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Encode a value for safe use inside an href/src attribute. Covers href-based URI fragments. */
function escapeAttr(input: string): string {
  return encodeURI(input).replace(/"/g, "%22");
}

export function buildContactEmailHtml(data: EmailData): string {
  const { name, company, email, message, service, phone } = data;

  const isBooking = !!phone; // phone present → booking request from /book page

  // Pre-escape every user-supplied string used in HTML content.
  const safeName    = escapeHtml(name);
  const safeCompany = company ? escapeHtml(company)  : "";
  const safeEmail   = escapeHtml(email);
  const safePhone   = phone   ? escapeHtml(phone)    : "";
  const safeService = service ? escapeHtml(service)  : "";
  const safeMessage = escapeHtml(message);
  const safeFirstName = escapeHtml(name.split(" ")[0] ?? "");

  // Pre-escape for use inside href="..." attributes.
  const hrefEmail = escapeAttr(`mailto:${email}`);
  const hrefPhone = phone ? escapeAttr(`tel:${phone}`) : "";

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding: 8px 0; vertical-align: top; width: 120px; color: #525252; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
        ${label}
      </td>
      <td style="padding: 8px 0; color: #0A0A0B; font-size: 15px;">
        ${value}
      </td>
    </tr>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${isBooking ? "New booking request" : "New enquiry"} — Luminary Studios</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F7F6F3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
    <tr>
      <td>
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1px solid rgba(15,15,15,0.08); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: #0A0A0B; padding: 24px 32px;">
              <p style="margin: 0; color: #E8A043; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Luminary Studios</p>
              <h1 style="margin: 4px 0 0; color: #FFFFFF; font-size: 20px; font-weight: 600;">
                ${isBooking ? "🗓️ New booking request" : "New website enquiry"}
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                ${row("From", safeName)}
                ${safeCompany ? row("Business", safeCompany) : ""}
                ${row("Email", `<a href="${hrefEmail}" style="color: #E8A043;">${safeEmail}</a>`)}
                ${safePhone ? row("Phone", `<a href="${hrefPhone}" style="color: #E8A043;">${safePhone}</a>`) : ""}
                ${safeService ? row("Service", safeService) : ""}
              </table>

              <hr style="border: none; border-top: 1px solid rgba(15,15,15,0.08); margin: 24px 0;"/>

              <p style="margin: 0 0 8px; color: #525252; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                ${isBooking ? "Notes" : "Message"}
              </p>
              <p style="margin: 0; color: #0A0A0B; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>

              <hr style="border: none; border-top: 1px solid rgba(15,15,15,0.08); margin: 24px 0;"/>

              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right: 12px;">
                    <a href="${hrefEmail}" style="display: inline-block; background: #E8A043; color: #FFFFFF; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600;">
                      Reply to ${safeName}
                    </a>
                  </td>
                  ${safePhone ? `<td>
                    <a href="${hrefPhone}" style="display: inline-block; background: #F7F6F3; color: #0A0A0B; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; border: 1px solid rgba(15,15,15,0.1);">
                      Call ${safeFirstName}
                    </a>
                  </td>` : ""}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #F7F6F3; padding: 16px 32px; border-top: 1px solid rgba(15,15,15,0.08);">
              <p style="margin: 0; color: #A1A1AA; font-size: 12px;">
                Sent from ${isBooking ? "the booking form" : "the contact form"} at luminarystudios.co.za
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildContactEmailSubject(data: Pick<EmailData, "name" | "service" | "subject" | "phone">): string {
  // Subject strings are plain-text (not HTML-rendered), but strip CR/LF to prevent header injection.
  const sanitise = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

  if (data.subject) return sanitise(data.subject);

  const parts = [data.phone ? "Booking request" : "New enquiry"];
  if (data.service) parts.push(data.service);
  parts.push(data.name);
  return sanitise(parts.join(" — "));
}
