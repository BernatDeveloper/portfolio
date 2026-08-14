export function ArtGymTracker() {
  return (
    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" fontFamily="ui-sans-serif,system-ui,'Segoe UI',Roboto,sans-serif">
      <defs>
        <style>{`.gt-mono{font-family:ui-monospace,'SF Mono',Menlo,Consolas,monospace;}`}</style>
        <linearGradient id="gt-bg" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#120c07" />
          <stop offset="0.6" stopColor="#0c0805" />
          <stop offset="1" stopColor="#080604" />
        </linearGradient>
        <radialGradient id="gt-glow" cx="0.5" cy="0.36" r="0.62">
          <stop offset="0" stopColor="#33200c" stopOpacity="0.75" />
          <stop offset="1" stopColor="#0c0805" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gt-panel" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0" stopColor="#20180f" />
          <stop offset="1" stopColor="#150f09" />
        </linearGradient>
        <linearGradient id="gt-amberV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb64d" />
          <stop offset="1" stopColor="#ef7d17" />
        </linearGradient>
        <linearGradient id="gt-amberH" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b07a34" />
          <stop offset="0.5" stopColor="#f0b25a" />
          <stop offset="1" stopColor="#b07a34" />
        </linearGradient>
        <linearGradient id="gt-spark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f0851f" />
          <stop offset="1" stopColor="#ffbf5e" />
        </linearGradient>
        <filter id="gt-soft" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="gt-pshadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* background */}
      <rect x="0" y="0" width="600" height="600" fill="url(#gt-bg)" />
      <rect x="0" y="0" width="600" height="600" fill="url(#gt-glow)" />
      <polyline points="40,520 130,500 200,510 280,474 360,486 440,442 520,456 570,430"
        fill="none" stroke="#e79a3b" strokeOpacity="0.08" strokeWidth="2" />

      {/* ===== APP PANEL (dark) ===== */}
      <g transform="translate(-6,126)">
        <rect x="126" y="30" width="360" height="190" rx="24" fill="#e08a2a" opacity="0.06" filter="url(#gt-soft)" />
        <rect x="106" y="16" width="400" height="206" rx="18" fill="url(#gt-panel)" filter="url(#gt-pshadow)" />
        <rect x="106.5" y="16.5" width="399" height="205" rx="17.5" fill="none" stroke="#e9a94e" strokeOpacity="0.18" />
        <path d="M120 17 H492" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
        <g transform="translate(128,44)">
          <g fill="#f0851f">
            <rect x="0" y="-4" width="4" height="10" rx="1.5" />
            <rect x="5" y="-6" width="3" height="14" rx="1.5" />
            <rect x="8" y="-1.5" width="16" height="5" rx="2.5" />
            <rect x="24" y="-6" width="3" height="14" rx="1.5" />
            <rect x="28" y="-4" width="4" height="10" rx="1.5" />
          </g>
          <text x="44" y="4" fontSize="13" fontWeight="700" letterSpacing="1.5" fill="#f3ecdd">PUSH DAY</text>
          <text x="350" y="4" textAnchor="end" fontSize="11" fill="#8f8474">Week 6 · today</text>
        </g>
        <line x1="128" y1="60" x2="484" y2="60" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
        <g fontSize="13">
          <circle cx="136" cy="90" r="6.5" fill="#f0851f" />
          <path d="M133 90 l2 2 l4.4 -4.8" fill="none" stroke="#1c130a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <text x="154" y="94" fontWeight="600" fill="#efe7d7">Bench press</text>
          <text x="326" y="94" className="gt-mono" fontSize="12" fill="#8a7c6c">4×8</text>
          <text x="402" y="94" textAnchor="end" fontWeight="700" fill="#f5972f">82.5</text>
          <text x="406" y="94" fontSize="10" fill="#9a8d7c">kg</text>
          <rect x="430" y="83" width="26" height="15" rx="7.5" fill="#f0851f" fillOpacity="0.16" />
          <text x="443" y="94" textAnchor="middle" className="gt-mono" fontSize="9" letterSpacing="0.5" fill="#f6b25a">PR</text>

          <circle cx="136" cy="126" r="6.5" fill="#f0851f" />
          <path d="M133 126 l2 2 l4.4 -4.8" fill="none" stroke="#1c130a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <text x="154" y="130" fontWeight="600" fill="#efe7d7">Overhead press</text>
          <text x="326" y="130" className="gt-mono" fontSize="12" fill="#8a7c6c">4×10</text>
          <text x="402" y="130" textAnchor="end" fontWeight="700" fill="#e9dfce">42.5</text>
          <text x="406" y="130" fontSize="10" fill="#9a8d7c">kg</text>

          <circle cx="136" cy="162" r="6.5" fill="none" stroke="#5e5445" strokeWidth="1.6" />
          <text x="154" y="166" fontWeight="600" fill="#8a7e6e">Lateral raise</text>
          <text x="326" y="166" className="gt-mono" fontSize="12" fill="#6f6455">3×12</text>
          <text x="402" y="166" textAnchor="end" fontWeight="700" fill="#9a8d7c">12</text>
          <text x="406" y="166" fontSize="10" fill="#7d7160">kg</text>
        </g>
        <line x1="128" y1="186" x2="484" y2="186" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
        <g transform="translate(128,200)">
          <text x="0" y="12" className="gt-mono" fontSize="10" letterSpacing="1" fill="#8a7e6e">WEEKLY VOLUME</text>
          <polyline points="196,16 214,12 232,14 250,7 268,10 286,2" fill="none" stroke="url(#gt-spark)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="286" cy="2" r="2.6" fill="#f0851f" />
          <text x="356" y="12" textAnchor="end" fontSize="12" fontWeight="700" fill="#f5972f">+18%</text>
        </g>
      </g>

      {/* ===== DUMBBELL (compact, centered under panel) ===== */}
      <g transform="translate(300,382)">
        <rect x="-72" y="-18" width="144" height="36" rx="18" fill="#f0851f" opacity="0.10" filter="url(#gt-soft)" />
        <rect x="-42" y="-3.5" width="84" height="7" rx="3.5" fill="url(#gt-amberH)" />
        <g fill="url(#gt-amberV)">
          <rect x="-50" y="-20" width="8" height="40" rx="4" />
          <rect x="-60" y="-15" width="8" height="30" rx="4" />
          <rect x="-68" y="-10" width="6" height="20" rx="3" />
        </g>
        <g fill="url(#gt-amberV)">
          <rect x="42" y="-20" width="8" height="40" rx="4" />
          <rect x="52" y="-15" width="8" height="30" rx="4" />
          <rect x="62" y="-10" width="6" height="20" rx="3" />
        </g>
      </g>

      {/* streak dots */}
      <g transform="translate(300,417)">
        <g fill="#f0851f">
          <circle cx="-75" cy="0" r="5.5" />
          <circle cx="-50" cy="0" r="5.5" />
          <circle cx="-25" cy="0" r="5.5" />
          <circle cx="0" cy="0" r="5.5" />
          <circle cx="25" cy="0" r="5.5" />
        </g>
        <g fill="none" stroke="#6a4a2a" strokeWidth="1.6">
          <circle cx="50" cy="0" r="5.5" />
          <circle cx="75" cy="0" r="5.5" />
        </g>
      </g>

      {/* stat chips */}
      <g transform="translate(300,452)" textAnchor="middle" className="gt-mono" fontSize="10.5" letterSpacing="1.5" fill="#b98a56">
        <text x="-150" y="0">12 WEEKS</text>
        <circle cx="-80" cy="-3" r="1.6" fill="#7a4127" />
        <text x="0" y="0">84 WORKOUTS</text>
        <circle cx="80" cy="-3" r="1.6" fill="#7a4127" />
        <text x="150" y="0" fill="#e2903e">OFFLINE</text>
      </g>
    </svg>
  );
}
