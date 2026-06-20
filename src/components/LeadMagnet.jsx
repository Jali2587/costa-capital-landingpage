// src/components/LeadMagnet.jsx
import { useState } from "react";

export default function LeadMagnet({ lang = "en" }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const t = {
    en: {
      badge: "Free Download",
      title: "Real Estate Finance Guide Spain",
      subtitle: "Everything investors & developers need to know about securing financing in Spain — from LTV ratios to lender requirements.",
      includes: "What's inside:",
      points: [
        "How Spanish real estate finance works",
        "Bridge loans & developer finance explained",
        "What lenders really want to see",
        "LTV & pricing by region (Costa del Sol, Costa Blanca, Valencia, Ibiza)",
        "NIE, escritura & Spanish legal basics",
        "10 mistakes that kill deals",
        "Your complete financing checklist",
      ],
      nameLbl: "Full name", emailLbl: "Email address",
      companyLbl: "Company (optional)", roleLbl: "Your role",
      roles: ["Select your role...", "Developer / Promotor", "Investor", "Broker / Agent", "Family Office", "Other"],
      cta: "Send me the guide →", loading: "Sending...",
      successTitle: "Check your inbox!",
      successBody: "Your guide is on its way. Have a project to finance?",
      successCta: "Submit a deal →",
      error: "Something went wrong. Please email info@costacapital.pro directly.",
      privacy: "No spam. Unsubscribe anytime.",
    },
    nl: {
      badge: "Gratis Download",
      title: "Vastgoedfinancieringsgids Spanje",
      subtitle: "Alles wat investeerders en ontwikkelaars moeten weten over financiering in Spanje — van LTV-ratio's tot lendervereisten.",
      includes: "Wat staat erin:",
      points: [
        "Hoe Spaanse vastgoedfinanciering werkt",
        "Brugfinanciering & ontwikkelaarsfinanciering uitgelegd",
        "Wat lenders écht willen zien",
        "LTV & prijzen per regio (Costa del Sol, Costa Blanca, Valencia, Ibiza)",
        "NIE, escritura & Spaanse juridische basis",
        "10 fouten die deals laten mislukken",
        "Uw complete financieringschecklist",
      ],
      nameLbl: "Volledige naam", emailLbl: "E-mailadres",
      companyLbl: "Bedrijf (optioneel)", roleLbl: "Uw rol",
      roles: ["Selecteer uw rol...", "Ontwikkelaar / Promotor", "Investeerder", "Makelaar / Agent", "Family Office", "Anders"],
      cta: "Stuur mij de gids →", loading: "Versturen...",
      successTitle: "Check uw inbox!",
      successBody: "Uw gids is onderweg. Heeft u een project te financieren?",
      successCta: "Deal indienen →",
      error: "Er ging iets mis. Mail ons op info@costacapital.pro",
      privacy: "Geen spam. Op elk moment uitschrijven.",
    },
    es: {
      badge: "Descarga Gratuita",
      title: "Guía de Financiación Inmobiliaria en España",
      subtitle: "Todo lo que inversores y promotores necesitan saber sobre financiación en España.",
      includes: "Qué encontrarás:",
      points: [
        "Cómo funciona la financiación inmobiliaria en España",
        "Préstamos puente y financiación para promotores",
        "Lo que los prestamistas realmente quieren ver",
        "LTV y precios por región",
        "NIE, escritura y conceptos jurídicos básicos",
        "10 errores que arruinan operaciones",
        "Tu checklist completo de financiación",
      ],
      nameLbl: "Nombre completo", emailLbl: "Correo electrónico",
      companyLbl: "Empresa (opcional)", roleLbl: "Tu perfil",
      roles: ["Selecciona tu perfil...", "Promotor / Desarrollador", "Inversor", "Agente / Intermediario", "Family Office", "Otro"],
      cta: "Envíame la guía →", loading: "Enviando...",
      successTitle: "Revisa tu bandeja",
      successBody: "Tu guía está en camino. ¿Tienes un proyecto que financiar?",
      successCta: "Enviar operación →",
      error: "Algo salió mal. Escríbenos a info@costacapital.pro",
      privacy: "Sin spam. Cancela cuando quieras.",
    },
  };

  const c = t[lang] || t.en;

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/.netlify/functions/send-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),  // taal meesturen
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "6px",
    border: "1px solid #d1d5db", fontSize: "14px", color: "#0f172a",
    outline: "none", boxSizing: "border-box",
    fontFamily: "inherit", background: "#fff",
  };

  const labelStyle = {
    display: "block", color: "#374151", fontSize: "13px",
    fontWeight: "600", marginBottom: "6px",
  };

  return (
    <section
      id="guide"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Oranje gloed achtergrond */}
      <div style={{
        position: "absolute", top: "-80px", right: "-80px",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px" }}>

        {/* Badge */}
        <p style={{
          textAlign: "center", color: "#f97316", fontSize: "11px",
          fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px",
        }}>
          {c.badge}
        </p>

        {/* Titel */}
        <h2 style={{
          textAlign: "center", color: "#ffffff",
          fontSize: "clamp(22px, 4vw, 34px)",
          fontWeight: "bold", lineHeight: 1.25, marginBottom: "12px",
        }}>
          {c.title}
        </h2>
        <p style={{
          textAlign: "center", color: "#94a3b8", fontSize: "15px",
          lineHeight: 1.6, maxWidth: "560px", margin: "0 auto 48px",
        }}>
          {c.subtitle}
        </p>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "28px",
          alignItems: "start",
        }}>

          {/* LINKS — inhoud */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "28px",
          }}>
            {/* PDF preview */}
            <div style={{
              background: "#0f172a",
              border: "1px solid rgba(249,115,22,0.3)",
              borderRadius: "8px",
              padding: "20px 22px",
              marginBottom: "24px",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: "3px", background: "#f97316", borderRadius: "8px 8px 0 0",
              }} />
              <p style={{ margin: "10px 0 4px", color: "#f97316", fontSize: "9px", fontWeight: "bold", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                COSTA CAPITAL
              </p>
              <p style={{ margin: 0, color: "#ffffff", fontSize: "17px", fontWeight: "bold", lineHeight: 1.3 }}>
                Real Estate Finance<br />Guide Spain
              </p>
              <p style={{ margin: "6px 0 0", color: "#475569", fontSize: "11px" }}>
                2026 Edition · 20 pages · PDF
              </p>
            </div>

            {/* Inhoud lijst */}
            <p style={{ color: "#cbd5e1", fontSize: "11px", fontWeight: "bold", marginBottom: "10px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              {c.includes}
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {c.points.map((point, i) => (
                <li key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  padding: "7px 0",
                  borderBottom: i < c.points.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <span style={{ color: "#f97316", fontSize: "13px", flexShrink: 0, marginTop: "2px" }}>✓</span>
                  <span style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.4 }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RECHTS — formulier */}
          <div style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "28px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{
                  width: "52px", height: "52px", borderRadius: "50%",
                  background: "#dcfce7", display: "flex", alignItems: "center",
                  justifyContent: "center", margin: "0 auto 18px",
                  fontSize: "22px", color: "#16a34a",
                }}>✓</div>
                <h3 style={{ color: "#0f172a", fontSize: "19px", fontWeight: "bold", marginBottom: "10px" }}>
                  {c.successTitle}
                </h3>
                <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.6, marginBottom: "22px" }}>
                  {c.successBody}
                </p>
                <a href="#deal" style={{
                  display: "inline-block", background: "#f97316", color: "#ffffff",
                  padding: "11px 24px", borderRadius: "6px", textDecoration: "none",
                  fontSize: "14px", fontWeight: "bold",
                }}>
                  {c.successCta}
                </a>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>{c.nameLbl} *</label>
                  <input type="text" name="name" value={form.name}
                    onChange={handleChange} placeholder="Jan de Vries" style={inputStyle} />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>{c.emailLbl} *</label>
                  <input type="email" name="email" value={form.email}
                    onChange={handleChange} placeholder="jan@bedrijf.com" style={inputStyle} />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>{c.companyLbl}</label>
                  <input type="text" name="company" value={form.company}
                    onChange={handleChange} placeholder="Bedrijfsnaam B.V." style={inputStyle} />
                </div>

                <div style={{ marginBottom: "22px" }}>
                  <label style={labelStyle}>{c.roleLbl}</label>
                  <select name="role" value={form.role} onChange={handleChange}
                    style={{ ...inputStyle, background: "#ffffff" }}>
                    {c.roles.map((r, i) => (
                      <option key={i} value={i === 0 ? "" : r}>{r}</option>
                    ))}
                  </select>
                </div>

                {status === "error" && (
                  <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "12px" }}>
                    {c.error}
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === "loading" || !form.name || !form.email}
                  style={{
                    width: "100%", padding: "13px", borderRadius: "6px",
                    background: (!form.name || !form.email || status === "loading") ? "#e2e8f0" : "#f97316",
                    color: (!form.name || !form.email || status === "loading") ? "#94a3b8" : "#ffffff",
                    fontSize: "15px", fontWeight: "bold", border: "none",
                    cursor: (!form.name || !form.email || status === "loading") ? "not-allowed" : "pointer",
                    transition: "background 0.15s",
                    fontFamily: "inherit",
                  }}
                >
                  {status === "loading" ? c.loading : c.cta}
                </button>

                <p style={{ color: "#9ca3af", fontSize: "12px", textAlign: "center", marginTop: "10px", marginBottom: 0 }}>
                  🔒 {c.privacy}
                </p>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
