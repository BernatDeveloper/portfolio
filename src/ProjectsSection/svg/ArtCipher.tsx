export function ArtCipher() {
  return (
    <svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="500" height="240" fill="#080503" />
      <path
        className="sl"
        d="M250,40 L370,90 L370,150 C370,195 315,220 250,235 C185,220 130,195 130,150 L130,90 Z"
        fill="none"
        stroke="rgba(232,93,4,.32)"
        strokeWidth="2"
      />
      <circle className="sc" cx="250" cy="128" r="26" fill="none" stroke="rgba(244,140,6,.4)" strokeWidth="1.5" style={{ animationDelay: ".3s" }} />
      <rect className="sc" x="238" y="122" width="24" height="20" rx="3" fill="rgba(255,201,64,.28)" style={{ animationDelay: ".6s" }} />
      <line className="sl" x1="250" y1="108" x2="250" y2="122" stroke="rgba(244,140,6,.4)" strokeWidth="3" style={{ animationDelay: ".6s" }} />
      <circle className="sc" cx="70"  cy="70"  r="4" fill="rgba(232,93,4,.5)"  style={{ animationDelay: ".2s" }} />
      <circle className="sc" cx="90"  cy="130" r="3" fill="rgba(244,140,6,.4)" style={{ animationDelay: ".5s" }} />
      <circle className="sc" cx="60"  cy="185" r="4" fill="rgba(255,201,64,.4)" style={{ animationDelay: ".8s" }} />
      <circle className="sc" cx="430" cy="70"  r="4" fill="rgba(232,93,4,.5)"  style={{ animationDelay: ".35s" }} />
      <circle className="sc" cx="412" cy="130" r="3" fill="rgba(244,140,6,.4)" style={{ animationDelay: ".65s" }} />
      <circle className="sc" cx="440" cy="185" r="4" fill="rgba(255,201,64,.4)" style={{ animationDelay: ".95s" }} />
      <line className="sl" x1="70"  y1="70"  x2="130" y2="95"  stroke="rgba(232,93,4,.14)" strokeWidth="1" strokeDasharray="3 4" />
      <line className="sl" x1="90"  y1="130" x2="130" y2="130" stroke="rgba(244,140,6,.14)" strokeWidth="1" strokeDasharray="3 4" style={{ animationDelay: ".3s" }} />
      <line className="sl" x1="430" y1="70"  x2="370" y2="95"  stroke="rgba(232,93,4,.14)" strokeWidth="1" strokeDasharray="3 4" style={{ animationDelay: ".4s" }} />
      <line className="sl" x1="412" y1="130" x2="370" y2="130" stroke="rgba(244,140,6,.14)" strokeWidth="1" strokeDasharray="3 4" style={{ animationDelay: ".7s" }} />
    </svg>
  );
}
