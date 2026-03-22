import React from "react";
import type { Experience } from "../types";
import CardContent from "../components/CardContent";
import Dot from "../components/Dot";

interface Props {
    exp: Experience;
    visible: boolean;
    nodeRef: React.RefObject<HTMLDivElement>;
}

export default function Card({ exp, visible, nodeRef }: Props) {
    const isLeft = exp.side === "left";

    return (
        <div
            ref={nodeRef}
            className={`timeline-card ${visible ? "timeline-card--visible" : ""} timeline-card--${exp.side}`}
            data-side={exp.side}
        >
            {isLeft ? (
                <>
                    <CardContent exp={exp} align="right" />
                    <Dot />
                    <div className="timeline-card__spacer" />
                </>
            ) : (
                <>
                    <div className="timeline-card__spacer" />
                    <Dot />
                    <CardContent exp={exp} align="left" />
                </>
            )}
        </div>
    );
}