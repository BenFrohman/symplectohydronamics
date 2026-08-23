# Symplectohydrodynamics · FSymHD

Private source of the public observatory for **Benjamin Stanley Frohman** — research catalog, living timeline, consulting aperture, and dual-facing endpoints:

- `symplectohydronamics.com`
- `FSymHD.com`

Both hostnames serve the same instrument. The UI swaps which name is primary.

This repository is kept **private** as the working archive. The compiled static site is deployed to a public URL. That split — private git, public hosting — is standard for a personal research studio.

## What lives here

| Path | Role |
| --- | --- |
| `index.html` | Observatory: tethered vorticity field, framework, catalog, consulting, contact |
| `papers/` | Reading rooms for the Triple Regularization roadmap and Fusion Plasma control paper |
| `archive/` | Original `.docx` source instruments |
| `assets/` | Mark, field stills, resume PDF, favicon |
| `css/`, `js/` | Field shader, dual-host identity, inquiry mailer |

No build step. Static HTML, CSS, WebGL.

## Local

```bash
cd symplectohydronamics
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173`.

## Dual domains

After the `.com` names are registered, point **both** apex and `www` records at the public host:

```
symplectohydronamics.com     CNAME or ALIAS → <host>
www.symplectohydronamics.com CNAME          → <host>
fsymhd.com                   CNAME or ALIAS → <host>
www.fsymhd.com               CNAME          → <host>
```

`CNAME` currently lists `symplectohydronamics.com` as the GitHub Pages / Netlify primary. Add `fsymhd.com` as a domain alias on the same project so both resolve to one deployment.

**Live public URL (Railway):** [https://fsymhd-production.up.railway.app](https://fsymhd-production.up.railway.app)

Railway service `fsymhd` (project `fsymhd`, environment `production`) is configured as:

| Setting | Value |
| --- | --- |
| Builder | Dockerfile (`Dockerfile`) |
| Health check | `GET /` (100s timeout) |
| Restart | `ALWAYS` |
| Sleep | off |
| Public port | `8080` (nginx) |
| CDN | on — HTML force-cache, 4h TTL, purge-all on deploy |
| Config as code | `railway.json` |

Connect the private GitHub repo `BenFrohman/symplectohydronamics` (branch `main`) in **Settings → Source → Connect Repo** after granting the [Railway GitHub App](https://github.com/apps/railway/installations/new) access to that repository. Until then, deploys are CLI uploads (`railway up`). After the repo is connected, `git push origin main` auto-deploys.

Both brand names are already attached on the Railway service (free plan = two custom domains). After you register the `.com` names, add these DNS records:

| Host | Type | Target |
| --- | --- | --- |
| `www.fsymhd.com` | CNAME | `bdlyd2jn.up.railway.app` |
| `www.symplectohydronamics.com` | CNAME | `k8s670ui.up.railway.app` |

Verification TXT (Railway SSL):

- `_railway-verify.www.fsymhd.com` → `railway-verify=94292ff33c0329594f726434085cad015685c17f8473ebeadbe9e2417a02da01`
- `_railway-verify.www.symplectohydronamics.com` → `railway-verify=c382d0885c9520c84eccdd580686ee88eb03ed52a9d1a654db3c76dfd1520f0d`

Apex (`fsymhd.com` / `symplectohydronamics.com`) can ALIAS/ANAME to the same targets once the registrar allows a third/fourth domain, or after a Railway plan upgrade. Until registration, the Railway URL is the public observatory.

The site is hostname-aware: a host containing `fsymhd` elevates the compact identity; otherwise it elevates Symplectohydrodynamics. Both names always appear as dual-facing endpoints.

## Update workflow

1. Edit in this private repo.
2. Commit with a provenance-grade message.
3. `git push origin main`.
4. Redeploy the static directory to the public host.

Contact: `frohmanbenjamin@gmail.com` · GitHub `BenFrohman` · X `@Investor0x`

© 2026 Benjamin Stanley Frohman. All rights reserved.
