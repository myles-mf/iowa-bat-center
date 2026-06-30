# Placeholders — Iowa Bat Center

Items below need client confirmation before the site goes live.

---

## Phone number

Currently set to **515-298-0030** in these locations:
- Emergency intake card (`#found` section)
- Contact sidebar (`#contact` section)
- Form success message

Action: Confirm this is the correct public intake number.

---

## Email addresses

| Address | Used in |
|---|---|
| `info@iowabatcenter.org` | Emergency card, contact sidebar, footer, form success message, `CONTACT_TO_EMAIL` env var |
| `Natasha@iowabatcenter.org` | Contact sidebar (Rehabilitation), footer |

Action: Confirm both addresses exist and are monitored.

---

## Statistics (`#stats` section)

| Stat | Value shown | Source |
|---|---|---|
| Bats admitted | 200+ | Confirm or update |
| Bats released | 100+ | Confirm or update |
| Counties served | 20+ | Confirm or update |
| Years of experience | 7 | Confirm or update |

The footnote reads: *"Numbers updated as of June 2026."*

---

## Social media links (footer)

| Platform | Current link | Action needed |
|---|---|---|
| Facebook | `https://www.facebook.com/iowabatcenter` | Confirm URL or remove icon |
| Instagram | `https://www.instagram.com/iowabatcenter` | Confirm URL or remove icon |
| Email | `info@iowabatcenter.org` | Confirmed above |

If Facebook or Instagram accounts don't exist yet, remove the icon from the footer socials block in `index.html`.

---

## Images (`/images` folder)

See [`images/README.md`](images/README.md) for the full list of photos needed.

---

## Domain / canonical URL

- `sitemap.xml` and OG tags use `https://www.iowabatcenter.org` as the canonical URL.
- Update these once the custom domain is confirmed and set up in Azure.

---

## Custom domain

To add a custom domain after DNS is ready:
```bash
az staticwebapp hostname set \
  --name iowa-bat-center \
  --resource-group iowa-bat-center-rg \
  --hostname www.iowabatcenter.org
```
Azure provides a free TLS certificate automatically.
