import SubpageLayout from "@/components/SubpageLayout";

export default function SmbIntelligencePage() {
  return (
    <SubpageLayout
      badge="Capability 04 · Threat Intelligence"
      title="Cybercrime Campaign & Sibling Mirror Intelligence"
      subtitle="Graphing Distributed Scam Networks Across Thousands of Correlated Domains"
      description="Scam operators rarely deploy a single website; they deploy automated generator scripts that spin up hundreds of identical clone mirrors across different TLDs. OpenFish’s Campaign Intelligence engine tracks shared infrastructure, tracking tags, and financial rails to map the entire criminal syndicate in a single interactive graph."
      features={[
        {
          badge: "Campaign Clustering",
          title: "Multi-Domain Sibling Discovery",
          description: "Identifies sibling sites that share common Google Analytics IDs, Facebook Pixel codes, or payment endpoint scripts across different registrars.",
        },
        {
          badge: "Interactive Graphing",
          title: "Dynamic Network Topology",
          description: "Renders full visual relationship graphs showing the focal target, intermediary mule accounts, and all sibling domains linked to the criminal ring.",
        },
        {
          badge: "Syndicate Profiling",
          title: "Criminal Infrastructure Fingerprinting",
          description: "Maintains persistent profiles of repeat threat actors, recording historical domains, IP ranges, and recurring payment handles.",
        },
        {
          badge: "Autonomous Crawl Depth",
          title: "Multi-Hop Web Crawling",
          description: "Traverses redirection chains, URL shorteners (bit.ly, tinyurl), and landing page redirectors to pinpoint ultimate destination targets.",
        },
        {
          badge: "Cross-Case Correlation",
          title: "Global Entity Deduplication",
          description: "Instantly notifies investigators when a newly reported phone number or UPI ID matches financial rails discovered in earlier cases.",
        },
        {
          badge: "Export & Sharing",
          title: "STIX / TAXII Threat Feed Export",
          description: "Exports IOCs (Indicators of Compromise) in standard formats for direct ingestion into enterprise SIEMs (Splunk, Microsoft Sentinel).",
        },
      ]}
      specs={[
        ["Graph Engine", "ReactFlow Real-Time Force-Directed Network Graph"],
        ["Correlation Heuristics", "Shared UPI VPA, Analytics IDs, Phone, DNS Host"],
        ["Threat Sharing Formats", "JSON, CSV, STIX 2.1, Cybercrime Complaint Formats"],
        ["Ingestion Protocols", "REST API, Webhook, Manual Console Entry"],
        ["Historical Data Persistence", "Immutable Forensic Ledger with SHA-256 Hashes"],
        ["Use Cases", "Law Enforcement Task Forces, Threat Intel Teams"],
      ]}
    />
  );
}
