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
    <section>
      <h1>ASFR Gallery</h1>
      <p>Your private internet art collection, in one place.</p>
      {session ? (
        <>
          <p>You are signed in.</p>
          <nav>
            <Link to="/gallery">Go to gallery</Link>
          </nav>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
            }}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <h2>{mode === "signIn" ? "Sign in" : "Sign up"}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            {authError && <p style={{ color: "red" }}>{authError}</p>}
            <button type="submit" disabled={authLoading}>
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
          >
            {mode === "signIn"
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </>
      )}
    </section>
  );
}

function Gallery() {
  return (
    <section>
      <h2>Gallery</h2>
      <p>We&apos;ll list artworks here, with filters and search.</p>
    </section>
  );
}

function NotFound() {
  return (
    <section>
      <h2>Not found</h2>
      <p>The page you requested does not exist.</p>
      <Link to="/">Back home</Link>
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
    return <p>Loading…</p>;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home session={session} />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
