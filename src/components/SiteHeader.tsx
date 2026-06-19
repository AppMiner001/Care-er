import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const nav = [
  { to: "/tjanster/bemanning", label: "Bemanning" },
  { to: "/tjanster/rekrytering", label: "Rekrytering" },
  { to: "/tjanster/utbildning", label: "Utbildning" },
  { to: "/tjanster/change", label: "Change" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[var(--color-background)]/75 border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="container-care flex items-center justify-between h-20">
        <Logo />
        <nav className="hidden md:flex items-center gap-9">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-[var(--color-ink)]/70 hover:text-[var(--color-ink)] transition-colors"
              activeProps={{ className: "text-[var(--color-ink)]" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/"
            hash="kontakt"
            className="ml-2 inline-flex items-center rounded-full bg-[var(--color-ink)] text-[var(--color-background)] px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
          >
            Prata med oss
          </Link>
        </nav>
        <button
          className="md:hidden p-2 -mr-2 text-[var(--color-ink)]"
          aria-label="Meny"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="w-6 h-px bg-current mb-1.5" />
          <div className="w-6 h-px bg-current" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-[var(--color-background)]">
          <div className="container-care py-6 flex flex-col gap-5">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-lg text-[var(--color-ink)]"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/"
              hash="kontakt"
              onClick={() => setOpen(false)}
              className="inline-flex w-fit rounded-full bg-[var(--color-ink)] text-[var(--color-background)] px-5 py-2.5 text-sm"
            >
              Prata med oss
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
