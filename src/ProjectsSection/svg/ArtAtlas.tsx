export function ArtAtlas() {
  return (
    <svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="500" height="240" fill="#080503" />
      <rect className="sl" x="20"  y="120" width="28" height="100" fill="rgba(232,93,4,.22)" />
      <rect className="sl" x="60"  y="95"  width="28" height="125" fill="rgba(244,140,6,.28)" style={{ animationDelay: ".2s" }} />
      <rect className="sl" x="100" y="72"  width="28" height="148" fill="rgba(232,93,4,.38)"  style={{ animationDelay: ".4s" }} />
      <rect className="sl" x="140" y="100" width="28" height="120" fill="rgba(244,140,6,.24)" style={{ animationDelay: ".6s" }} />
      <rect className="sl" x="180" y="58"  width="28" height="162" fill="rgba(255,201,64,.34)" style={{ animationDelay: ".8s" }} />
      <rect className="sl" x="220" y="84"  width="28" height="136" fill="rgba(232,93,4,.3)"   style={{ animationDelay: ".3s" }} />
      <rect className="sl" x="260" y="108" width="28" height="112" fill="rgba(244,140,6,.22)" style={{ animationDelay: ".7s" }} />
      <rect className="sl" x="300" y="68"  width="28" height="152" fill="rgba(232,93,4,.28)"  style={{ animationDelay: ".5s" }} />
      <rect className="sl" x="340" y="90"  width="28" height="130" fill="rgba(244,140,6,.25)" style={{ animationDelay: ".9s" }} />
      <rect className="sl" x="380" y="76"  width="28" height="144" fill="rgba(232,93,4,.22)"  style={{ animationDelay: ".1s" }} />
      <rect className="sl" x="420" y="104" width="28" height="116" fill="rgba(244,140,6,.2)"  style={{ animationDelay: ".6s" }} />
      <line className="sl" x1="10" y1="220" x2="490" y2="220" stroke="rgba(232,93,4,.22)" strokeWidth="1.5" />
      <circle className="sc" cx="60"  cy="38" r="5" fill="rgba(255,201,64,.6)" />
      <circle className="sc" cx="180" cy="28" r="4" fill="rgba(232,93,4,.7)"   style={{ animationDelay: ".3s" }} />
      <circle className="sc" cx="300" cy="32" r="6" fill="rgba(244,140,6,.6)"  style={{ animationDelay: ".6s" }} />
      <circle className="sc" cx="420" cy="26" r="4" fill="rgba(255,201,64,.5)" style={{ animationDelay: ".9s" }} />
      <line className="sl" x1="60"  y1="38" x2="180" y2="28" stroke="rgba(232,93,4,.18)" strokeWidth="1" />
      <line className="sl" x1="180" y1="28" x2="300" y2="32" stroke="rgba(244,140,6,.15)" strokeWidth="1" style={{ animationDelay: ".3s" }} />
      <line className="sl" x1="300" y1="32" x2="420" y2="26" stroke="rgba(232,93,4,.15)" strokeWidth="1" style={{ animationDelay: ".6s" }} />
    </svg>
  );
}
