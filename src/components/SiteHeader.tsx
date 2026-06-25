import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const nav = [
  { to: "/tjanster/bemanning",   label: "Bemanning"   },
  { to: "/tjanster/rekrytering", label: "Rekrytering" },
  { to: "/tjanster/utbildning",  label: "Utbildning"  },
  { to: "/tjanster/change",      label: "Change"      },
] as const;

export function SiteHeader({ forceDark = false }: { forceDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When on a dark page and not scrolled: use white palette
  const useDark = forceDark && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[var(--color-background)]/85 border-b border-[var(--color-ink)]/[0.07]"
          : "bg-transparent"
      }`}
    >
      <div className="container-care flex items-center justify-between h-[4.5rem]">
        <Logo
          className={
            useDark
              ? "[&_img]:brightness-0 [&_img]:invert"
              : ""
          }
        />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm transition-colors ${
                useDark
                  ? "text-white/50 hover:text-white/90"
                  : "text-[var(--color-ink)]/55 hover:text-[var(--color-ink)]"
              }`}
              activeProps={{
                className: `text-sm font-medium ${
                  useDark
                    ? "text-white hover:text-white"
                    : "text-[var(--color-ink)] hover:text-[var(--color-ink)]"
                }`,
              }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/"
            hash="kontakt"
            className="ml-1 !py-2.5 !px-5 !text-sm"
            style={{
              display: "inline-flex",
              alignItems: "center",
              borderRadius: "9999px",
              fontWeight: 500,
              fontSize: "0.875rem",
              transition: "opacity 200ms ease",
              background: useDark
                ? "oklch(0.982 0.003 82)"
                : "oklch(0.13 0.04 271)",
              color: useDark
                ? "oklch(0.13 0.04 271)"
                : "oklch(0.982 0.003 82)",
              padding: "0.625rem 1.25rem",
            }}
          >
            Prata med oss
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 -mr-2 transition-colors"
          style={{
            color: useDark
              ? "oklch(0.982 0.003 82 / 0.75)"
              : "oklch(0.13 0.04 271)",
          }}
          aria-label={open ? "Stäng meny" : "Öppna meny"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block w-5 h-px bg-current transition-all duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-current mt-1.5 transition-all duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-[var(--color-ink)]/[0.07] bg-[var(--color-background)]">
          <div className="container-care py-8 flex flex-col gap-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-xl text-[var(--color-ink)]/75 hover:text-[var(--color-ink)] transition-colors"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/"
              hash="kontakt"
              onClick={() => setOpen(false)}
              className="btn-primary w-fit mt-2"
            >
              Prata med oss
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
