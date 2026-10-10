export function sanitizeFilename(filename: string): string {
  // Remove control characters and illegal filesystem characters
  return filename
    .replace(/[/\\?%*:|"<>]/g, '_')
    .replace(/\s+/g, '_')
    .trim();
}

export function isValidEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const trimmed = email.trim().toLowerCase();
  if (
    trimmed === '#n/a' ||
    trimmed === 'nomail@nomail.com' ||
    trimmed === 'nomail' ||
    trimmed === 'na' ||
    trimmed === 'n/a' ||
    trimmed === 'nil' ||
    trimmed.includes('nomail')
  ) {
    return false;
  }
  // Basic email pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed);
}

export function resolvePdfFilename(mailId: string, lanNumber: string): {
  filename: string;
  isMissingEmail: boolean;
  cleanEmail: string;
} {
  const rawEmail = (mailId || '').trim();
  const valid = isValidEmail(rawEmail);

  if (!valid) {
    const safeLan = sanitizeFilename(lanNumber || 'UNKNOWN');
    return {
      filename: `MISSING_EMAIL_${safeLan}.pdf`,
      isMissingEmail: true,
      cleanEmail: rawEmail || 'No Email Provided',
    };
  }

  // Exact lowercase or trimmed email
  const cleanEmail = sanitizeFilename(rawEmail.toLowerCase());
  return {
    filename: `${cleanEmail}.pdf`,
    isMissingEmail: false,
    cleanEmail: rawEmail,
  };
}
