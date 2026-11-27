import SubpageLayout from "@/components/SubpageLayout";

export default function SolutionsPage() {
  return (
    <SubpageLayout
      badge="Full Suite Architecture · Autonomous Defense"
      title="Autonomous Cyber Recon & Honeypot Solutions"
      subtitle="AI Agents That Bait Scammers, Unmask Financial Rails, and Build Legal Dossiers"
      description="OpenFish operates a distributed mesh of autonomous AI agents that bait online scammers inside isolated, disposable browser sandboxes. By interacting convincingly with deceptive portals and telemarketing operations, our agents trigger live payment demands, unmask hidden UPI IDs and bank accounts, and automatically compile tamper-evident court dossiers."
      features={[
        {
          badge: "Browser Sandboxing",
          title: "Autonomous Reconnaissance Agent",
          description: "Deploys an isolated remote browser into the suspicious URL, crawls landing pages, fingerprints brand impersonation, and checks SSL/DNS anomalies without risking investigator infrastructure.",
        },
        {
          badge: "Synthetic Personas",
          title: "Autonomous Decoy Honeypot",
          description: "Deploys dynamic victim personas that fill forms, converse with fraud operators, and trigger backend financial demands to extract active beneficiary payment rails.",
        },
        {
          badge: "Financial Forensics",
          title: "Payment Rail & Identity Unmasking",
          description: "Extracts and cross-references mule UPI handles (@okaxis, @ybl), beneficiary IFSC codes, phone numbers, and Telegram channels against national blacklist databases.",
        },
        {
          badge: "Section 65B Compliance",
          title: "Legal Dossier Auto-Compiler",
          description: "Generates standardized, court-ready cybercrime complaints formatted for cybercrime.gov.in and law enforcement dispatch under Section 66D IT Act.",
        },
        {
          badge: "Infrastructure OSINT",
          title: "Campaign Mirror Graphing",
          description: "Discovers correlated clone mirrors sharing identical analytics IDs, SSL certificates, or payment gateways across thousands of live scam sites.",
        },
        {
          badge: "Telecom Intelligence",
          title: "Cellular & Carrier OSINT Gateway",
          description: "Performs real-time MSISDN routing, carrier attribution, and Sanchar Saathi / Chakshu spam registry checks for telemarketing fraud investigations.",
        },
      ]}
      specs={[
        ["Sandbox Isolation Architecture", "Remote Micro-VM Headless Browser"],
        ["Evidence Standard", "Section 65B Indian Evidence Act / Sec 63 BSA"],
        ["Extracted Financial Rail Types", "UPI VPA, Bank Account + IFSC, Crypto, Phone"],
        ["Automated Dossier Format", "Standard Cybercrime.gov.in Complaint Draft"],
        ["Campaign Graph Clustering", "Shared VPA, Analytics IDs, DNS Nameservers"],
        ["Real-Time Event Transport", "Server-Sent Events (SSE) Stream"],
      ]}
    />
  );
}
