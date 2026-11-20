// Pointy-top hexagon path centred on (cx, cy) with circumradius r.
function hex(cx: number, cy: number, r: number): string {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  });
  return `M${pts.join('L')}Z`;
}

const R = 54;
const D = 100.5; // centre-to-centre distance of neighbouring cells

// Inner ring, clockwise from the right.
const RING: Array<[number, number]> = [0, 60, 120, 180, 240, 300].map((deg) => [
  300 + D * Math.cos((Math.PI / 180) * deg),
  300 + D * Math.sin((Math.PI / 180) * deg),
]);

// Faint outer cells that make the cluster read as a bigger honeycomb.
const OUTER: Array<[number, number]> = [30, 90, 150, 210, 270, 330].map((deg) => [
  300 + D * Math.sqrt(3) * Math.cos((Math.PI / 180) * deg),
  300 + D * Math.sqrt(3) * Math.sin((Math.PI / 180) * deg),
]);

export function ArtHive() {
  const [cal, list, note, link, userA, userB] = RING;

  return (
    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" fontFamily="ui-sans-serif,system-ui,'Segoe UI',Roboto,sans-serif">
      <defs>
        <linearGradient id="hv-bg" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#120c07" />
          <stop offset="1" stopColor="#080604" />
        </linearGradient>
        <radialGradient id="hv-glow" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0" stopColor="#3a2410" stopOpacity="0.85" />
          <stop offset="1" stopColor="#0c0805" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hv-cell" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#2a1e12" />
          <stop offset="1" stopColor="#17100a" />
        </linearGradient>
        <linearGradient id="hv-honey" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb64d" />
          <stop offset="1" stopColor="#ef7d17" />
        </linearGradient>
        <filter id="hv-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <rect width="600" height="600" fill="url(#hv-bg)" />
      <rect width="600" height="600" fill="url(#hv-glow)" />

      {/* outer, faint cells */}
      <g fill="none" stroke="#e79a3b" strokeOpacity="0.12" strokeWidth="1.5">
        {OUTER.map(([x, y]) => (
          <path key={`${x}-${y}`} d={hex(x, y, R)} />
        ))}
      </g>

      {/* halo behind the centre cell */}
      <path d={hex(300, 300, R + 6)} fill="#f0851f" opacity="0.35" filter="url(#hv-soft)" />

      {/* inner ring cells */}
      <g fill="url(#hv-cell)" stroke="#e9a94e" strokeOpacity="0.32" strokeWidth="1.5">
        {RING.map(([x, y]) => (
          <path key={`${x}-${y}`} d={hex(x, y, R)} />
        ))}
      </g>

      {/* centre cell: the password-protected room */}
      <path d={hex(300, 300, R)} fill="url(#hv-honey)" />
      <path d={hex(300, 300, R - 7)} fill="none" stroke="#1c130a" strokeOpacity="0.35" strokeWidth="1.5" />
      <g transform="translate(300,302)" fill="none" stroke="#1c130a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-11 -6 V-14 a11 11 0 0 1 22 0 V-6" />
        <rect x="-18" y="-6" width="36" height="28" rx="6" fill="#1c130a" stroke="none" />
        <circle cx="0" cy="7" r="3.6" fill="#ffb64d" stroke="none" />
      </g>

      {/* calendar */}
      <g transform={`translate(${cal[0]},${cal[1]})`} fill="none" stroke="#f0b25a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="-19" y="-17" width="38" height="36" rx="6" />
        <path d="M-19 -5 H19 M-9 -23 V-13 M9 -23 V-13" />
        <g fill="#f0851f" stroke="none">
          <circle cx="-9" cy="4" r="2.6" />
          <circle cx="0" cy="4" r="2.6" />
          <circle cx="9" cy="4" r="2.6" />
          <circle cx="-9" cy="12" r="2.6" />
          <circle cx="0" cy="12" r="2.6" />
        </g>
      </g>

      {/* checklist */}
      <g transform={`translate(${list[0]},${list[1]})`} fill="none" stroke="#f0b25a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-20 -14 l5 5 l9 -10" stroke="#f0851f" />
        <path d="M-20 6 l5 5 l9 -10" stroke="#f0851f" />
        <path d="M-1 -10 H20 M-1 10 H20" />
      </g>

      {/* note */}
      <g transform={`translate(${note[0]},${note[1]})`} fill="none" stroke="#f0b25a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-17 -21 H9 L19 -11 V21 H-17 Z" />
        <path d="M9 -21 V-11 H19" />
        <path d="M-9 -2 H11 M-9 8 H11" />
      </g>

      {/* bookmark / link */}
      <g transform={`translate(${link[0]},${link[1]})`} fill="none" stroke="#f0b25a" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-4 5 a9 9 0 0 1 0 -13 l7 -7 a9 9 0 0 1 13 13 l-4 4" />
        <path d="M4 -5 a9 9 0 0 1 0 13 l-7 7 a9 9 0 0 1 -13 -13 l4 -4" />
      </g>

      {/* people in the room */}
      {[userA, userB].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`} fill="#f0851f" fillOpacity={i === 0 ? 0.9 : 0.55}>
          <circle cx="0" cy="-8" r="8" />
          <path d="M-15 17 a15 13 0 0 1 30 0 Z" />
        </g>
      ))}
    </svg>
  );
}
