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
            <p className="mt-6 text-sm text-[var(--color-background)]/45 max-w-xs leading-relaxed" style={{ fontWeight: 300 }}>
              Nordiskt kompetenshus inom bemanning, rekrytering, utbildning
              och förändring — för serviceorganisationer som vet att kundmötet
              är deras viktigaste tillgång.
            </p>
            <p className="mt-8 text-xs text-[var(--color-background)]/25">
              care-er AB · Stockholm, Sverige
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="eyebrow text-[var(--color-background)]/30 mb-5">Tjänster</p>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/tjanster/bemanning",   label: "Bemanning"   },
                { to: "/tjanster/rekrytering", label: "Rekrytering" },
                { to: "/tjanster/utbildning",  label: "Utbildning"  },
                { to: "/tjanster/change",      label: "Change"      },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[var(--color-background)]/55 hover:text-[var(--color-background)]/90 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow text-[var(--color-background)]/30 mb-5">Kontakt</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:hej@care-er.se"
                  className="text-[var(--color-background)]/55 hover:text-[var(--color-background)]/90 transition-colors"
                >
                  hej@care-er.se
                </a>
              </li>
              <li className="text-[var(--color-background)]/35">
                Stockholm, Sverige
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/care-er"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-background)]/55 hover:text-[var(--color-background)]/90 transition-colors"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[var(--color-background)]/28">
          <p>© {new Date().getFullYear()} care-er AB · Alla rättigheter förbehållna.</p>
          <p className="font-medium tracking-[0.08em] text-[var(--color-background)]/45">
            Service är strategi.
          </p>
        </div>

      </div>

      {/* Ghost wordmark — the last thing you see, the name you leave with */}
      <div
        aria-hidden
        className="w-full overflow-hidden border-t border-white/[0.04] select-none"
      >
        <p
          style={{
            fontSize: "clamp(5rem, 22vw, 20rem)",
            fontWeight: 700,
            letterSpacing: "-0.05em",
            color: "oklch(0.982 0.003 82 / 0.055)",
            lineHeight: 0.82,
            paddingLeft: "clamp(1.5rem, 3rem, 5rem)",
          }}
        >
          care-er
        </p>
      </div>

    </footer>
  );
}
