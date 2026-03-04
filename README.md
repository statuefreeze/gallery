## ASFR Gallery

ASFR Gallery is a personal, private web app for managing a large collection of internet art specifically of the ASFR fetish.
The app focuses on syndicating metadata from sources like DeviantArt while selectively archiving "must‑keep" originals into a limited amount of private storage so they can't disappear.

### Tech Stack

The gallery is designed around the goal of being publicly deployable with zero cost.
- single-page GitHub Pages app (React + TypeScript + Vite)
- Supabase free tier backend (Auth + Postgres + Storage)

### Development environment (Nix + direnv)

This repo ships a minimal **Nix flake** and **direnv** setup for a reproducible dev environment.

- `flake.nix` defines a dev shell with Node.js, Git, and the Supabase CLI.
- `.envrc` contains `use flake` so direnv can load it automatically.

To use it (once Nix + direnv are installed and `nix-direnv` is configured):

```bash
direnv allow
```
