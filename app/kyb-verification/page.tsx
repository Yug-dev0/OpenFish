import SubpageLayout from "@/components/SubpageLayout";

export default function KybVerificationPage() {
  return (
    <SubpageLayout
      badge="Capability 03 · Brand Authentication"
      title="Brand Impersonation Defense & Digital Authentication"
      subtitle="Defending Financial Institutions and Global Brands Against Lookalike Phishing Mirrors"
      description="Cybercriminal syndicates clone legitimate corporate portals, mobile apps, and KYC verification flows to steal customer credentials and payment data. OpenFish crawls suspected spoof domains with automated vision models and DOM-similarity algorithms, proving intentional brand impersonation and triggering automated registrar takedowns."
      features={[
        {
          badge: "Visual Fingerprinting",
          title: "DOM & Logo Similarity Matching",
          description: "Compares suspicious landing pages with official bank portals, identifying unauthorized brand logo usage, trademark infringement, and visual spoofing.",
        },
        {
          badge: "Credential Harvester Defense",
          title: "Synthetic Credential Poisoning",
          description: "Detects fake login forms (passwords, PINs, OTPs) and safely injects marked honey-credentials to track internal exfiltration pipelines.",
        },
        {
          badge: "Infrastructure Tracking",
          title: "SSL Certificate & Bulletproof Host OSINT",
          description: "Fingerprints rogue hosting providers, Cloudflare tunnel bypasses, and Let's Encrypt certificates deployed across scam networks.",
        },
        {
          badge: "Rapid Takedown",
          title: "Registrar Abuse Notice Automation",
          description: "Compiles evidence dossiers with timestamped screenshots and DNS records ready for immediate transmission to registrars (GoDaddy, Namecheap, etc.).",
        },
        {
          badge: "KYC Phishing Detection",
          title: "Banking KYC Scam Interception",
          description: "Specialized detection pipelines for fake banking alerts ('Your account will be suspended, update PAN/KYC immediately').",
        },
        {
          badge: "Legitimacy Scoring",
          title: "Legitimate Entity Clearance",
          description: "Verified legitimate entities (e.g. official bank domains with valid EV certificates) are immediately cleared to avoid false positives.",
        },
      ]}
      specs={[
        ["Visual Similarity Detection", "Deep Visual Feature & DOM Structural Comparison"],
        ["Certificate Fingerprinting", "X.509 Serial, Issuer, Subject Alt Names (SAN)"],
        ["Abuse Contact Automation", "WHOIS Registrar & Hosting NOC API Dispatch"],
        ["Takedown Packet Standard", "APWG / ICANN Abuse Reporting Compliant"],
        ["Average Crawl Duration", "15–30 Seconds per Suspicious Domain"],
        ["Target Protection Coverage", "Retail Banks, NBFCs, Utilities, Government Portals"],
      ]}
    />
  );
}
