import Script from "next/script";

export default function PlausibleScript() {
  return (
    <>
      <Script
        defer
        data-domain="v0-ai-learning-platform-f2eur4g44.vercel.app"
        src="https://plausible.io/js/script.outbound-links.js"
        strategy="afterInteractive"
      />
      <Script id="plausible-init" strategy="afterInteractive">
        {`
          window.plausible = window.plausible || function() {
            (window.plausible.q = window.plausible.q || []).push(arguments)
          }
        `}
      </Script>
    </>
  );
}
