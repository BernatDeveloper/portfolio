export function ArtEmber() {
  return (
    <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="500" height="300" fill="#080503" />
      <path className="sl" d="M0,150 C70,100 140,200 250,150 C360,100 430,170 500,140" fill="none" stroke="rgba(232,93,4,.5)"  strokeWidth="2.5" />
      <path className="sl" d="M0,185 C70,135 140,235 250,185 C360,135 430,205 500,175" fill="none" stroke="rgba(244,140,6,.3)"  strokeWidth="2"   style={{ animationDelay: ".5s" }} />
      <path className="sl" d="M0,115 C70,65  140,165 250,115 C360,65  430,135 500,105" fill="none" stroke="rgba(255,201,64,.17)" strokeWidth="1.5" style={{ animationDelay: "1s" }} />
      <rect className="sl" x="30"  y="50" width="30" height="30" fill="rgba(232,93,4,.18)"  stroke="rgba(232,93,4,.42)"  strokeWidth="1.5" style={{ animationDelay: ".3s" }} />
      <rect className="sl" x="75"  y="38" width="20" height="20" fill="rgba(244,140,6,.14)" stroke="rgba(244,140,6,.35)" strokeWidth="1"   style={{ animationDelay: ".8s" }} />
      <rect className="sl" x="108" y="48" width="13" height="13" fill="rgba(255,201,64,.1)" stroke="rgba(255,201,64,.28)" strokeWidth="1"   style={{ animationDelay: "1.2s" }} />
      <circle className="sc" cx="420" cy="60" r="16" fill="none" stroke="rgba(232,93,4,.3)" strokeWidth="1.5" />
      <circle className="sc" cx="448" cy="44" r="10" fill="rgba(232,93,4,.1)"  style={{ animationDelay: ".5s" }} />
      <circle className="sc" cx="425" cy="48" r="5"  fill="rgba(232,93,4,.2)"  style={{ animationDelay: ".9s" }} />
    </svg>
  );
}
