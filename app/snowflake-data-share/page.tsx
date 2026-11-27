import SubpageLayout from "@/components/SubpageLayout";

export default function SnowflakeDataSharePage() {
  return (
    <SubpageLayout
      badge="Enterprise Cloud Sharing · Snowflake &amp; Cloud"
      title="Snowflake Secure Data Sharing for Cyber Intelligence"
      subtitle="Direct Zero-ETL Access to OpenFish's Complete Scam Graph &amp; Rail Database"
      description="Leverage Snowflake Secure Data Sharing to query OpenFish’s real-time scam intelligence directly from your own data warehouse without moving, transforming, or copying files. Cross-reference your internal customer transaction logs against millions of flagged scam rails with zero latency."
      features={[
        {
          badge: "Zero-ETL",
          title: "Direct Table Access",
          description: "Query OpenFish's live `CAMPAIGNS`, `EXTRACTED_RAILS`, and `MULE_ACCOUNTS` tables as native views inside your Snowflake account.",
        },
        {
          badge: "Internal Correlation",
          title: "Instant Transaction Matching",
          description: "Join your outbound UPI and IMPS payment records against OpenFish's flagged VPAs to detect ongoing victim payouts before settlement.",
        },
        {
          badge: "Always Live",
          title: "Continuous Sub-Second Replication",
          description: "New fraudulent identifiers discovered by our autonomous honeypot agents are instantly accessible in your shared database views.",
        },
        {
          badge: "Role-Based Security",
          title: "Granular Privacy & Governance",
          description: "Role-based access controls and masking policies ensure strict data governance while maintaining investigator access.",
        },
        {
          badge: "Multi-Cloud Support",
          title: "Cross-Cloud & Cross-Region",
          description: "Available across AWS, Azure, and Google Cloud regions with seamless cross-region data sharing replication.",
        },
        {
          badge: "Compliance Ready",
          title: "Audit-Ready Provenance",
          description: "Every record includes SHA-256 case verification hashes and Section 65B IT Act evidentiary metadata.",
        },
      ]}
      specs={[
        ["Data Sharing Architecture", "Snowflake Secure Data Sharing (Native Zero-ETL)"],
        ["Replication Latency", "< 1 Second from Evidence Capture"],
        ["Supported Clouds", "AWS, Microsoft Azure, Google Cloud Platform"],
        ["Pre-Built Schemas", "OPENFISH_CORE, OPENFISH_FINRAILS, OPENFISH_IOCS"],
        ["Supported BI Tools", "Tableau, PowerBI, Looker, ThoughtSpot, Hex"],
        ["Security Standard", "FedRAMP Moderate, SOC 2 Type II, HIPAA Compliant"],
      ]}
    />
  );
}
