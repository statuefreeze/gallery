import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./utils/supabase";

function Home(props: { session: Session | null }) {
  const { session } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      if (mode === "signUp") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Authentication failed.";
      setAuthError(message);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2">ASFR Gallery</h1>
      </header>
      {session ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm opacity-75">You are signed in.</p>
          <nav>
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-current font-medium hover:opacity-80 transition-opacity"
            >
              Go to gallery
            </Link>
          </nav>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
            }}
            className="px-6 py-3 rounded-lg border border-current font-medium hover:opacity-90 transition-opacity"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm min-w-0">
          <h2 className="text-xl font-semibold mb-6 text-center">
            {mode === "signIn" ? "Sign in" : "Sign up"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="w-full min-w-0 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2 min-w-0">
              <label htmlFor="email" className="text-sm font-medium opacity-75">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full max-w-full min-w-0 box-border px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 transition-shadow"
                placeholder="you@example.com"
              />
            </div>
            <div className="flex flex-col gap-2 min-w-0">
              <label
                htmlFor="password"
                className="text-sm font-medium opacity-75"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full max-w-full min-w-0 box-border px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 transition-shadow"
              />
            </div>
            {authError && <p className="text-sm font-medium">{authError}</p>}
            <button
              type="submit"
              disabled={authLoading}
              className="block w-full min-w-0 box-border py-3 rounded-lg border-2 border-current font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              {authLoading
                ? "Working…"
                : mode === "signIn"
                  ? "Sign in"
                  : "Sign up"}
            </button>
          </form>
          <button
            type="button"
            onClick={() =>
              setMode((current) => (current === "signIn" ? "signUp" : "signIn"))
            }
            className="block w-full min-w-0 box-border mt-4 py-3 rounded-lg border border-current font-medium hover:opacity-90 transition-opacity"
          >
            {mode === "signIn"
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      )}
    </section>
  );
}

function Gallery() {
  return (
    <section className="flex-1 p-8 max-w-4xl mx-auto w-full">
      <header className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Gallery</h2>
        <p className="opacity-75">
          We&apos;ll list artworks here, with filters and search.
        </p>
      </header>
      <div className="rounded-xl border p-12 text-center">
        <p className="opacity-75 italic">Coming soon</p>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-2xl font-bold mb-2">Not found</h2>
      <p className="opacity-75 mb-6">The page you requested does not exist.</p>
      <Link
        to="/"
        className="font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
      >
        Back home
      </Link>
    </section>
  );
}

export function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="opacity-75 animate-pulse">Loading…</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <Routes>
        <Route path="/" element={<Home session={session} />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
