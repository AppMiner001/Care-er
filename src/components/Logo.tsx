import { Link } from "@tanstack/react-router";
import logoSrc from "@/assets/care-er-logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label="care-er hem"
    >
      <img
        src={logoSrc}
        alt="care-er"
        className="h-6 md:h-[1.6rem] w-auto object-contain"
        draggable={false}
      />
    </Link>
  );
}
