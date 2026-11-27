import SubpageLayout from "@/components/SubpageLayout";

export default function AccessOurDataPage() {
  return (
    <SubpageLayout
      badge="Data Access &amp; Feeds · API Integration"
      title="Access OpenFish Cyber Threat Intelligence"
      subtitle="Direct APIs, Real-Time Webhooks, and Structured Evidence Feeds"
      description="Connect your Security Operations Center (SOC), Fraud Desk, or Law Enforcement Command Center directly to OpenFish's real-time honeypot intelligence. Consume streaming forensic telemetry via Server-Sent Events (SSE), query verified case dossiers via REST API, or subscribe to high-velocity financial rail blocklists."
      features={[
        {
          badge: "Real-Time Telemetry",
          title: "Streaming Event Feed (SSE)",
          description: "Stream real-time browser agent milestones, extracted form payloads, and network screenshots as they occur inside isolated honeypots via `/api/cases/:id/events`.",
        },
        {
          id: "enrichment-api",
          badge: "REST Ingestion API",
          title: "Automated Case Dispatch API",
          description: "Programmatically dispatch new investigation targets (URLs, phone numbers, UPI VPAs) from your intake portals with immediate sandbox execution via `POST /api/cases`.",
        },
        {
          id: "data-license-feeds",
          badge: "Financial Rail Feed",
          title: "Flagged Mule Account Blocklist",
          description: "Automated daily feeds of verified malicious UPI VPAs and fraudulent beneficiary bank accounts for immediate transaction-blocking in banking systems.",
        },
        {
          badge: "Legal Dossier Export",
          title: "Cryptographic Section 65B JSON Export",
          description: "Download fully structured case dossiers with cryptographic signatures, timestamped screenshots, and legal complaint drafts in standard JSON.",
        },
        {
          badge: "SIEM & SOAR Integration",
          title: "Enterprise Webhook Dispatch",
          description: "Forward confirmed scam alerts and extracted IOCs directly to Microsoft Sentinel, Splunk, Palo Alto Cortex, or Jira Service Desk.",
        },
        {
          badge: "Cloud Data Sharing",
          title: "Direct Snowflake & BigQuery Sharing",
          description: "Query full-fidelity historical scam campaign graphs and sibling mirror databases directly within your data warehouse with zero pipeline latency.",
        },
      ]}
      specs={[
        ["API Protocols", "REST JSON (HTTPS), Server-Sent Events (SSE)"],
        ["Authentication Methods", "Bearer API Tokens, Mutual TLS (mTLS), OIDC"],
        ["Data Export Formats", "JSON, CSV, STIX 2.1, PDF Dossier"],
        ["Rate Limits", "10,000 queries / minute for Enterprise Tiers"],
        ["SLA Guarantee", "99.95% API Availability · Sub-Second Query Response"],
        ["Compliance Standard", "SOC 2 Type II, ISO 27001, Indian IT Act Sec 65B"],
      ]}
    />
  );
}
