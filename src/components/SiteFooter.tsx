import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-background)]">
      <div className="container-care py-20 md:py-28">

        <div className="grid md:grid-cols-[1.6fr_1fr_1fr] gap-16 md:gap-12">

          {/* Brand column */}
          <div>
            <Logo className="!text-[var(--color-background)] [&_span]:text-[var(--color-background)]" />
            <p className="mt-6 text-sm text-[var(--color-background)]/60 max-w-xs leading-relaxed">
              Nordiskt kompetenshus inom bemanning, rekrytering, utbildning och
              förändring. Vi bygger det som händer i mötet mellan människa och
              varumärke.
            </p>
            <div className="mt-8 space-y-1.5 text-sm text-[var(--color-background)]/35">
              <p>care-er AB</p>
              <p>Stockholm, Sverige</p>
            </div>
          </div>

          {/* Services column */}
          <div>
            <p className="eyebrow text-[var(--color-background)]/50 mb-5">Tjänster</p>
            <ul className="space-y-3 text-base">
              <li>
                <Link to="/tjanster/bemanning" className="hover:opacity-70 transition-opacity">
                  Bemanning
                </Link>
              </li>
              <li>
                <Link to="/tjanster/rekrytering" className="hover:opacity-70 transition-opacity">
                  Rekrytering
                </Link>
              </li>
              <li>
                <Link to="/tjanster/utbildning" className="hover:opacity-70 transition-opacity">
                  Utbildning
                </Link>
              </li>
              <li>
                <Link to="/tjanster/change" className="hover:opacity-70 transition-opacity">
                  Change
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <p className="eyebrow text-[var(--color-background)]/50 mb-5">Kontakt</p>
            <ul className="space-y-3 text-base">
              <li>
                <a href="mailto:hej@care-er.se" className="hover:opacity-70 transition-opacity">
                  hej@care-er.se
                </a>
              </li>
              <li className="text-[var(--color-background)]/60">Stockholm, Sverige</li>
              <li>
                {/* TODO: Replace href with actual LinkedIn company page URL */}
                <a
                  href="https://www.linkedin.com/company/care-er"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[var(--color-background)]/45">
          <p>© {new Date().getFullYear()} care-er AB · Alla rättigheter förbehållna.</p>
          <p className="font-medium tracking-[0.06em] text-[var(--color-background)]/70">
            Service är strategi.
          </p>
        </div>

      </div>
    </footer>
  );
}
