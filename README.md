# Iowa Bat Center — Website

Static site for the Iowa Bat Center, hosted on **Azure Static Web Apps (Free tier)**
at `https://www.iowabatcenter.org`.

---

## Run locally

No build step required. Open `index.html` in a browser, or use any static file server:

```bash
# Python (built-in)
python -m http.server 8080

# Node (if you have npx)
npx serve .
```

To test the contact form locally you need the Azure Functions Core Tools:

```bash
npm install -g @azure/static-web-apps-cli
swa start . --api-location api
```

Then set the required env vars in a local `.env` or export them before starting:

```
CONTACT_TO_EMAIL=info@iowabatcenter.org
SMTP_CONN=smtps://user:password@smtp.example.com:465
```

---

## Update images

Drop real photos into the `/images` folder using the file names listed in
[`images/README.md`](images/README.md). No code changes needed — the HTML already
references those paths.

---

## Update phone number / stats / emails

These values appear inline in [`index.html`](index.html). Search for the value you want
to change (e.g. `515-298-0030`) and replace all instances. See
[`PLACEHOLDERS.md`](PLACEHOLDERS.md) for the full list of things to confirm.

---

## Contact form backend

The form POSTs JSON to `/api/submit` (an Azure Function in the `/api` folder).
The function sends an email using SMTP credentials stored as **app settings** — never
committed to git.

### Set secrets in Azure

```bash
az staticwebapp appsettings set \
  --name iowa-bat-center \
  --resource-group iowa-bat-center-rg \
  --setting-names \
    CONTACT_TO_EMAIL=info@iowabatcenter.org \
    SMTP_CONN="smtps://user:password@smtp.example.com:465"
```

`SMTP_CONN` is a standard [Nodemailer transport URL](https://nodemailer.com/smtp/).
Any transactional SMTP service works (SendGrid, Mailgun, Gmail App Password, etc.).

### Spam protection

- **Honeypot field**: a hidden `website` input that real users never fill.
  If it contains a value, the submission is silently dropped.
- **Server-side rate limit**: max 10 submissions per IP per 15 minutes.
- **Client-side rate limit**: 1 submission per minute per browser session.

---

## Deploy / CI

Every push to `main` triggers a GitHub Actions workflow (injected by Azure on first deploy)
that publishes the site automatically.

### First deploy (run once)

```bash
# 1. Create GitHub repo and push
gh repo create iowa-bat-center --public --source=. --remote=origin --push

# 2. Add SWA CLI extension
az extension add --name staticwebapp 2>/dev/null || true

# 3. Create resource group
az group create --name iowa-bat-center-rg --location centralus

# 4. Create Static Web App (links GitHub for CI)
az staticwebapp create \
  --name iowa-bat-center \
  --resource-group iowa-bat-center-rg \
  --source https://github.com/YOUR_ORG/iowa-bat-center \
  --location centralus \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location "/" \
  --sku Free \
  --login-with-github

# 5. Set secrets
az staticwebapp appsettings set \
  --name iowa-bat-center \
  --resource-group iowa-bat-center-rg \
  --setting-names \
    CONTACT_TO_EMAIL=info@iowabatcenter.org \
    SMTP_CONN="smtps://user:password@smtp.example.com:465"

# 6. Get live URL
az staticwebapp show \
  --name iowa-bat-center \
  --resource-group iowa-bat-center-rg \
  --query "defaultHostname" -o tsv
```

### Custom domain (after DNS is ready)

```bash
az staticwebapp hostname set \
  --name iowa-bat-center \
  --resource-group iowa-bat-center-rg \
  --hostname www.iowabatcenter.org
```

Azure provisions a free TLS certificate automatically.

---

## Cost

**$0.** The Free plan covers:
- Global CDN + free TLS
- Custom domain
- 100 GB/month bandwidth
- 250,000 Azure Functions executions/month (vastly more than a contact form needs)

Nothing here will ever leave the Free tier under normal traffic.
