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

### Supabase setup (SSO)

To enable Supabase SSO with **Google**:

1. Create a Supabase project and copy its **project URL** and **anon public key**.
2. In this repo, create a `.env.local` (not committed) with:

   ```bash
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. In the Supabase dashboard:
   - Enable the **Google** auth provider.
   - Configure the allowed redirect URL to your deployed app origin, e.g. `https://statuefreeze.github.io/gallery/`.

4. Run the app and use the “Sign in with Google” button on the home page.
