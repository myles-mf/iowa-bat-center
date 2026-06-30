const nodemailer = require('nodemailer');

/* Basic in-memory rate limit: max 10 submissions per 15 min per IP */
const rateMap = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQS = 10;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) {
    rateMap.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count++;
  rateMap.set(ip, entry);
  return entry.count > MAX_REQS;
}

module.exports = async function (context, req) {
  /* CORS preflight */
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' } };
    return;
  }

  if (req.method !== 'POST') {
    context.res = { status: 405, body: 'Method not allowed' };
    return;
  }

  /* Rate limit by client IP */
  const ip = req.headers['x-forwarded-for'] || req.headers['client-ip'] || 'unknown';
  if (isRateLimited(ip)) {
    context.res = { status: 429, body: 'Too many requests. Please try again later.' };
    return;
  }

  const { name, phone, email, location, description } = req.body || {};

  /* Server-side validation */
  if (!name || !email || !location || !description) {
    context.res = { status: 400, body: 'Missing required fields.' };
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    context.res = { status: 400, body: 'Invalid email address.' };
    return;
  }
  /* Field length guards */
  if (name.length > 200 || email.length > 200 || location.length > 200 || description.length > 5000) {
    context.res = { status: 400, body: 'One or more fields exceed maximum length.' };
    return;
  }

  const toEmail = process.env.CONTACT_TO_EMAIL;
  const smtpConn = process.env.SMTP_CONN;

  if (!toEmail || !smtpConn) {
    context.log.error('Missing CONTACT_TO_EMAIL or SMTP_CONN environment variables.');
    context.res = { status: 500, body: 'Server configuration error. Please email us directly at info@iowabatcenter.org.' };
    return;
  }

  /* SMTP_CONN format: smtps://user:pass@host:port */
  let transporter;
  try {
    transporter = nodemailer.createTransport(smtpConn);
  } catch (err) {
    context.log.error('Failed to create mail transport:', err);
    context.res = { status: 500, body: 'Server configuration error.' };
    return;
  }

  const subject = `[Iowa Bat Center] Contact form — ${name} (${location})`;
  const text = [
    `Name:        ${name}`,
    `Email:       ${email}`,
    `Phone:       ${phone || '(not provided)'}`,
    `Location:    ${location}`,
    '',
    'Situation:',
    description,
    '',
    '---',
    'Sent via iowabatcenter.org contact form.'
  ].join('\n');

  const html = `
<p><strong>Name:</strong> ${esc(name)}</p>
<p><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
<p><strong>Phone:</strong> ${esc(phone || '(not provided)')}</p>
<p><strong>Location:</strong> ${esc(location)}</p>
<hr>
<p><strong>Situation:</strong></p>
<p style="white-space:pre-wrap">${esc(description)}</p>
<hr>
<p style="color:#888;font-size:12px">Sent via iowabatcenter.org contact form.</p>
`.trim();

  try {
    await transporter.sendMail({
      from: `"Iowa Bat Center Website" <${toEmail}>`,
      to: toEmail,
      replyTo: `"${name}" <${email}>`,
      subject,
      text,
      html
    });
    context.res = { status: 200, body: 'OK' };
  } catch (err) {
    context.log.error('Mail send failed:', err);
    context.res = { status: 500, body: 'Failed to send message. Please try emailing info@iowabatcenter.org directly.' };
  }
};

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
