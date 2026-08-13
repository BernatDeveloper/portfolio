export function ArtForge() {
  return (
    <svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="500" height="240" fill="#080503" />
      <circle className="sc" cx="60"  cy="120" r="14" fill="rgba(232,93,4,.3)"  stroke="rgba(232,93,4,.55)"  strokeWidth="1.5" />
      <circle className="sc" cx="180" cy="120" r="14" fill="rgba(244,140,6,.24)" stroke="rgba(244,140,6,.5)"  strokeWidth="1.5" style={{ animationDelay: ".3s" }} />
      <circle className="sc" cx="300" cy="120" r="14" fill="rgba(255,201,64,.2)" stroke="rgba(255,201,64,.48)" strokeWidth="1.5" style={{ animationDelay: ".6s" }} />
      <circle className="sc" cx="420" cy="120" r="14" fill="rgba(232,93,4,.3)"  stroke="rgba(232,93,4,.55)"  strokeWidth="1.5" style={{ animationDelay: ".9s" }} />
      <line className="sl" x1="74"  y1="120" x2="166" y2="120" stroke="rgba(232,93,4,.32)" strokeWidth="2" strokeDasharray="4 4" />
      <line className="sl" x1="194" y1="120" x2="286" y2="120" stroke="rgba(244,140,6,.28)" strokeWidth="2" strokeDasharray="4 4" style={{ animationDelay: ".3s" }} />
      <line className="sl" x1="314" y1="120" x2="406" y2="120" stroke="rgba(255,201,64,.26)" strokeWidth="2" strokeDasharray="4 4" style={{ animationDelay: ".6s" }} />
      <path className="sl" d="M60,106 L60,60 L180,60 L180,106" fill="none" stroke="rgba(232,93,4,.16)" strokeWidth="1" style={{ animationDelay: ".2s" }} />
      <path className="sl" d="M300,106 L300,174 L420,174 L420,106" fill="none" stroke="rgba(244,140,6,.16)" strokeWidth="1" style={{ animationDelay: ".5s" }} />
      <rect className="sl" x="42"  y="182" width="36" height="10" fill="rgba(232,93,4,.14)"  style={{ animationDelay: ".4s" }} />
      <rect className="sl" x="162" y="182" width="36" height="10" fill="rgba(244,140,6,.12)" style={{ animationDelay: ".7s" }} />
      <rect className="sl" x="282" y="182" width="36" height="10" fill="rgba(255,201,64,.1)" style={{ animationDelay: "1s"  }} />
      <rect className="sl" x="402" y="182" width="36" height="10" fill="rgba(232,93,4,.14)"  style={{ animationDelay: "1.3s" }} />
    </svg>
  );
}
