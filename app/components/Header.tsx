import { PrismIcon, GitHubIcon } from "./icons";

interface HeaderProps {
  onUpgradeClick: () => void;
}

export function Header({ onUpgradeClick }: HeaderProps) {
  return (
    <header className="border-b border-white/[0.06] bg-[#07071a]/90 backdrop-blur-md sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 shadow-lg shadow-violet-500/20">
            <PrismIcon className="w-full h-full" />
          </div>
          <div>
            <h1 className="font-bold text-white text-base leading-none tracking-widest uppercase">
              Refract
            </h1>
            <p className="text-xs text-white/40 mt-0.5 tracking-wide">Powered by Claude Code</p>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Free plan pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-sm">
            <span className="text-white/45">Free plan</span>
            <span className="text-white/20">·</span>
            <button
              onClick={onUpgradeClick}
              className="text-violet-400 hover:text-violet-300 transition-colors font-semibold"
            >
              Upgrade
            </button>
          </div>

          {/* Mobile upgrade */}
          <button
            onClick={onUpgradeClick}
            className="sm:hidden text-xs px-2.5 py-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-400 font-semibold hover:bg-violet-600/30 transition-colors"
          >
            Upgrade
          </button>

          <a
            href="https://github.com/shireen-mvps"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-white/35 hover:text-white/75 transition-colors duration-200"
          >
            <GitHubIcon className="w-4 h-4" />
            <span className="hidden md:inline">shireen-mvps</span>
          </a>
        </div>
      </div>
    </header>
  );
}
