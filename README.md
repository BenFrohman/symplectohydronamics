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

Until registrar DNS is attached, the public preview URL is the live site.

## Update workflow

1. Edit in this private repo.
2. Commit with a provenance-grade message.
3. `git push origin main`.
4. Redeploy the static directory to the public host.

Contact: `frohmanbenjamin@gmail.com` · GitHub `BenFrohman` · X `@Investor0x`

© 2026 Benjamin Stanley Frohman. All rights reserved.
