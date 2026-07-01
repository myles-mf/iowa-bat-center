const { EmailClient } = require('@azure/communication-email');

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
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' } };
    return;
  }

  if (req.method !== 'POST') {
    context.res = { status: 405, body: 'Method not allowed' };
    return;
  }

  const ip = req.headers['x-forwarded-for'] || req.headers['client-ip'] || 'unknown';
  if (isRateLimited(ip)) {
    context.res = { status: 429, body: 'Too many requests. Please try again later.' };
    return;
  }

  const { name, phone, email, location, description } = req.body || {};

  if (!name || !email || !location || !description) {
    context.res = { status: 400, body: 'Missing required fields.' };
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    context.res = { status: 400, body: 'Invalid email address.' };
    return;
  }
  if (name.length > 200 || email.length > 200 || location.length > 200 || description.length > 5000) {
    context.res = { status: 400, body: 'One or more fields exceed maximum length.' };
    return;
  }

  const connStr = process.env.ACS_CONNECTION_STRING;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const senderDomain = process.env.ACS_SENDER_DOMAIN;

  if (!connStr || !toEmail || !senderDomain) {
    context.log.error('Missing ACS_CONNECTION_STRING, CONTACT_TO_EMAIL, or ACS_SENDER_DOMAIN');
    context.res = { status: 500, body: 'Server configuration error. Please email us directly at info@iowabatcenter.org.' };
    return;
  }

  const client = new EmailClient(connStr);
  const from = `donotreply@${senderDomain}`;

  const htmlBody = `
<p><strong>Name:</strong> ${esc(name)}</p>
<p><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
<p><strong>Phone:</strong> ${esc(phone || '(not provided)')}</p>
<p><strong>Location:</strong> ${esc(location)}</p>
<hr>
<p><strong>Situation:</strong></p>
<p style="white-space:pre-wrap">${esc(description)}</p>
<hr>
<p style="color:#888;font-size:12px">Sent via iowabatcenter.org contact form. Reply-to: ${esc(email)}</p>
`.trim();

  const message = {
    senderAddress: from,
    replyTo: [{ address: email, displayName: name }],
    recipients: { to: [{ address: toEmail }] },
    content: {
      subject: `[Iowa Bat Center] Contact form — ${name} (${location})`,
      html: htmlBody,
      plainText: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '(not provided)'}\nLocation: ${location}\n\nSituation:\n${description}`
    }
  };

  try {
    const poller = await client.beginSend(message);
    await poller.pollUntilDone();
    context.res = { status: 200, body: 'OK' };
  } catch (err) {
    context.log.error('ACS email send failed:', err);
    context.res = { status: 500, body: 'Failed to send message. Please try emailing info@iowabatcenter.org directly.' };
  }
};

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
