export function ArtVoid() {
  return (
    <svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="500" height="240" fill="#080503" />
      <circle className="sc" cx="250" cy="120" r="200" fill="none" stroke="rgba(232,93,4,.04)" strokeWidth="1" />
      <circle className="sc" cx="250" cy="120" r="155" fill="none" stroke="rgba(232,93,4,.06)" strokeWidth="1"   style={{ animationDelay: ".3s" }} />
      <circle className="sc" cx="250" cy="120" r="110" fill="none" stroke="rgba(232,93,4,.1)"  strokeWidth="1"   style={{ animationDelay: ".6s" }} />
      <circle className="sc" cx="250" cy="120" r="72"  fill="none" stroke="rgba(232,93,4,.16)" strokeWidth="1.5" style={{ animationDelay: ".9s" }} />
      <circle className="sc" cx="250" cy="120" r="40"  fill="none" stroke="rgba(244,140,6,.26)" strokeWidth="2"  style={{ animationDelay: ".4s" }} />
      <circle className="sc" cx="250" cy="120" r="16"  fill="none" stroke="rgba(244,140,6,.45)" strokeWidth="2.5" style={{ animationDelay: ".2s" }} />
      <circle className="sc" cx="250" cy="120" r="7"   fill="rgba(232,93,4,.75)" style={{ animationDelay: ".8s" }} />
      <line className="sl" x1="10"  y1="120" x2="130" y2="120" stroke="rgba(232,93,4,.14)" strokeWidth="1" strokeDasharray="5 4" />
      <line className="sl" x1="370" y1="120" x2="490" y2="120" stroke="rgba(232,93,4,.14)" strokeWidth="1" strokeDasharray="5 4" style={{ animationDelay: ".5s" }} />
      <line className="sl" x1="250" y1="10"  x2="250" y2="68"  stroke="rgba(232,93,4,.14)" strokeWidth="1" strokeDasharray="5 4" style={{ animationDelay: ".8s" }} />
      <line className="sl" x1="250" y1="172" x2="250" y2="230" stroke="rgba(232,93,4,.14)" strokeWidth="1" strokeDasharray="5 4" style={{ animationDelay: ".3s" }} />
    </svg>
  );
}
