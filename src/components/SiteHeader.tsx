import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const nav = [
  { to: "/tjanster/bemanning",   label: "Bemanning"   },
  { to: "/tjanster/rekrytering", label: "Rekrytering" },
  { to: "/tjanster/utbildning",  label: "Utbildning"  },
  { to: "/tjanster/change",      label: "Transformation" },
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

  // Close mobile menu on route change / resize
  useEffect(() => {
    if (open) {
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [open]);

  const useDark = forceDark && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[var(--color-background)]/88 border-b border-[var(--color-ink)]/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="container-care flex items-center justify-between h-[4.25rem]">
        <Logo
          className={
            useDark
              ? "[&_img]:brightness-0 [&_img]:invert"
              : ""
          }
        />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm tracking-[0.01em] transition-colors duration-200 relative group/navlink ${
                useDark
                  ? "text-white/70 hover:text-white"
                  : "text-[var(--color-ink)]/65 hover:text-[var(--color-ink)]"
              }`}
              activeProps={{
                className: `text-sm tracking-[0.01em] font-medium ${
                  useDark
                    ? "text-white"
                    : "text-[var(--color-ink)]"
                }`,
              }}
            >
              {n.label}
            </Link>
          ))}

          <Link
            to="/"
            hash="kontakt"
            style={{
              display: "inline-flex",
              alignItems: "center",
              borderRadius: "9999px",
              fontWeight: 500,
              fontSize: "0.875rem",
              letterSpacing: "-0.01em",
              willChange: "transform",
              transition: "opacity 250ms ease, transform 320ms cubic-bezier(0.16,1,0.3,1), box-shadow 320ms ease",
              background: useDark
                ? "oklch(0.982 0.003 82)"
                : "oklch(0.13 0.04 271)",
              color: useDark
                ? "oklch(0.13 0.04 271)"
                : "oklch(0.982 0.003 82)",
              padding: "0.6rem 1.25rem",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.opacity = "0.88";
              el.style.transform = "translateY(-1px)";
              el.style.boxShadow = useDark
                ? "0 6px 20px oklch(0.982 0.003 82 / 0.20)"
                : "0 6px 20px oklch(0.13 0.04 271 / 0.18)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.opacity = "1";
              el.style.transform = "";
              el.style.boxShadow = "";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.transition = "transform 80ms ease";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.transition = "transform 320ms cubic-bezier(0.16,1,0.3,1)";
            }}
          >
            Prata med oss
          </Link>
        </nav>

        {/* Mobile toggle — min 44×44px touch target */}
        <button
          className="md:hidden p-3 -mr-3 min-w-[44px] min-h-[44px] flex flex-col justify-center items-center transition-opacity hover:opacity-70"
          style={{
            color: useDark
              ? "oklch(0.982 0.003 82 / 0.80)"
              : "oklch(0.13 0.04 271)",
          }}
          aria-label={open ? "Stäng meny" : "Öppna meny"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block w-5 h-px bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-current mt-[5px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer — always rendered, animated with max-height + opacity */}
      <div
        className="md:hidden overflow-hidden bg-[var(--color-background)] border-b border-[var(--color-ink)]/[0.06]"
        style={{
          maxHeight: open ? "480px" : "0",
          opacity: open ? 1 : 0,
          transition: open
            ? "max-height 420ms cubic-bezier(0.16, 1, 0.3, 1), opacity 280ms ease"
            : "max-height 340ms cubic-bezier(0.4, 0, 0.6, 1), opacity 200ms ease",
          borderTopWidth: open ? "1px" : "0",
        }}
        aria-hidden={!open}
      >
        <div className="container-care pt-6 pb-8 flex flex-col gap-5">
          {nav.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="text-xl tracking-[-0.01em] text-[var(--color-ink)]/80 hover:text-[var(--color-ink)] transition-colors duration-200 min-h-[44px] flex items-center"
              style={{
                transitionDelay: open ? `${i * 40}ms` : "0ms",
              }}
            >
              {n.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/"
              hash="kontakt"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="btn-primary w-fit"
            >
              Prata med oss
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
