import { Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  preloadCompanyContactDialog,
  useCompanyContactDialog,
} from "@/context/company-contact-dialog";
import { Logo } from "./Logo";

const loadCareerJoinDialog = () =>
  import("./CareerJoinDialog").then(({ CareerJoinDialog }) => ({ default: CareerJoinDialog }));

const LazyCareerJoinDialog = lazy(loadCareerJoinDialog);

const primaryNav = [
  { to: "/tjanster/rekrytering", label: "Rekrytering" },
  { to: "/tjanster/bemanning", label: "Bemanning" },
  { to: "/tjanster/utbildning", label: "Utbildning" },
  { to: "/tjanster/change", label: "Transformation" },
] as const;

const careerNav = { to: "/karriar", label: "Karriär" } as const;

export function SiteHeader({ forceDark = false }: { forceDark?: boolean }) {
  const showCompanyContactDialog = useCompanyContactDialog();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const contactMenuRef = useRef<HTMLDivElement>(null);
  const contactButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change / resize
  useEffect(() => {
    if (open) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileContactOpen(false);
          setOpen(false);
        }
      };
      const onResize = () => {
        if (window.innerWidth >= 1024) {
          setMobileContactOpen(false);
          setOpen(false);
        }
      };
      window.addEventListener("keydown", onKey);
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("resize", onResize);
      };
    }
  }, [open]);

  useEffect(() => {
    if (!contactMenuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!contactMenuRef.current?.contains(event.target as Node)) {
        setContactMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContactMenuOpen(false);
        contactButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [contactMenuOpen]);

  const openCareerDialog = () => {
    setContactMenuOpen(false);
    setMobileContactOpen(false);
    setOpen(false);
    setJoinOpen(true);
  };

  const openCompanyDialog = (returnFocus: HTMLElement | null) => {
    setContactMenuOpen(false);
    setMobileContactOpen(false);
    setOpen(false);
    setJoinOpen(false);
    showCompanyContactDialog(returnFocus);
  };

  const toggleContactMenu = () => {
    if (!contactMenuOpen) {
      void loadCareerJoinDialog();
      preloadCompanyContactDialog();
    }
    setContactMenuOpen((current) => !current);
  };

  const toggleMobileContactMenu = () => {
    if (!mobileContactOpen) {
      void loadCareerJoinDialog();
      preloadCompanyContactDialog();
    }
    setMobileContactOpen((current) => !current);
  };

  const closeMobileNavigation = () => {
    setMobileContactOpen(false);
    setOpen(false);
  };

  const useDark = forceDark && !scrolled;
  // Hide nav items when header has no background (transparent) and not on dark hero
  const navVisible = scrolled || forceDark;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? "backdrop-blur-xl bg-[var(--color-background)]/88 border-[var(--color-ink)]/[0.06]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container-care flex items-center justify-between h-[4.25rem]">
          <Logo
            className={`[&_img]:transition-[filter] [&_img]:duration-500 ${
              useDark || !navVisible ? "[&_img]:brightness-0 [&_img]:invert" : ""
            }`}
          />

          {/* Desktop nav */}
          <nav
            className={`hidden lg:flex items-center gap-7 transition-opacity duration-300 ${navVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            {primaryNav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`text-sm tracking-[0.01em] transition-colors duration-200 relative group/navlink ${
                  useDark
                    ? "text-white/70 hover:text-white"
                    : "text-[var(--color-ink)]/65 hover:text-[var(--color-ink)]"
                }`}
                activeProps={{
                  className: `font-bold ${useDark ? "!text-white" : "!text-[var(--color-ink)]"}`,
                  style: {
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                    textDecorationColor: useDark
                      ? "oklch(0.982 0.003 82 / 0.50)"
                      : "oklch(0.13 0.04 271 / 0.40)",
                  },
                }}
              >
                {n.label}
              </Link>
            ))}

            <div ref={contactMenuRef} className="relative h-[2.6rem] w-[9.25rem]">
              <div
                className="absolute right-0 top-0 z-20 w-full overflow-hidden rounded-[1.35rem] border border-current/15 transition-shadow duration-300"
                style={{
                  background: useDark ? "oklch(0.982 0.003 82)" : "oklch(0.13 0.04 271)",
                  color: useDark ? "oklch(0.13 0.04 271)" : "oklch(0.982 0.003 82)",
                  boxShadow: contactMenuOpen
                    ? useDark
                      ? "0 18px 55px oklch(0.04 0.02 271 / 0.22)"
                      : "0 18px 55px oklch(0.04 0.02 271 / 0.28)"
                    : "0 6px 20px oklch(0.04 0.02 271 / 0.10)",
                }}
              >
                <button
                  ref={contactButtonRef}
                  type="button"
                  aria-expanded={contactMenuOpen}
                  aria-controls="desktop-contact-menu"
                  className="flex min-h-[2.5rem] w-full items-center justify-between gap-2 rounded-[1.3rem] px-4 text-sm font-medium tracking-[-0.01em] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-[-3px]"
                  onClick={toggleContactMenu}
                >
                  <span>Prata med oss</span>
                  <span
                    aria-hidden
                    className={`text-xs transition-transform duration-300 ${
                      contactMenuOpen ? "rotate-180" : ""
                    }`}
                  >
                    ↓
                  </span>
                </button>

                <div
                  id="desktop-contact-menu"
                  aria-hidden={!contactMenuOpen}
                  className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    contactMenuOpen ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                  style={{
                    maxHeight: contactMenuOpen ? "6.5rem" : "0",
                    opacity: contactMenuOpen ? 1 : 0,
                    transform: contactMenuOpen ? "translateY(0)" : "translateY(-0.35rem)",
                  }}
                >
                  <div className="mx-2 border-t border-current/15 pb-1.5 pt-1">
                    <button
                      type="button"
                      data-company-contact-trigger="desktop"
                      tabIndex={contactMenuOpen ? 0 : -1}
                      onClick={() => openCompanyDialog(contactButtonRef.current)}
                      className="group flex min-h-11 w-full items-center justify-between gap-5 rounded-[0.8rem] px-3 text-left text-sm font-medium transition-colors hover:bg-current/10 focus-visible:bg-current/10 focus-visible:outline-none"
                    >
                      <span>Företag</span>
                      <span
                        aria-hidden
                        className="opacity-45 transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </button>
                    <button
                      type="button"
                      tabIndex={contactMenuOpen ? 0 : -1}
                      onClick={openCareerDialog}
                      className="group flex min-h-11 w-full items-center justify-between gap-5 rounded-[0.8rem] px-3 text-left text-sm font-medium transition-colors hover:bg-current/10 focus-visible:bg-current/10 focus-visible:outline-none"
                    >
                      <span>Karriär</span>
                      <span
                        aria-hidden
                        className="opacity-45 transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to={careerNav.to}
              className={`text-sm tracking-[0.01em] transition-colors duration-200 relative group/navlink ${
                useDark
                  ? "text-white/70 hover:text-white"
                  : "text-[var(--color-ink)]/65 hover:text-[var(--color-ink)]"
              }`}
              activeProps={{
                className: `font-bold ${useDark ? "!text-white" : "!text-[var(--color-ink)]"}`,
                style: {
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  textDecorationColor: useDark
                    ? "oklch(0.982 0.003 82 / 0.50)"
                    : "oklch(0.13 0.04 271 / 0.40)",
                },
              }}
            >
              {careerNav.label}
            </Link>
          </nav>

          {/* Mobile toggle — min 44×44px touch target */}
          <button
            ref={mobileMenuButtonRef}
            className="lg:hidden p-3 -mr-3 min-w-[44px] min-h-[44px] flex flex-col justify-center items-center hover:opacity-70 transition-opacity duration-300"
            style={{
              color:
                useDark || !navVisible ? "oklch(0.982 0.003 82 / 0.80)" : "oklch(0.13 0.04 271)",
            }}
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            aria-expanded={open}
            onClick={() => {
              if (open) setMobileContactOpen(false);
              setOpen((current) => !current);
            }}
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
          className="lg:hidden overflow-hidden bg-[var(--color-background)] border-b border-[var(--color-ink)]/[0.06]"
          style={{
            maxHeight: open ? "calc(100svh - 4.25rem)" : "0",
            opacity: open ? 1 : 0,
            overflowY: open ? "auto" : "hidden",
            transition: open
              ? "max-height 420ms cubic-bezier(0.16, 1, 0.3, 1), opacity 280ms ease"
              : "max-height 340ms cubic-bezier(0.4, 0, 0.6, 1), opacity 200ms ease",
            borderTopWidth: open ? "1px" : "0",
          }}
          aria-hidden={!open}
        >
          <div className="container-care pt-6 pb-8 flex flex-col gap-5">
            {primaryNav.map((n, i) => (
              <Link
                key={n.to}
                to={n.to}
                tabIndex={open ? 0 : -1}
                onClick={closeMobileNavigation}
                className="text-xl tracking-[-0.01em] text-[var(--color-ink)]/80 hover:text-[var(--color-ink)] transition-colors duration-200 min-h-[44px] flex items-center"
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                }}
              >
                {n.label}
              </Link>
            ))}
            <div className="pt-2">
              <div className="w-fit min-w-[9.25rem] overflow-hidden rounded-[1.35rem] bg-[var(--color-ink)] text-[var(--color-background)] shadow-[0_8px_24px_oklch(0.04_0.02_271/0.16)]">
                <button
                  type="button"
                  tabIndex={open ? 0 : -1}
                  aria-expanded={mobileContactOpen}
                  aria-controls="mobile-contact-menu"
                  onClick={toggleMobileContactMenu}
                  className="flex min-h-11 w-full items-center justify-between gap-2 rounded-[1.3rem] px-4 text-sm font-medium tracking-[-0.01em] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-[-3px]"
                >
                  <span>Prata med oss</span>
                  <span
                    aria-hidden
                    className={`text-xs transition-transform duration-300 ${
                      mobileContactOpen ? "rotate-180" : ""
                    }`}
                  >
                    ↓
                  </span>
                </button>

                <div
                  id="mobile-contact-menu"
                  aria-hidden={!mobileContactOpen}
                  className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    mobileContactOpen ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                  style={{
                    maxHeight: mobileContactOpen ? "6.5rem" : "0",
                    opacity: mobileContactOpen ? 1 : 0,
                    transform: mobileContactOpen ? "translateY(0)" : "translateY(-0.35rem)",
                  }}
                >
                  <div className="mx-2 border-t border-current/15 pb-1.5 pt-1">
                    <button
                      type="button"
                      data-company-contact-trigger="mobile"
                      tabIndex={open && mobileContactOpen ? 0 : -1}
                      onClick={() => openCompanyDialog(mobileMenuButtonRef.current)}
                      className="flex min-h-11 w-full items-center justify-between gap-5 rounded-[0.75rem] px-3 text-left text-sm font-medium transition-colors hover:bg-current/10 focus-visible:bg-current/10 focus-visible:outline-none"
                    >
                      <span>Företag</span>
                      <span aria-hidden className="opacity-45">
                        →
                      </span>
                    </button>
                    <button
                      type="button"
                      tabIndex={open && mobileContactOpen ? 0 : -1}
                      onClick={openCareerDialog}
                      className="flex min-h-11 w-full items-center justify-between gap-5 rounded-[0.75rem] px-3 text-left text-sm font-medium transition-colors hover:bg-current/10 focus-visible:bg-current/10 focus-visible:outline-none"
                    >
                      <span>Karriär</span>
                      <span aria-hidden className="opacity-45">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to={careerNav.to}
              tabIndex={open ? 0 : -1}
              onClick={closeMobileNavigation}
              className="text-xl tracking-[-0.01em] text-[var(--color-ink)]/80 hover:text-[var(--color-ink)] transition-colors duration-200 min-h-[44px] flex items-center"
              style={{
                transitionDelay: open ? `${primaryNav.length * 40}ms` : "0ms",
              }}
            >
              {careerNav.label}
            </Link>
          </div>
        </div>
      </header>
      {joinOpen ? (
        <Suspense fallback={null}>
          <LazyCareerJoinDialog open={joinOpen} onOpenChange={setJoinOpen} />
        </Suspense>
      ) : null}
    </>
  );
}
