import React from "react";
import { Link, Route, Routes } from "react-router-dom";

function Home() {
  return (
    <section>
      <h1>ASFR Gallery</h1>
      <p>Your private internet art collection, in one place.</p>
      <nav>
        <Link to="/gallery">Go to gallery</Link>
      </nav>
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
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

