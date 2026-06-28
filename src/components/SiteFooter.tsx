import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-background)]">
      <div className="container-care py-16 md:py-24">

        <div className="grid md:grid-cols-[1.8fr_1fr_1fr] gap-14 md:gap-12">

          {/* Brand */}
          <div>
            <Logo className="!text-[var(--color-background)] [&_img]:brightness-0 [&_img]:invert" />
            <p
              className="mt-6 text-sm text-[var(--color-background)]/42 max-w-xs leading-relaxed"
              style={{ fontWeight: 300, lineHeight: 1.7 }}
            >
              Nordiskt kompetenshus inom bemanning, rekrytering, utbildning
              och förändring — för serviceorganisationer som vet att kundmötet
              är deras viktigaste tillgång.
            </p>
            <p className="mt-8 text-[0.65rem] text-[var(--color-background)]/22 tracking-[0.08em]">
              care-er AB · Stockholm, Sverige
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="eyebrow text-[var(--color-background)]/28 mb-6">Tjänster</p>
            <ul className="space-y-3.5 text-sm">
              {[
                { to: "/tjanster/bemanning",   label: "Bemanning"   },
                { to: "/tjanster/rekrytering", label: "Rekrytering" },
                { to: "/tjanster/utbildning",  label: "Utbildning"  },
                { to: "/tjanster/change",      label: "Transformation" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[var(--color-background)]/50 hover:text-[var(--color-background)]/88 transition-colors duration-200"
                    style={{ fontWeight: 300 }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow text-[var(--color-background)]/28 mb-6">Kontakt</p>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a
                  href="mailto:hej@care-er.se"
                  className="text-[var(--color-background)]/50 hover:text-[var(--color-background)]/88 transition-colors duration-200"
                  style={{ fontWeight: 300 }}
                >
                  hej@care-er.se
                </a>
              </li>
              <li className="text-[var(--color-background)]/32" style={{ fontWeight: 300 }}>
                Stockholm, Sverige
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/care-er"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-background)]/50 hover:text-[var(--color-background)]/88 transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  style={{ fontWeight: 300 }}
                >
                  LinkedIn
                  <span className="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">↗</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.07] flex flex-col md:flex-row md:items-center justify-between gap-4 text-[0.65rem] text-[var(--color-background)]/24 tracking-[0.04em]">
          <p>© {new Date().getFullYear()} care-er AB · Alla rättigheter förbehållna.</p>
          <p className="font-medium tracking-[0.10em] text-[var(--color-background)]/40 uppercase" style={{ fontSize: "0.65rem" }}>
            Service är strategi.
          </p>
        </div>

      </div>

      {/* Ghost wordmark */}
      <div
        aria-hidden
        className="w-full overflow-hidden border-t border-white/[0.035] select-none"
      >
        <p
          style={{
            fontSize: "clamp(5rem, 22vw, 20rem)",
            fontWeight: 700,
            letterSpacing: "-0.052em",
            color: "oklch(0.982 0.003 82 / 0.045)",
            lineHeight: 0.80,
            paddingLeft: "clamp(1.5rem, 3rem, 5rem)",
          }}
        >
          care-er
        </p>
      </div>

    </footer>
  );
}
