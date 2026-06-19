export function GeometricComposition({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      role="img"
      aria-label="Geometrisk komposition inspirerad av logotypen"
    >
      <defs>
        <linearGradient id="ink-fade" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Large circle — warmth */}
      <circle
        cx="200"
        cy="240"
        r="170"
        fill="url(#ink-fade)"
        className="text-[var(--color-ink)] animate-drift-slow [transform-origin:200px_240px]"
      />

      {/* Cut wedge from circle — geometric end */}
      <path
        d="M 200 70 L 370 240 L 200 240 Z"
        fill="var(--color-background)"
      />

      {/* Smaller circle */}
      <circle
        cx="445"
        cy="155"
        r="42"
        fill="currentColor"
        className="text-[var(--color-ink)]/85 animate-drift [transform-origin:445px_155px]"
      />

      {/* Vertical bar (stem of "l") */}
      <rect
        x="480"
        y="220"
        width="34"
        height="220"
        rx="2"
        fill="currentColor"
        className="text-[var(--color-ink)]"
      />

      {/* 45-degree slash — precision */}
      <line
        x1="80"
        y1="500"
        x2="380"
        y2="200"
        stroke="currentColor"
        strokeWidth="2"
        className="text-[var(--color-ink)]/40"
      />

      {/* Open ring */}
      <circle
        cx="380"
        cy="430"
        r="78"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-[var(--color-ink)]/35"
      />

      {/* Tiny dot */}
      <circle cx="555" cy="465" r="6" fill="currentColor" className="text-[var(--color-ink)]" />
    </svg>
  );
}
