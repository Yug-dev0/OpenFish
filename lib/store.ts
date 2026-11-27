// In-memory case store with subscriptions (MVP — swap for Supabase later).
import type { CaseState } from "./types";

type Listener = (state: CaseState) => void;

const g = globalThis as unknown as {
  __openfish_cases?: Map<string, CaseState>;
  __openfish_subs?: Map<string, Set<Listener>>;
};
const cases = (g.__openfish_cases ??= new Map<string, CaseState>());
const subs = (g.__openfish_subs ??= new Map<string, Set<Listener>>());

export function putCase(state: CaseState): void {
  cases.set(state.id, state);
  notify(state.id);
}

export function getCase(id: string): CaseState | undefined {
  ensureSeeded();
  return cases.get(id);
}

export function listCases(): CaseState[] {
  ensureSeeded();
  return Array.from(cases.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function resetCases(): void {
  cases.clear();
  ensureSeeded();
}

function ensureSeeded(): void {
  if (cases.size > 0) return;

  const now = Date.now();
  const seedCases: CaseState[] = [
    {
      id: "case_hdfc_kyc_8921",
      createdAt: new Date(now - 14 * 60 * 1000).toISOString(),
      input: "https://hdfc-kyc-update-portal.online",
      inputType: "url",
      targetUrl: "https://hdfc-kyc-update-portal.online",
      status: "done",
      verdict: "scam",
      recon: {
        status: "done",
        runId: "run_recon_8921",
        streamingUrl: null,
        progress: [
          "Connecting to isolated TinyFish browser",
          "Analyzing DOM structure & SSL certificates",
          "Brand impersonation detected: HDFC Bank NetBanking",
          "Flagged credential harvesting form",
        ],
        result: {
          is_scam: true,
          confidence: "high",
          verdict_reason: "Deceptive domain mimicking HDFC Bank KYC portal, harvesting customer IDs and debit card PINs",
          brand_impersonated: "HDFC Bank",
          scam_type: "Banking Phishing & Credential Theft",
          page_summary: "Page requests immediate customer ID and OTP submission under threat of account freezing within 2 hours.",
          upi_ids: ["hdfcverify@ybl", "kycpay@okaxis"],
          phone_numbers: ["+91 98765 43210", "+91 91234 56789"],
          telegram_handles: ["@hdfc_quick_support"],
          emails: ["alert@hdfc-update-portal.online"],
          bank_accounts: ["HDFC Bank A/C: 50100492817291 (IFSC: HDFC0001234)"],
          other_urls: ["https://hdfc-kyc-update-portal.online/login.php"],
        },
        error: null,
        steps: [
          { action: "navigate to https://hdfc-kyc-update-portal.online", screenshot: null, timestamp: new Date(now - 14 * 60 * 1000).toISOString() },
          { action: "inspect phishing form and extracted HDFC logo copy", screenshot: null, timestamp: new Date(now - 13 * 60 * 1000).toISOString() },
        ],
        videoUrl: null,
      },
      bait: {
        status: "done",
        runId: "run_bait_8921",
        streamingUrl: null,
        progress: [
          "Deploying honeypot profile: Rajesh Kumar",
          "Submitted synthetic NetBanking credentials",
          "Captured downstream payment gateway request",
        ],
        result: {
          form_found: true,
          next_page_summary: "Redirected to fake payment gateway requesting mandatory verification deposit of ₹499.",
          payment_requested: "₹499 via UPI to hdfcverify@ybl",
          upi_ids: ["hdfcverify@ybl"],
          phone_numbers: ["+91 98765 43210"],
          telegram_handles: ["@hdfc_quick_support"],
          emails: [],
          bank_accounts: ["HDFC Bank A/C: 50100492817291"],
          other_urls: [],
        },
        error: null,
        steps: [
          { action: "injected fake customer ID and synthetic password", screenshot: null, timestamp: new Date(now - 12 * 60 * 1000).toISOString() },
          { action: "extracted payment rail request for ₹499", screenshot: null, timestamp: new Date(now - 11 * 60 * 1000).toISOString() },
        ],
        videoUrl: null,
      },
      mapper: {
        status: "done",
        progress: ["Queried TinyFish search engine", "Found 2 correlated campaign domains sharing same UPI rail"],
        sites: [
          {
            url: "https://hdfc-kyc-service.live",
            title: "HDFC Online KYC Update",
            matchedOn: ["hdfcverify@ybl"],
            snippet: "Active mirror using same payment rail and registrar.",
            source: "search",
          },
          {
            url: "https://axis-kyc-instant.online",
            title: "Axis NetBanking Support",
            matchedOn: ["+91 98765 43210"],
            snippet: "Cross-brand campaign operated by same scam syndicate.",
            source: "fetch",
          },
        ],
        error: null,
      },
    },
    {
      id: "case_power_bill_7410",
      createdAt: new Date(now - 48 * 60 * 1000).toISOString(),
      input: "Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM due to unpaid bill. Immediately contact officer at 9823456781 or pay at bijli-bill-pay.in",
      inputType: "message",
      targetUrl: "https://bijli-bill-pay.in",
      status: "done",
      verdict: "scam",
      recon: {
        status: "done",
        runId: "run_recon_7410",
        streamingUrl: null,
        progress: ["Extracted phone number and target URL from SMS", "Discovered rogue APK download link"],
        result: {
          is_scam: true,
          confidence: "high",
          verdict_reason: "Classic electricity disconnection scam asking for remote access APK and quick UPI payment",
          brand_impersonated: "State Electricity Board (BESCOM / MSEDCL)",
          scam_type: "Utility Impersonation & Remote Access Trojan",
          page_summary: "Fake utility portal demanding ₹100 instant update fee to cancel pending power outage order.",
          upi_ids: ["discomsupport@paytm"],
          phone_numbers: ["+91 98234 56781"],
          telegram_handles: [],
          emails: ["billdesk@bijli-bill-pay.in"],
          bank_accounts: ["State Bank of India A/C: 38291049281"],
          other_urls: ["https://bijli-bill-pay.in/download-support.apk"],
        },
        error: null,
        steps: [],
        videoUrl: null,
      },
      bait: {
        status: "done",
        runId: "run_bait_7410",
        streamingUrl: null,
        progress: ["Injected dummy meter account number", "Trapped UPI QR code"],
        result: {
          form_found: true,
          next_page_summary: "Prompted to scan dynamic UPI QR code linked to discomsupport@paytm.",
          payment_requested: "₹100 update fee",
          upi_ids: ["discomsupport@paytm"],
          phone_numbers: ["+91 98234 56781"],
          telegram_handles: [],
          emails: [],
          bank_accounts: [],
          other_urls: [],
        },
        error: null,
        steps: [],
        videoUrl: null,
      },
      mapper: {
        status: "done",
        progress: ["Mapped related phone numbers"],
        sites: [
          {
            url: "https://tneb-online-bill.xyz",
            title: "TNEB Power Bill Portal",
            matchedOn: ["+91 98234 56781"],
            snippet: "Identical template targeting Tamil Nadu power consumers.",
            source: "search",
          },
        ],
        error: null,
      },
    },
    {
      id: "case_official_bank_3321",
      createdAt: new Date(now - 120 * 60 * 1000).toISOString(),
      input: "https://www.hdfcbank.com",
      inputType: "url",
      targetUrl: "https://www.hdfcbank.com",
      status: "done",
      verdict: "legit",
      recon: {
        status: "done",
        runId: "run_recon_3321",
        streamingUrl: null,
        progress: ["Valid SSL certificate verified: DigiCert Extended Validation", "Legitimate corporate entity confirmed"],
        result: {
          is_scam: false,
          confidence: "high",
          verdict_reason: "Verified legitimate official website of HDFC Bank Ltd.",
          brand_impersonated: null,
          scam_type: null,
          page_summary: "Official homepage of HDFC Bank containing verified banking services, security disclosures, and regulatory notices.",
          upi_ids: [],
          phone_numbers: ["1800 202 6161"],
          telegram_handles: [],
          emails: ["support@hdfcbank.com"],
          bank_accounts: [],
          other_urls: [],
        },
        error: null,
        steps: [],
        videoUrl: null,
      },
      bait: {
        status: "done",
        runId: null,
        streamingUrl: null,
        progress: ["Skipped bait agent — site is verified legitimate"],
        result: null,
        error: null,
        steps: [],
        videoUrl: null,
      },
      mapper: {
        status: "done",
        progress: ["Verified domain reputation and DNS history"],
        sites: [],
        error: null,
      },
    },
    {
      id: "case_telegram_parttime_5512",
      createdAt: new Date(now - 210 * 60 * 1000).toISOString(),
      input: "Earn ₹3000 to ₹8000 daily by liking YouTube videos and rating hotels on Google Maps. Contact HR Manager on Telegram: @amazon_job_coordinator",
      inputType: "message",
      targetUrl: null,
      status: "done",
      verdict: "scam",
      recon: {
        status: "done",
        runId: "run_recon_5512",
        streamingUrl: null,
        progress: ["Telegram handle extracted: @amazon_job_coordinator", "Identified pre-paid task scam"],
        result: {
          is_scam: true,
          confidence: "high",
          verdict_reason: "Pre-paid task / YouTube rating scam designed to solicit crypto/UPI deposits under the guise of work-from-home commissions.",
          brand_impersonated: "Amazon India / Google LLC",
          scam_type: "Part-time Job & Task Investment Fraud",
          page_summary: "Promised daily payout of ₹5000 for completing 20 video reviews; requires initial security deposit of ₹1500.",
          upi_ids: ["merchantcorp@icici", "taskpayout@axl"],
          phone_numbers: ["+91 97112 34890"],
          telegram_handles: ["@amazon_job_coordinator", "@task_vip_manager"],
          emails: [],
          bank_accounts: ["ICICI Bank A/C: 002905008124"],
          other_urls: ["https://vip-task-earn.xyz"],
        },
        error: null,
        steps: [],
        videoUrl: null,
      },
      bait: {
        status: "done",
        runId: "run_bait_5512",
        streamingUrl: null,
        progress: ["Simulated Telegram task interaction", "Extracted deposit payment handle"],
        result: {
          form_found: true,
          next_page_summary: "Operator asked for ₹1500 recharge via UPI merchantcorp@icici to unlock VIP Level 2 tasks.",
          payment_requested: "₹1,500 deposit",
          upi_ids: ["merchantcorp@icici"],
          phone_numbers: ["+91 97112 34890"],
          telegram_handles: ["@amazon_job_coordinator"],
          emails: [],
          bank_accounts: [],
          other_urls: [],
        },
        error: null,
        steps: [],
        videoUrl: null,
      },
      mapper: {
        status: "done",
        progress: ["Found 4 identical Telegram syndicates"],
        sites: [
          {
            url: "https://vip-task-earn.xyz",
            title: "Task Wealth Global",
            matchedOn: ["@amazon_job_coordinator"],
            snippet: "Cryptocurrency and UPI deposit portal for task victims.",
            source: "search",
          },
        ],
        error: null,
      },
    },
  ];

  for (const c of seedCases) {
    cases.set(c.id, c);
  }
}

/** Mutate a case via updater and notify subscribers. */
export function updateCase(id: string, fn: (c: CaseState) => void): void {
  const c = cases.get(id);
  if (!c) return;
  fn(c);
  notify(id);
}

export function subscribe(id: string, fn: Listener): () => void {
  let set = subs.get(id);
  if (!set) subs.set(id, (set = new Set()));
  set.add(fn);
  return () => set!.delete(fn);
}

function notify(id: string): void {
  const c = cases.get(id);
  if (!c) return;
  subs.get(id)?.forEach((fn) => {
    try {
      fn(c);
    } catch {
      /* listener gone */
    }
  });
}
