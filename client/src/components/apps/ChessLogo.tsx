export function ChessLogo() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="greenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ff88" />
            <stop offset="100%" stopColor="#00cc66" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background rounded square */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="8"
          fill="#0a0a0a"
          stroke="url(#greenGlow)"
          strokeWidth="2"
        />

        {/* Minimalist 3x3 chess board pattern */}
        <g opacity="0.15">
          <rect x="10" y="10" width="8" height="8" fill="#00ff88" />
          <rect x="26" y="10" width="8" height="8" fill="#00ff88" />
          <rect x="18" y="18" width="8" height="8" fill="#00ff88" />
          <rect x="10" y="26" width="8" height="8" fill="#00ff88" />
          <rect x="26" y="26" width="8" height="8" fill="#00ff88" />
        </g>

        {/* Stylized King piece - minimalist design */}
        <g filter="url(#glow)">
          {/* Base */}
          <path
            d="M 18 36 L 20 28 L 28 28 L 30 36 Z"
            fill="none"
            stroke="url(#greenGlow)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Body */}
          <path
            d="M 21 28 L 22 20 L 26 20 L 27 28"
            fill="none"
            stroke="url(#greenGlow)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Crown */}
          <path
            d="M 20 20 L 20 15 L 22 17 L 24 13 L 26 17 L 28 15 L 28 20"
            fill="none"
            stroke="url(#greenGlow)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cross accent */}
          <line x1="24" y1="10" x2="24" y2="14" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="12" x2="26" y2="12" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Corner accents */}
        <line x1="6" y1="10" x2="6" y2="6" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="6" y1="6" x2="10" y2="6" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

        <line x1="42" y1="10" x2="42" y2="6" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="42" y1="6" x2="38" y2="6" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  );
}
