import Link from "next/link";
import CaseView from "@/components/CaseView";

export default async function CasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-[#080808] text-[#f2f2f0] font-['Open_Sans',sans-serif]">
      {/* Top Operations Bar */}
      <header className="border-b border-white/10 bg-[#0f0f0f]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1620px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-['Almarai'] font-bold text-xl tracking-tight text-white uppercase">
                OPEN<span className="text-[#cd0001]">FISH</span>
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#cd0001] animate-pulse"></span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-black/60 border border-white/10 rounded-full font-mono text-[10px] text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
              <span>LIVE INCIDENT FORENSICS · SANDBOX ISOLATION ACTIVE</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono uppercase tracking-wider text-gray-300 hover:text-white transition-all flex items-center gap-2"
            >
              <span>← Back to Dashboard</span>
            </Link>
            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Forensic Case Container */}
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        <CaseView caseId={id} />
      </main>
    </div>
  );
}