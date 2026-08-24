import { useEffect, useRef, useState } from "react";

type FieldName = "name" | "email" | "mobile" | "privacy";
type FieldErrors = Partial<Record<FieldName, string>>;

const fields = [
  {
    name: "name",
    label: "Förnamn + efternamn",
    type: "text",
    autoComplete: "name",
    inputMode: "text",
  },
  {
    name: "email",
    label: "E-post",
    type: "email",
    autoComplete: "email",
    inputMode: "email",
  },
  {
    name: "mobile",
    label: "Mobilnummer",
    type: "tel",
    autoComplete: "tel",
    inputMode: "tel",
  },
] as const;

export function CareerJoinDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
      onCancel={() => onOpenChange(false)}
      aria-labelledby="career-join-title"
      aria-describedby="career-join-description"
      className="fixed left-1/2 top-1/2 m-0 max-h-[calc(100svh-1rem)] w-[calc(100%-1rem)] max-w-[70rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.5rem] border-0 bg-[var(--color-background)] px-5 pb-5 pt-5 text-[var(--color-ink)] shadow-2xl outline-none backdrop:bg-[oklch(0.04_0.02_271/0.72)] backdrop:backdrop-blur-sm sm:w-[calc(100%-2rem)] sm:rounded-[1.75rem] sm:px-7 sm:pb-7 sm:pt-7 md:px-9 md:pb-9 md:pt-9 lg:px-11 lg:pb-10 lg:pt-10"
    >
      <button
        type="button"
        onClick={() => onOpenChange(false)}
        className="absolute right-4 top-4 z-10 h-11 w-11 rounded-full border border-[var(--color-ink)]/15 text-[var(--color-ink)]/65 transition-colors hover:text-[var(--color-ink)] focus-visible:outline-offset-2 sm:right-6 sm:top-6"
        aria-label="Stäng formuläret"
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

      <JoinCareErForm />
    </dialog>
  );
}

function JoinCareErForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [firstName, setFirstName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const submissionInProgressRef = useRef(false);
  const submissionIdRef = useRef<string | null>(null);

  const validate = (formData: FormData): FieldErrors => {
    const nextErrors: FieldErrors = {};
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const mobile = String(formData.get("mobile") ?? "").trim();
    const privacy = formData.get("privacy");

    if (name.length < 2 || !name.includes(" ")) {
      nextErrors.name = "Skriv både förnamn och efternamn.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Skriv en giltig e-postadress.";
    }
    const phoneDigits = mobile.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15 || !/^[+()\d\s-]+$/.test(mobile)) {
      nextErrors.mobile = "Skriv ett giltigt mobilnummer, till exempel 070-123 45 67.";
    }
    if (!privacy) {
      nextErrors.privacy = "Bekräfta att du har tagit del av informationen.";
    }

    return nextErrors;
  };

  const focusFirstError = (nextErrors: FieldErrors) => {
    const firstErrorName = (["name", "email", "mobile", "privacy"] as const).find(
      (name) => nextErrors[name],
    );
    if (!firstErrorName) return;
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstErrorName}"]`)?.focus();
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionInProgressRef.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    setStatus("idle");

    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }

    submissionInProgressRef.current = true;
    setStatus("loading");
    let timeout: number | undefined;

    try {
      const controller = new AbortController();
      timeout = window.setTimeout(() => controller.abort(), 12_000);
      const submissionId = submissionIdRef.current ?? window.crypto.randomUUID();
      submissionIdRef.current = submissionId;
      const response = await fetch("/api/career-join", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json", "Idempotency-Key": submissionId },
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error("Submission was not confirmed");
      }

      const name = String(formData.get("name") ?? "").trim();
      setFirstName(name.split(/\s+/)[0] ?? "");
      setStatus("success");
      requestAnimationFrame(() => successHeadingRef.current?.focus());
    } catch {
      setStatus("error");
    } finally {
      if (timeout !== undefined) window.clearTimeout(timeout);
      submissionInProgressRef.current = false;
    }
  };

  if (status === "success") {
    return (
      <div className="py-12 sm:py-16" role="status" aria-live="polite">
        <p className="eyebrow mb-7 text-[var(--color-ink)]/55">Bli en del av care-er</p>
        <h2
          id="career-join-title"
          ref={successHeadingRef}
          tabIndex={-1}
          className="text-balance text-[var(--color-ink)] outline-none"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            fontWeight: 700,
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
          }}
        >
          Hej, {firstName}.
        </h2>
        <div className="mt-8 max-w-lg space-y-5 text-lg leading-relaxed text-[var(--color-ink)]/70">
          <p>Nu vet vi att du finns.</p>
          <p>Vi hör av oss så att vi kan lära känna dig lite bättre.</p>
          <p className="pt-4 font-semibold text-[var(--color-ink)]">care-er</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-[0.92fr_1.08fr] md:gap-10 lg:gap-14">
      <div className="pr-12 md:pr-2">
        <p className="eyebrow mb-3 text-[var(--color-ink)]/55 md:mb-5">Karriär</p>
        <h2
          id="career-join-title"
          className="max-w-[12ch] text-balance text-[var(--color-ink)]"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 700,
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
          }}
        >
          Bli en del av care-er.
        </h2>
        <div
          id="career-join-description"
          className="mt-4 max-w-xl space-y-0.5 text-sm leading-[1.45] text-[var(--color-ink)]/66 sm:text-base md:mt-6 md:space-y-1 md:text-lg"
          style={{ fontWeight: 300 }}
        >
          <p>Du behöver inte söka jobb för att börja prata med oss.</p>
          <p>Kanske letar du efter nästa steg.</p>
          <p>Kanske är du bara nyfiken på vad som finns där ute.</p>
          <p>Kanske trivs du precis där du är.</p>
          <p className="pt-2 font-medium text-[var(--color-ink)] md:pt-3">
            Börja med att säga hej.
          </p>
        </div>
      </div>

      <form ref={formRef} noValidate onSubmit={onSubmit} className="space-y-4 md:space-y-5">
        {fields.map((field) => {
          const error = errors[field.name];
          return (
            <div key={field.name} className="group/field">
              <label
                htmlFor={`career-${field.name}`}
                className="mb-1 block text-[0.64rem] font-medium uppercase tracking-[0.18em] text-[var(--color-ink)]/58 group-focus-within/field:text-[var(--color-ink)] md:mb-1.5 md:text-[0.68rem]"
              >
                {field.label}
              </label>
              <input
                id={`career-${field.name}`}
                name={field.name}
                type={field.type}
                inputMode={field.inputMode}
                autoComplete={field.autoComplete}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `career-${field.name}-error` : undefined}
                onChange={() => {
                  if (error) setErrors((current) => ({ ...current, [field.name]: undefined }));
                  if (status === "error") setStatus("idle");
                }}
                className="min-h-9 w-full border-0 border-b border-[var(--color-ink)]/20 bg-transparent pb-1.5 text-base text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-ink)]/25 focus:border-[var(--color-ink)] aria-[invalid=true]:border-red-700 md:min-h-10 md:pb-2 md:text-lg"
              />
              {error && (
                <p
                  id={`career-${field.name}-error`}
                  className="mt-2 text-sm text-red-700"
                  role="alert"
                >
                  {error}
                </p>
              )}
            </div>
          );
        })}

        <div>
          <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-[1.45] text-[var(--color-ink)]/65 sm:text-sm md:gap-3 md:leading-relaxed">
            <input
              name="privacy"
              type="checkbox"
              aria-invalid={Boolean(errors.privacy)}
              aria-describedby={errors.privacy ? "career-privacy-error" : "career-privacy-note"}
              onChange={() => {
                if (errors.privacy) setErrors((current) => ({ ...current, privacy: undefined }));
              }}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-ink)] md:mt-1"
            />
            <span id="career-privacy-note">
              Jag har tagit del av att uppgifterna används för att care-er ska kunna kontakta mig om
              karriärmöjligheter. Marknadsföring kräver ett separat medgivande.
            </span>
          </label>
          {errors.privacy && (
            <p id="career-privacy-error" className="mt-2 text-sm text-red-700" role="alert">
              {errors.privacy}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary min-h-11 min-w-32 justify-center disabled:cursor-not-allowed disabled:opacity-45"
          >
            <span>{status === "loading" ? "Skickar…" : "Säg hej"}</span>
            {status !== "loading" && <span aria-hidden>→</span>}
          </button>
          {status === "error" && (
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-red-700" role="alert">
              Ditt hej kunde inte bekräftas. Dina uppgifter finns kvar — försök igen eller mejla oss
              på{" "}
              <a className="underline underline-offset-2" href="mailto:hej@care-er.se">
                hej@care-er.se
              </a>
              .
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
