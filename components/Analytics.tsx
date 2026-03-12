export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!plausibleDomain) return null;

  return (
    <script
      defer
      data-domain={plausibleDomain}
      src="https://plausible.io/js/script.js"
    />
  );
}
