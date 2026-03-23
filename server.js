import express from "express";
import { createTransport } from "nodemailer";
import { resolve, dirname } from "path";
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

// Serve static files from Vite build output
const distPath = resolve(__dirname, "dist");
app.use(express.static(distPath, {
  maxAge: "1y",
  immutable: true,
  setHeaders(res, filePath) {
    // Don't cache index.html so deploys take effect immediately
    if (filePath.endsWith("index.html")) {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    }
  },
}));

// SPA fallback — all routes serve index.html (React Router handles routing)
app.get("*", (_req, res) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.sendFile(resolve(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Landing site running on port ${PORT}`);
});
