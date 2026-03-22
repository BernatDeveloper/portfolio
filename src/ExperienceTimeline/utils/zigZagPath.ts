export function buildZigzagPath(stops: { x: number; y: number }[]): string {
    if (stops.length < 2) return "";
    let d = `M ${stops[0].x} ${stops[0].y}`;
    for (let i = 1; i < stops.length; i++) {
        const prev = stops[i - 1];
        const curr = stops[i];
        const midY = (prev.y + curr.y) / 2;
        d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }
    return d;
}