import { useMemo } from "react";

type ProgressCircleProps = {
  value: number;
  size?: number;
  strokeWidth?: number;
};

export function ProgressCircle({
  value,
  size = 20,
  strokeWidth = 2,
}: ProgressCircleProps) {
  const radius = 10; // r của <circle>
  const circumference = 2 * Math.PI * radius;
  // Tính stroke-dashoffset từ phần trăm
  const dashOffset = useMemo(() => {
    const clamped = Math.min(255, Math.max(0, value));
    return circumference - (clamped / 255) * circumference;
  }, [value, circumference]);

  return (
    <svg
      height="100%"
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      style={{ overflow: "visible" }}
    >
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        fill="none"
        stroke="#2F3336"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="50%"
        cy=" 50%"
        r={radius}
        fill="none"
        stroke="#1D9BF0"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        style={{ transition: "stroke-dashoffset 0.3s ease" }}
      />
    </svg>
  );
}
