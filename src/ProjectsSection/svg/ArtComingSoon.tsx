export function ArtComingSoon() {
  return (
    <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="500" height="300" fill="#080503" />

      {/* blueprint wireframe */}
      <rect className="sl" x="120" y="70" width="260" height="160" rx="6" fill="none" stroke="rgba(244,140,6,.35)" strokeWidth="1.5" strokeDasharray="6,5" />
      <line className="sl" x1="120" y1="120" x2="380" y2="120" stroke="rgba(232,93,4,.2)" strokeWidth="1" strokeDasharray="4,4" style={{ animationDelay: ".3s" }} />
      <line className="sl" x1="120" y1="180" x2="380" y2="180" stroke="rgba(232,93,4,.2)" strokeWidth="1" strokeDasharray="4,4" style={{ animationDelay: ".6s" }} />

      {/* pulsing loading dots */}
      <circle className="sc" cx="225" cy="150" r="7" fill="rgba(255,201,64,.55)" />
      <circle className="sc" cx="250" cy="150" r="7" fill="rgba(244,140,6,.4)" style={{ animationDelay: ".3s" }} />
      <circle className="sc" cx="275" cy="150" r="7" fill="rgba(232,93,4,.28)" style={{ animationDelay: ".6s" }} />
    </svg>
  );
}
