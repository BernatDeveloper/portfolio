export function ArtReactTs() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="react-ts-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-lava)" />
          <stop offset="100%" stopColor="var(--color-gold)" />
        </linearGradient>
      </defs>

      {/* React — scaled up to fill most of the tile */}
      <g
        transform="translate(2,2) scale(1.25)"
        fill="none"
        stroke="url(#react-ts-gradient)"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 11.3c4.14 0 7.5-1.28 7.5-2.86S12.14 5.58 8 5.58S.5 6.86.5 8.44s3.36 2.87 7.5 2.87Z" />
        <path d="M5.52 9.87c2.07 3.6 4.86 5.86 6.23 5.07c1.37-.8.8-4.34-1.27-7.93S5.62 1.16 4.25 1.95s-.8 4.34 1.27 7.92" />
        <path d="M5.52 7.01c-2.07 3.59-2.64 7.14-1.27 7.93s4.16-1.48 6.23-5.07c2.07-3.58 2.64-7.13 1.27-7.92c-1.37-.8-4.16 1.47-6.23 5.06" />
        <path d="M8.5 8.44a.5.5 0 0 1-.5.5a.5.5 0 0 1-.5-.5a.5.5 0 0 1 .5-.5a.5.5 0 0 1 .5.5" />
      </g>

      {/* TypeScript badge — small, bottom-right, cut into the React mark */}
      <circle cx="18.3" cy="18.3" r="5.6" fill="var(--color-bg-secondary)" />
      <g
        transform="translate(14.3,14.3) scale(0.5)"
        fill="none"
        stroke="url(#react-ts-gradient)"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 1.5h8A2.5 2.5 0 0 1 14.5 4v8a2.5 2.5 0 0 1-2.5 2.5H4A2.5 2.5 0 0 1 1.5 12V4A2.5 2.5 0 0 1 4 1.5" />
        <path d="M12.5 8.75c0-.69-.54-1.25-1.2-1.25h-.6c-.66 0-1.2.56-1.2 1.25S10.04 10 10.7 10h.6c.66 0 1.2.56 1.2 1.25s-.54 1.25-1.2 1.25h-.6c-.66 0-1.2-.56-1.2-1.25m-3-3.75v5M5 7.5h3" />
      </g>
    </svg>
  );
}
