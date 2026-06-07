export function ArtCipher() {
  return (
    <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="500" height="300" fill="#080503" />
      <polygon className="sl" points="250,40 340,90 340,190 250,240 160,190 160,90" fill="none" stroke="rgba(232,93,4,.32)" strokeWidth="2" />
      <polygon className="sl" points="250,75 318,115 318,183 250,223 182,183 182,115" fill="none" stroke="rgba(244,140,6,.22)" strokeWidth="1.5" style={{ animationDelay: ".5s" }} />
      <polygon className="sl" points="250,110 300,140 300,167 250,197 200,167 200,140" fill="rgba(232,93,4,.07)" stroke="rgba(232,93,4,.42)" strokeWidth="1.5" style={{ animationDelay: "1s" }} />
      <circle className="sc" cx="250" cy="153" r="14" fill="rgba(255,201,64,.3)" />
      <circle className="sc" cx="250" cy="153" r="6"  fill="rgba(232,93,4,.7)" style={{ animationDelay: ".4s" }} />
      <line className="sl" x1="250" y1="10"  x2="250" y2="40"  stroke="rgba(232,93,4,.28)" strokeWidth="1.5" />
      <line className="sl" x1="360" y1="65"  x2="340" y2="90"  stroke="rgba(232,93,4,.28)" strokeWidth="1.5" style={{ animationDelay: ".3s" }} />
      <line className="sl" x1="360" y1="215" x2="340" y2="190" stroke="rgba(232,93,4,.28)" strokeWidth="1.5" style={{ animationDelay: ".6s" }} />
      <line className="sl" x1="250" y1="270" x2="250" y2="240" stroke="rgba(232,93,4,.28)" strokeWidth="1.5" style={{ animationDelay: ".9s" }} />
      <line className="sl" x1="140" y1="215" x2="160" y2="190" stroke="rgba(232,93,4,.28)" strokeWidth="1.5" style={{ animationDelay: ".2s" }} />
      <line className="sl" x1="140" y1="65"  x2="160" y2="90"  stroke="rgba(232,93,4,.28)" strokeWidth="1.5" style={{ animationDelay: ".7s" }} />
    </svg>
  );
}
