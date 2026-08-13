export function ArtGymTracker() {
  return (
    <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="500" height="300" fill="#080503" />

      {/* barbell */}
      <line className="sl" x1="120" y1="150" x2="380" y2="150" stroke="rgba(244,140,6,.55)" strokeWidth="6" strokeLinecap="round" />
      <rect className="sl" x="95"  y="110" width="16" height="80" rx="4" fill="rgba(232,93,4,.5)" />
      <rect className="sl" x="75"  y="125" width="14" height="50" rx="4" fill="rgba(244,140,6,.4)" style={{ animationDelay: ".3s" }} />
      <rect className="sl" x="389" y="110" width="16" height="80" rx="4" fill="rgba(232,93,4,.5)" />
      <rect className="sl" x="411" y="125" width="14" height="50" rx="4" fill="rgba(244,140,6,.4)" style={{ animationDelay: ".3s" }} />
      <line x1="200" y1="140" x2="200" y2="160" stroke="rgba(255,201,64,.3)" strokeWidth="2" />
      <line x1="215" y1="140" x2="215" y2="160" stroke="rgba(255,201,64,.3)" strokeWidth="2" />
      <line x1="285" y1="140" x2="285" y2="160" stroke="rgba(255,201,64,.3)" strokeWidth="2" />
      <line x1="300" y1="140" x2="300" y2="160" stroke="rgba(255,201,64,.3)" strokeWidth="2" />

      {/* weekly streak dots */}
      <circle className="sc" cx="200" cy="230" r="6" fill="rgba(255,201,64,.6)" />
      <circle className="sc" cx="225" cy="230" r="6" fill="rgba(255,201,64,.6)" style={{ animationDelay: ".2s" }} />
      <circle className="sc" cx="250" cy="230" r="6" fill="rgba(232,93,4,.25)" style={{ animationDelay: ".4s" }} />
      <circle cx="275" cy="230" r="6" fill="none" stroke="rgba(232,93,4,.25)" strokeWidth="1.5" />
      <circle cx="300" cy="230" r="6" fill="none" stroke="rgba(232,93,4,.25)" strokeWidth="1.5" />

      {/* PR progress trend */}
      <path className="sl" d="M60,260 L140,260 L180,230 L230,245 L280,190 L340,205 L440,150" fill="none" stroke="rgba(255,201,64,.28)" strokeWidth="1.5" style={{ animationDelay: ".6s" }} />
    </svg>
  );
}
