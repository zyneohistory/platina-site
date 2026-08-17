export function TrophyIcon({
  color,
  filled,
  className,
}: {
  color: string;
  filled: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? color : "none"}
      stroke={filled ? "none" : color}
      strokeWidth={filled ? 0 : 1.4}
    >
      <path d="M7 3h10v2h2.5a1 1 0 0 1 1 1v1.2a4.3 4.3 0 0 1-4.3 4.3h-.24A6 6 0 0 1 13 15.86V18h1.5a1 1 0 0 1 1 1v1H8.5v-1a1 1 0 0 1 1-1H11v-2.14A6 6 0 0 1 8.04 11.5H7.8A4.3 4.3 0 0 1 3.5 7.2V6a1 1 0 0 1 1-1H7V3Zm0 4H5.5v.2A2.3 2.3 0 0 0 7 9.31V7Zm10 0v2.31a2.3 2.3 0 0 0 1.5-2.11V7H17Z" />
    </svg>
  );
}
