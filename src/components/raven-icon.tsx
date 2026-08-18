export function RavenIcon({
  color,
  filled,
  className,
}: {
  color: string;
  filled: boolean;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M2 14.5c2.5-1 4.5-3.5 5.5-7.5 1.2 3 3 5 4.5 5.5 1.5-.5 3.3-2.5 4.5-5.5 1 4 3 6.5 5.5 7.5"
        stroke={color}
        strokeWidth={filled ? 2.6 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={filled ? 1 : 0.85}
      />
      <circle cx="12" cy="12.5" r="1.6" fill={color} opacity={filled ? 1 : 0.85} />
    </svg>
  );
}
