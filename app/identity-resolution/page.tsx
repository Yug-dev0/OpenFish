import SubpageLayout from "@/components/SubpageLayout";

export default function IdentityResolutionPage() {
  return (
    <SubpageLayout
      badge="Capability 01 · Identity Resolution"
      title="Autonomous Identity & Entity De-Anonymization"
      subtitle="Reverse-Engineered Entity Attribution Across Dark Financial Rails"
      description="Scam operators conceal their real-world identities behind synthetic personas, disposable virtual numbers, and spoofed domains. OpenFish’s Identity Resolution engine uses honeypot interactions and cross-registry OSINT to pierce synthetic covers, correlating victim-facing phone numbers and payment endpoints to real-world financial entities."
      features={[
        {
          badge: "Entity Resolution",
          title: "Synthetic Persona De-masking",
          description: "Maps deceptive aliases, WhatsApp burner accounts, and Telegram handles back to common criminal operator clusters through shared payment destination routing.",
        },
        {
          badge: "Telecom OSINT",
          title: "Cellular MSISDN Attribution",
          description: "Queries national telecom carrier gateways to identify line activation status, circle of origin, and correlation with DoT Chakshu fraud blacklists.",
        },
        {
          badge: "Banking Rails",
          title: "Mule Account Beneficiary Fingerprinting",
          description: "Captures UPI Virtual Payment Addresses (VPAs) and extracts beneficiary account names registered with NPCI / banking rails during active bait sessions.",
        },
        {
          badge: "Affiliate Linkage",
          title: "Multi-Actor Scam Ring Detection",
          description: "Detects when seemingly independent scam websites and phishing campaigns channel illicit proceeds into the same cluster of beneficiary mule accounts.",
        },
        {
          badge: "Cross-Registry Check",
          title: "National Blacklist Correlation",
          description: "Cross-checks discovered identifiers in real-time against national cybercrime registries, consumer fraud databases, and financial dispute records.",
        },
        {
          badge: "Court Proof",
          title: "Cryptographic Identity Dossiers",
          description: "Generates tamper-evident audit logs with timestamped HTTP request/response traces, network socket telemetry, and SHA-256 session signatures.",
        },
      ]}
      specs={[
        ["Identity Resolution Protocols", "UPI VPA, MSISDN, Bank IFSC, Telegram UUID"],
        ["Telecom Verification", "National Carrier Routing + Chakshu Registry"],
        ["Beneficiary Mapping", "Real-Time NPCI Gateway Signature Extraction"],
        ["Dossier Legal Validity", "Section 65B Indian Evidence Act Compliant"],
        ["Attribution Accuracy", "Deterministic Financial Transaction Proof"],
        ["Integration Target", "Law Enforcement & Bank Fraud Desks"],
      ]}
    />
  );
}
