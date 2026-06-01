export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const color = variant === "dark" ? "#111827" : "#ffffff";

  return (
    <svg
      viewBox="0 0 140 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="D8A.pro"
    >
      <text
        x="0"
        y="24"
        fill={color}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="24"
        fontWeight="600"
        letterSpacing="-0.02em"
      >
        D8A
      </text>
      <text
        x="58"
        y="24"
        fill={color}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="24"
        fontWeight="400"
        letterSpacing="-0.02em"
      >
        .pro
      </text>
    </svg>
  );
}
