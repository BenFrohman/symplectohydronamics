# Symplectohydrodynamics · FSymHD

Private source of the public observatory for **Benjamin Stanley Frohman** — research catalog, living timeline, consulting aperture, hosted at **`symplectorilabs.com`**.

This repository is kept **private** as the working archive. The compiled static site is deployed to a public URL. That split — private git, public hosting — is standard for a personal research studio.

## What lives here

| Path | Role |
| --- | --- |
| `index.html` | Observatory: tethered vorticity field, framework, GitHub catalog, consulting, contact |
| `papers/library.html` | GitHub corpus: what each repo implements, and which are personal logs |
| `papers/prior-research.html` | Off-front-page JAMA / JNS table (publisher copyrights) |
| `library/`, `archive/` | Working-tree manuscripts; **not** shipped or served on the public site |
| `assets/` | Mark, field stills, resume PDF, favicon |
| `css/`, `js/` | Field shader, orbit nav, inquiry mailer |

No build step. Static HTML, CSS, WebGL.

## Local

```bash
cd symplectohydronamics
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173`.

## Domain

Public host: **`symplectorilabs.com`** (Porkbun). Railway also keeps the generated URL until DNS is verified.

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

Connect the private GitHub repo `BenFrohman/symplectohydronamics` (branch `main`) in **Settings → Source → Connect Repo** after granting the Railway GitHub App access to that repository: [GitHub → Settings → Applications → Installed GitHub Apps](https://github.com/settings/installations). Until then, deploys are CLI uploads (`railway up`). After the repo is connected, `git push origin main` auto-deploys.

Custom domains on Railway service `fsymhd` (one name, apex + www):

| Host | Type | Target |
| --- | --- | --- |
| `www` | CNAME | `dz5997hy.up.railway.app` |
| `@` (apex) | ALIAS or CNAME | `ywutj0o3.up.railway.app` |

Verification TXT (Railway SSL):

- `_railway-verify.www` → `railway-verify=d073c7d326fd5e17a4d80d759586ec8e08e758a4f26c0569d01f4940e0fd19dd`
- `_railway-verify` → `railway-verify=93ac40b3011e8734152db7bed52111ca6872673fad59c1c31dd069f33b75a7f8`

Set these at Porkbun (account Inv0x) under **DNS** for `symplectorilabs.com`. Until they verify, the Railway URL is the public observatory.

## Update workflow

1. Edit in this private repo.
2. Commit with a provenance-grade message.
3. `git push origin main`.
4. Redeploy the static directory to the public host.

## Copyright and license

**Copyright © 2026 Benjamin Stanley Frohman.** Original author of this observatory and of the FSymHD instruments.

Licensed under **[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)**. Commercial use is allowed so long as Benjamin Stanley Frohman is attributed for the work and contributions.

Suggested credit:

```
Frohmanian Symplectohydrodynamics (FSymHD)
Original author: Benjamin Stanley Frohman
ORCID: https://orcid.org/0009-0006-7068-3718
License: Apache-2.0
```

Human-readable terms: [license.html](license.html). Legal files: [LICENSE](LICENSE), [NOTICE](NOTICE), [CITATION.cff](CITATION.cff).

JAMA / JNS papers linked from the prior-research tab remain under their publishers’ copyrights. The resume PDF is a personal CV and is not licensed for third-party commercial republication.

Contact: `frohmanbenjamin@gmail.com` · GitHub `BenFrohman` · X `@Investor0x`
