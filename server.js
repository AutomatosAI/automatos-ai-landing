import express from "express";
import { createTransport } from "nodemailer";
import { resolve, dirname, sep } from "path";
import { fileURLToPath } from "url";
import { readFileSync, existsSync } from "fs";
import compression from "compression";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 80;

// Middleware
app.use(compression());
app.use(express.json());

// SMTP transporter (lazy-initialized on first use)
let transporter = null;

function getTransporter() {
  if (!transporter) {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!user || !pass) {
      throw new Error("SMTP_USER and SMTP_PASS environment variables are required");
    }
    transporter = createTransport({
      host: process.env.SMTP_HOST || "mail.privateemail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: { user, pass },
    });
  }
  return transporter;
}

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !email || !message) {
    return res.status(400).json({ error: "First name, email, and message are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    const smtp = getTransporter();
    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    await smtp.sendMail({
      from: `"Automatos Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: `"${fullName}" <${email}>`,
      subject: `Contact Form: ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr />
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
});

// Sign in lives in the app; keep in step with SIGN_IN_URL in src/lib/links.ts
const SIGN_IN_URL = process.env.SIGN_IN_URL || "https://ui.automatos.app/sign-in";
app.get("/login", (_req, res) => res.redirect(302, SIGN_IN_URL));

// Company material lives on automatos.app (facts sheet 1); keep in step with COMPANY_URL in src/lib/links.ts
app.get("/about", (_req, res) => res.redirect(301, "https://automatos.app"));

// The EU AI Act posture lives on the company site (REDESIGN-PLAN §10); keep in step with src/lib/links.ts
app.get("/eu-ai-act", (_req, res) => res.redirect(301, "https://automatos.app/eu-ai-act"));
app.get("/eu-ai-act/checker", (_req, res) => res.redirect(301, "https://automatos.app/eu-ai-act/checker"));

// Serve static files from Vite build output
const distPath = resolve(__dirname, "dist");
// Vite content-hashes everything under dist/assets, so a changed file gets a new name.
const hashedAssetsPath = resolve(distPath, "assets") + sep;
const IMMUTABLE_CACHE = "public, max-age=31536000, immutable";
const PUBLIC_FILE_CACHE = "public, max-age=3600";
app.use(express.static(distPath, {
  setHeaders(res, filePath) {
    if (filePath.endsWith("index.html")) {
      // Don't cache index.html so deploys take effect immediately
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    } else if (filePath.startsWith(hashedAssetsPath)) {
      res.setHeader("Cache-Control", IMMUTABLE_CACHE);
    } else {
      // Files copied from public/ keep their names across deploys (images, llms.txt):
      // cache for an hour so an edit in place reaches browsers within that hour.
      res.setHeader("Cache-Control", PUBLIC_FILE_CACHE);
    }
  },
}));

// Static files that are gone are 404s, not the SPA shell (19 Oct 2026 removed the platform guide PDF, the intro video and the v1 images).
// express.static has already served every file that exists, so only missing files reach this handler.
const STATIC_PREFIXES = ["/images", "/logos", "/brand", "/videos", "/screenshots", "/assets", "/Automatos-AI-Platform-Guide.pdf"];
app.use(STATIC_PREFIXES, (_req, res) => res.sendStatus(404));

// SPA fallback — all routes serve index.html (React Router handles routing)
app.get("/{*splat}", (_req, res) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.sendFile(resolve(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Landing site running on port ${PORT}`);
});
