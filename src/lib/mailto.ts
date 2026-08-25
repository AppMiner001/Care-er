type MailDraft = {
  to: string;
  subject: string;
  body: string;
};

function normalizeLineBreaks(value: string) {
  return value.replace(/\r?\n/g, "\r\n");
}

export function createMailtoHref({ to, subject, body }: MailDraft) {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(normalizeLineBreaks(body));

  return `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;
}
