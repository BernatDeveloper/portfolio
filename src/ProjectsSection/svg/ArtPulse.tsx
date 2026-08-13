export function ArtPulse() {
  return (
    <svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="500" height="240" fill="#080503" />
      <path
        className="sl"
        d="M0,140 L90,140 L115,80 L140,190 L165,50 L190,140 L500,140"
        fill="none"
        stroke="rgba(244,140,6,.5)"
        strokeWidth="2.5"
      />
      <path
        className="sl"
        d="M0,165 L90,165 L115,120 L140,200 L165,95 L190,165 L500,165"
        fill="none"
        stroke="rgba(232,93,4,.24)"
        strokeWidth="1.5"
        style={{ animationDelay: ".4s" }}
      />
      <circle className="sc" cx="140" cy="190" r="6" fill="rgba(255,201,64,.6)" />
      <circle className="sc" cx="165" cy="50"  r="5" fill="rgba(244,140,6,.55)" style={{ animationDelay: ".3s" }} />
      <rect className="sl" x="40"  y="205" width="18" height="18" fill="rgba(232,93,4,.16)" style={{ animationDelay: ".2s" }} />
      <rect className="sl" x="240" y="180" width="18" height="43" fill="rgba(244,140,6,.18)" style={{ animationDelay: ".5s" }} />
      <rect className="sl" x="290" y="160" width="18" height="63" fill="rgba(255,201,64,.14)" style={{ animationDelay: ".8s" }} />
      <rect className="sl" x="340" y="190" width="18" height="33" fill="rgba(232,93,4,.16)" style={{ animationDelay: "1.1s" }} />
      <rect className="sl" x="390" y="170" width="18" height="53" fill="rgba(244,140,6,.16)" style={{ animationDelay: "1.4s" }} />
      <rect className="sl" x="440" y="196" width="18" height="27" fill="rgba(255,201,64,.12)" style={{ animationDelay: "1.7s" }} />
    </svg>
  );
}
