import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f2f2f0] font-['Open_Sans',sans-serif] flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-white/10 bg-[#0f0f0f]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-['Almarai'] font-bold text-xl tracking-tight text-white uppercase">
              OPEN<span className="text-[#cd0001]">FISH</span>
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#cd0001] animate-pulse"></span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-lg bg-[#cd0001] hover:bg-red-700 text-white font-mono text-xs font-bold transition-all"
            >
              Go to Dashboard →
            </Link>
          </div>
        </div>
      </header>

      {/* Main 404 Content */}
      <main className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-950/60 border border-red-800/80 text-[#ff6b6b] font-mono text-2xl font-bold mb-6">
          404
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-['Almarai'] text-white mb-3">
          Investigation Target Not Found
        </h1>
        <p className="text-sm text-gray-400 font-mono leading-relaxed mb-8">
          The requested route or module does not exist in this deployment. Please return to the operations dashboard or explore the landing page.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#cd0001] hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-red-950/50"
          >
            Launch Recon in Dashboard →
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
          >
            Return to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs font-mono text-gray-500">
        © 2025 OPENFISH™ ALL RIGHTS RESERVED · AUTONOMOUS CYBER DEFENSE
      </footer>
    </div>
  );
}
