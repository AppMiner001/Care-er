import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s-]+$/;

function isValidSubmission(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const mobile = String(formData.get("mobile") ?? "").trim();
  const privacy = formData.get("privacy");
  const phoneDigits = mobile.replace(/\D/g, "");

  return (
    name.length >= 2 &&
    name.includes(" ") &&
    emailPattern.test(email) &&
    phonePattern.test(mobile) &&
    phoneDigits.length >= 7 &&
    phoneDigits.length <= 15 &&
    privacy === "on"
  );
}

export const Route = createFileRoute("/api/career-join")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let formData: FormData;
        try {
          formData = await request.formData();
        } catch {
          return Response.json({ error: "invalid_submission" }, { status: 400 });
        }

        if (!isValidSubmission(formData)) {
          return Response.json({ error: "invalid_submission" }, { status: 400 });
        }

        const endpoint = process.env.CAREER_FORM_ENDPOINT;
        if (!endpoint) {
          return Response.json({ error: "service_unavailable" }, { status: 503 });
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10_000);

        try {
          const response = await fetch(endpoint, {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json",
              "Idempotency-Key": request.headers.get("Idempotency-Key") ?? crypto.randomUUID(),
            },
            signal: controller.signal,
          });

          if (!response.ok) {
            return Response.json({ error: "upstream_rejected" }, { status: 502 });
          }

          return new Response(null, { status: 204 });
        } catch {
          return Response.json({ error: "upstream_unavailable" }, { status: 502 });
        } finally {
          clearTimeout(timeout);
        }
      },
    },
  },
});
