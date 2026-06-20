// netlify/functions/send-guide.js
// Verstuurt bevestigingsmail via Brevo + voegt lead toe aan Brevo contactenlijst
// Taalafhankelijk: bevestigingsmail in NL/EN/ES op basis van lang parameter

exports.handler = async (event) => {

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { name, email, company, role, lang = "en" } = body;

  if (!name || !email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Naam en e-mail zijn verplicht" }),
    };
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const PDF_URL = "https://costacapital.pro/Costa_Capital_Finance_Guide_Spain.pdf";
  // Lijst-ID per taal (Brevo)
  const LIST_IDS = { nl: 3, en: 4, es: 5 };
  const LIST_ID = LIST_IDS[lang] || LIST_IDS.en;

  // ── VERTALINGEN BEVESTIGINGSMAIL ────────────────────────────────
  const copy = {
    nl: {
      subject: "Uw Vastgoedfinancieringsgids Spanje — Costa Capital",
      greeting: `Beste ${name},`,
      intro: "Bedankt voor uw interesse in Costa Capital. Uw gids staat klaar — klik op de knop hieronder om hem direct te downloaden.",
      btnText: "↓ Download uw financieringsgids (PDF)",
      insideTitle: "Wat staat erin:",
      inside: [
        "Hoe Spaanse vastgoedfinanciering werkt (LTV, lendertypen)",
        "Brugfinanciering &amp; ontwikkelaarsfinanciering uitgelegd",
        "Wat lenders écht willen zien — de 7 kritieke documenten",
        "LTV &amp; prijzen per regio (Costa del Sol, Costa Blanca, Valencia, Ibiza)",
        "NIE, escritura &amp; Spaanse juridische basis",
        "10 fouten die deals laten mislukken",
        "Uw complete financieringschecklist",
      ],
      projectTitle: "Heeft u een project te financieren?",
      projectText: `Wij reageren op alle aanvragen binnen 48 uur. Dien uw project in via
        <a href="https://costacapital.pro" style="color:#f97316;text-decoration:none;">costacapital.pro</a>
        of gebruik onze
        <a href="https://app.costacapital.pro" style="color:#f97316;text-decoration:none;">AI Financieringstool</a>
        om uw project direct te analyseren.`,
    },
    en: {
      subject: "Your Real Estate Finance Guide Spain — Costa Capital",
      greeting: `Dear ${name},`,
      intro: "Thank you for your interest in Costa Capital. Your guide is ready — click the button below to download it directly.",
      btnText: "↓ Download Your Finance Guide (PDF)",
      insideTitle: "What's inside:",
      inside: [
        "How Spanish real estate finance works (LTV, lender types)",
        "Bridge loans &amp; developer finance explained",
        "What lenders really want to see — the 7 critical documents",
        "LTV &amp; pricing by region (Costa del Sol, Costa Blanca, Valencia, Ibiza)",
        "NIE, escritura &amp; Spanish legal basics",
        "10 mistakes that kill deals",
        "Your complete financing checklist",
      ],
      projectTitle: "Have a project to finance?",
      projectText: `We respond to all submissions within 48 hours. Submit your deal at
        <a href="https://costacapital.pro" style="color:#f97316;text-decoration:none;">costacapital.pro</a>
        or use our
        <a href="https://app.costacapital.pro" style="color:#f97316;text-decoration:none;">AI Finance Tool</a>
        to model your project instantly.`,
    },
    es: {
      subject: "Su Guía de Financiación Inmobiliaria España — Costa Capital",
      greeting: `Estimado/a ${name},`,
      intro: "Gracias por su interés en Costa Capital. Su guía está lista — haga clic en el botón de abajo para descargarla directamente.",
      btnText: "↓ Descargar su guía de financiación (PDF)",
      insideTitle: "Qué encontrará:",
      inside: [
        "Cómo funciona la financiación inmobiliaria española (LTV, tipos de prestamistas)",
        "Préstamos puente y financiación para promotores explicados",
        "Lo que los prestamistas realmente quieren ver — los 7 documentos clave",
        "LTV y precios por región (Costa del Sol, Costa Blanca, Valencia, Ibiza)",
        "NIE, escritura y conceptos jurídicos básicos",
        "10 errores que arruinan operaciones",
        "Su checklist completo de financiación",
      ],
      projectTitle: "¿Tiene un proyecto que financiar?",
      projectText: `Respondemos a todas las solicitudes en 48 horas. Envíe su proyecto en
        <a href="https://costacapital.pro" style="color:#f97316;text-decoration:none;">costacapital.pro</a>
        o use nuestra
        <a href="https://app.costacapital.pro" style="color:#f97316;text-decoration:none;">Herramienta IA de Financiación</a>
        para analizar su proyecto al instante.`,
    },
  };

  const c = copy[lang] || copy.en;

  // ── 1. BEVESTIGINGSMAIL NAAR BEZOEKER (taalspecifiek) ────────────
  const visitorEmail = {
    sender: { name: "Costa Capital", email: "info@costacapital.pro" },
    to: [{ email, name }],
    subject: c.subject,
    htmlContent: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <tr>
          <td style="background:#0f172a;padding:32px 40px;">
            <p style="margin:0 0 8px;color:#f97316;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">COSTA CAPITAL</p>
            <p style="margin:0;color:#ffffff;font-size:22px;font-weight:bold;line-height:1.3;">Real Estate Finance Guide Spain</p>
          </td>
        </tr>

        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 16px;color:#0f172a;font-size:16px;">${c.greeting}</p>
            <p style="margin:0 0 24px;color:#64748b;font-size:15px;line-height:1.6;">${c.intro}</p>

            <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
              <tr>
                <td style="background:#f97316;border-radius:6px;">
                  <a href="${PDF_URL}" style="display:block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:bold;text-decoration:none;">
                    ${c.btnText}
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 10px;color:#0f172a;font-size:14px;font-weight:bold;">${c.insideTitle}</p>
            <ul style="margin:0 0 28px;padding-left:20px;color:#64748b;font-size:14px;line-height:1.9;">
              ${c.inside.map(item => `<li>${item}</li>`).join('')}
            </ul>

            <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 28px;">

            <p style="margin:0 0 8px;color:#0f172a;font-size:14px;font-weight:bold;">${c.projectTitle}</p>
            <p style="margin:0 0 20px;color:#64748b;font-size:14px;line-height:1.6;">${c.projectText}</p>
          </td>
        </tr>

        <tr>
          <td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;">
            <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.7;">
              Costa Capital · Real Estate Finance &amp; Capital Solutions<br>
              <a href="https://costacapital.pro" style="color:#f97316;text-decoration:none;">costacapital.pro</a>
              · info@costacapital.pro · Valencia, Spain
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };

  // ── 2. LEAD-NOTIFICATIE NAAR JAAP (altijd NL) ────────────────────
  const langLabel = { nl: "Nederlands", en: "Engels", es: "Spaans" }[lang] || lang;

  const notifyEmail = {
    sender: { name: "Costa Capital Bot", email: "info@costacapital.pro" },
    to: [{ email: process.env.NOTIFY_EMAIL || "info@costacapital.pro", name: "Jaap" }],
    subject: `Nieuwe lead: ${name} — Finance Guide download (${langLabel})`,
    htmlContent: `
<div style="font-family:Helvetica,Arial,sans-serif;max-width:520px;padding:24px;">
  <p style="margin:0 0 20px;font-size:18px;font-weight:bold;color:#0f172a;">Nieuwe guide download lead</p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e2e8f0;">
    <tr style="background:#f8fafc;">
      <td style="padding:10px 16px;font-weight:bold;color:#334155;width:110px;">Naam</td>
      <td style="padding:10px 16px;color:#64748b;">${name}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;font-weight:bold;color:#334155;">E-mail</td>
      <td style="padding:10px 16px;"><a href="mailto:${email}" style="color:#f97316;">${email}</a></td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="padding:10px 16px;font-weight:bold;color:#334155;">Bedrijf</td>
      <td style="padding:10px 16px;color:#64748b;">${company || "—"}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;font-weight:bold;color:#334155;">Rol</td>
      <td style="padding:10px 16px;color:#64748b;">${role || "—"}</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="padding:10px 16px;font-weight:bold;color:#334155;">Taal</td>
      <td style="padding:10px 16px;color:#64748b;">${langLabel}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;font-weight:bold;color:#334155;">Tijdstip</td>
      <td style="padding:10px 16px;color:#64748b;">${new Date().toLocaleString("nl-NL", { timeZone: "Europe/Madrid" })}</td>
    </tr>
  </table>
  <p style="margin:16px 0 0;font-size:12px;color:#94a3b8;">Via costacapital.pro — Guide download formulier</p>
</div>`,
  };

  // ── 3. CONTACT TOEVOEGEN AAN BREVO — met taalattribuut ───────────
  // LANGUAGE wordt opgeslagen als Brevo attribuut
  // In de Brevo automation kun je dan filteren op {{ contact.LANGUAGE }}
  const contactPayload = {
    email,
    attributes: {
      FIRSTNAME: name.split(" ")[0],
      LASTNAME: name.split(" ").slice(1).join(" ") || "",
      COMPANY: company || "",
      JOB_TITLE: role || "",
      SOURCE: "guide_download",
      LANGUAGE: lang.toUpperCase(), // "NL", "EN" of "ES"
    },
    listIds: [LIST_ID],
    updateEnabled: true,
  };

  try {
    const r1 = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(visitorEmail),
    });

    if (!r1.ok) {
      const err = await r1.text();
      throw new Error(`Brevo visitor email failed: ${err}`);
    }

    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(notifyEmail),
    });

    await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(contactPayload),
    });

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };

  } catch (err) {
    console.error("Brevo error:", err.message);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Verzenden mislukt", detail: err.message }),
    };
  }
};
