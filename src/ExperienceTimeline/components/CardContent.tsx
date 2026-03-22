import type { Experience } from "../types"

interface Props {
    exp: Experience;
    align: "left" | "right";
}

export default function CardContent({ exp, align }: Props) {
    return (
        <div className={`card-content card-content--${align}`}>
            <div className="card-year">{exp.year}</div>
            <div className="card-company">{exp.company}</div>
            <div className="card-role">{exp.role}</div>
            <p className="card-desc">{exp.desc}</p>
        </div>
    );
}