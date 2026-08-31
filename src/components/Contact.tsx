import { Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { createMailtoHref } from "@/lib/mailto";

const fields = [
  {
    name: "namn",
    label: "Namn",
    type: "text",
    placeholder: "Ert namn",
    autoComplete: "name",
    maxLength: 120,
  },
  {
    name: "foretag",
    label: "Företag",
    type: "text",
    placeholder: "Organisation",
    autoComplete: "organization",
    maxLength: 160,
  },
  {
    name: "epost",
    label: "E-post",
    type: "email",
    placeholder: "er@foretag.se",
    autoComplete: "email",
    maxLength: 254,
  },
] as const;

export function CompanyContactDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const idPrefix = useId();
  const titleId = `${idPrefix}-title`;
  const descriptionId = `${idPrefix}-description`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={() => onOpenChange(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          dialogRef.current?.close();
        }
      }}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="fixed left-1/2 top-1/2 m-0 max-h-[calc(100svh-1rem)] w-[calc(100%-1rem)] max-w-[70rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--color-ink)] p-0 text-[var(--color-background)] shadow-2xl outline-none backdrop:bg-[oklch(0.04_0.02_271/0.74)] backdrop:backdrop-blur-sm sm:w-[calc(100%-2rem)] sm:rounded-[1.75rem]"
    >
      <div className="relative max-h-[calc(100svh-1rem)] overflow-y-auto overscroll-contain px-5 pb-6 pt-6 sm:px-7 sm:pb-8 sm:pt-8 md:px-9 md:pb-9 md:pt-9 lg:px-11 lg:pb-10 lg:pt-10">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="absolute right-4 top-4 z-20 h-11 w-11 rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/35 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-6"
          aria-label="Stäng företagsformuläret"
        >
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current"
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current"
          />
        </button>

        <CompanyContactForm
          idPrefix={idPrefix}
          titleId={titleId}
          descriptionId={descriptionId}
          onNavigateAway={() => dialogRef.current?.close()}
        />
      </div>
    </dialog>
  );
}

function CompanyContactForm({
  idPrefix,
  titleId,
  descriptionId,
  onNavigateAway,
}: {
  idPrefix: string;
  titleId: string;
  descriptionId: string;
  onNavigateAway: () => void;
}) {
  const [message, setMessage] = useState("");
  const [draftHref, setDraftHref] = useState<string | null>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("namn") ?? "").trim();
    const company = String(formData.get("foretag") ?? "").trim();
    const email = String(formData.get("epost") ?? "").trim();
    const formMessage = String(formData.get("meddelande") ?? "").trim();
    const href = createMailtoHref({
      to: "hej@care-er.se",
      subject: `Företagsförfrågan från ${company}`,
      body: [
        "Hej care-er,",
        "",
        "Jag vill gärna prata med er.",
        "",
        `Namn: ${name}`,
        `Företag: ${company}`,
        `E-post: ${email}`,
        "",
        "Vad vi vill åstadkomma:",
        formMessage,
        "",
        "Skapat via care-er.se",
      ].join("\n"),
    });

    setDraftHref(href);
    window.location.assign(href);
  };

  return (
    <div className="grid gap-7 md:grid-cols-[0.92fr_1.08fr] md:gap-10 lg:gap-14">
      <div className="pr-12 md:pr-2">
        <p className="eyebrow mb-3 text-white/55 md:mb-5">Företag</p>
        <h2
          id={titleId}
          className="max-w-[12ch] text-balance text-white"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 700,
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
          }}
        >
          Låt oss börja med ett samtal.
        </h2>
        <p
          id={descriptionId}
          className="mt-4 max-w-sm text-sm leading-relaxed text-white/68 sm:text-base md:mt-6 md:text-lg"
          style={{ fontWeight: 300 }}
        >
          Berätta var ni är. Vi berättar hur vi kan hjälpa. Vi återkommer inom 24 timmar.
        </p>

        <div className="mt-6 space-y-2 text-sm md:mt-8">
          <a
            className="block text-white/72 transition-colors hover:text-white"
            href="mailto:hej@care-er.se"
          >
            hej@care-er.se
          </a>
          <p className="text-white/58">
            Föreningsgatan 14
            <br />
            411 27 Göteborg
          </p>
          <a
            className="block text-white/72 transition-colors hover:text-white"
            href="tel:+46317610800"
          >
            031-761 08 00
          </a>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 md:space-y-5 md:pr-14 lg:pr-16">
        {fields.map((field) => {
          const fieldId = `${idPrefix}-${field.name}`;
          return (
            <div key={field.name} className="group/field">
              <label
                htmlFor={fieldId}
                className="mb-1 block text-[0.64rem] font-medium uppercase tracking-[0.18em] text-white/58 transition-colors group-focus-within/field:text-white md:mb-1.5 md:text-[0.68rem]"
              >
                {field.label}
              </label>
              <input
                id={fieldId}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                maxLength={field.maxLength}
                required
                placeholder={field.placeholder}
                onChange={() => {
                  if (draftHref) setDraftHref(null);
                }}
                className="min-h-9 w-full border-0 border-b border-white/20 bg-transparent pb-1.5 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-white md:min-h-10 md:pb-2 md:text-lg"
              />
            </div>
          );
        })}

        <div className="group/field">
          <label
            htmlFor={`${idPrefix}-meddelande`}
            className="mb-1 block text-[0.64rem] font-medium uppercase tracking-[0.18em] text-white/58 transition-colors group-focus-within/field:text-white md:mb-1.5 md:text-[0.68rem]"
          >
            Vad vill ni åstadkomma?
          </label>
          <textarea
            id={`${idPrefix}-meddelande`}
            name="meddelande"
            rows={3}
            maxLength={1000}
            aria-describedby={`${idPrefix}-meddelande-maxlangd`}
            required
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              if (draftHref) setDraftHref(null);
            }}
            placeholder="Beskriv utmaningen eller behovet…"
            className="w-full resize-none border-0 border-b border-white/20 bg-transparent pb-1.5 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-white md:pb-2 md:text-lg"
          />
          <p
            id={`${idPrefix}-meddelande-maxlangd`}
            className="mt-1.5 text-right text-[0.65rem] tabular-nums text-white/42"
          >
            {message.length}/1000 tecken
          </p>
        </div>

        <div className="pt-1">
          <p className="mb-3 max-w-lg text-xs leading-relaxed text-white/52">
            När du skickar formuläret behandlar vi dina uppgifter för att kunna kontakta dig. Läs
            mer i vår{" "}
            <Link
              className="underline underline-offset-2"
              to="/integritet"
              onClick={onNavigateAway}
            >
              integritetspolicy
            </Link>
            .
          </p>
          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-[var(--color-background)] px-5 text-sm font-medium text-[var(--color-ink)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span>Öppna mejlutkast</span>
            <span aria-hidden>→</span>
          </button>
          {draftHref ? (
            <p
              role="status"
              aria-live="polite"
              className="mt-4 max-w-lg text-sm leading-relaxed text-white/68"
            >
              Mejlutkastet ska nu vara öppet i ditt mejlprogram. Skicka det därifrån för att
              slutföra. Om inget öppnades kan du{" "}
              <a href={draftHref} className="underline underline-offset-2">
                öppna utkastet igen
              </a>{" "}
              eller mejla{" "}
              <a href="mailto:hej@care-er.se" className="underline underline-offset-2">
                hej@care-er.se
              </a>
              .
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
