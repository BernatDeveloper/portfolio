export const SkullKingSVG = () => (
    <svg
        viewBox="0 0 400 180"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ display: "block", width: "100%", height: "100%" }}
    >
        <defs>
            <radialGradient id="g-phantom" cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor="#ff6520" stopOpacity=".18" />
                <stop offset="100%" stopColor="#080604" stopOpacity="0" />
            </radialGradient>
            <filter id="bl-phantom"><feGaussianBlur stdDeviation="4" /></filter>
        </defs>
        <rect width="400" height="180" fill="#080604" />
        <rect width="400" height="180" fill="url(#g-phantom)" />
        <ellipse cx="200" cy="90" rx="90" ry="60" fill="#ff5500" opacity=".07" filter="url(#bl-phantom)" />
        <g className="proj-line" fill="none" strokeWidth=".85" opacity=".8">
            {([44, 90, 136] as number[]).flatMap((iy) =>
                ([34, 70, 106, 142] as number[]).map((hy) => (
                    <line key={`i${iy}h${hy}`} x1="50" y1={iy} x2="140" y2={hy} />
                ))
            )}
            {([34, 70, 106, 142] as number[]).flatMap((h1y) =>
                ([34, 70, 106, 142] as number[]).map((h2y) => (
                    <line key={`h${h1y}${h2y}`} x1="140" y1={h1y} x2="230" y2={h2y} />
                ))
            )}
            {([34, 70, 106, 142] as number[]).flatMap((h2y) =>
                ([60, 120] as number[]).map((oy) => (
                    <line key={`o${h2y}${oy}`} x1="230" y1={h2y} x2="320" y2={oy} />
                ))
            )}
            <line x1="320" y1="60" x2="376" y2="60" />
            <line x1="320" y1="120" x2="376" y2="120" />
        </g>
        {([44, 90, 136] as number[]).map((y) => (
            <circle key={`in${y}`} className="proj-node" cx="50" cy={y} r="9" />
        ))}
        {([34, 70, 106, 142] as number[]).map((y) => (
            <circle key={`h1${y}`} className="proj-node" cx="140" cy={y} r="10" />
        ))}
        {([34, 70, 106, 142] as number[]).map((y) => (
            <circle key={`h2${y}`} className="proj-node" cx="230" cy={y} r="10" />
        ))}
        <circle cx="320" cy="60" r="14" fill="rgba(255,101,32,.22)" stroke="rgba(255,160,50,.8)" strokeWidth="1.6" />
        <circle cx="320" cy="120" r="14" fill="rgba(255,101,32,.22)" stroke="rgba(255,160,50,.8)" strokeWidth="1.6" />
        <circle className="proj-pulse" cx="320" cy="60" r="5" />
        <circle cx="376" cy="60" r="8" fill="rgba(255,80,10,.28)" stroke="rgba(255,140,40,.6)" strokeWidth="1.1" />
        <circle cx="376" cy="120" r="8" fill="rgba(255,80,10,.28)" stroke="rgba(255,140,40,.6)" strokeWidth="1.1" />
        <g fill="rgba(255,160,60,.4)" fontSize="7" textAnchor="middle" fontFamily="Rajdhani,sans-serif" letterSpacing=".1em">
            <text x="50" y="168">INPUT</text>
            <text x="140" y="168">H1</text>
            <text x="230" y="168">H2</text>
            <text x="320" y="168">OUT</text>
        </g>
    </svg>
);