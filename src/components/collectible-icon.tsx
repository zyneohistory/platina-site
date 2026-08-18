const PATHS: Record<string, string> = {
  // raven — swept wings in flight
  "odins-ravens":
    "M2 14.5c2.5-1 4.5-3.5 5.5-7.5 1.2 3 3 5 4.5 5.5 1.5-.5 3.3-2.5 4.5-5.5 1 4 3 6.5 5.5 7.5",
  // artifact — faceted gem
  artifacts: "M12 2 4 9l8 13 8-13-8-7Zm-5.2 7h10.4M9 9l3 11 3-11",
  // language cipher — rune tablet
  "language-ciphers": "M5 3h14v18H5V3Zm3 5h8M8 11h8M8 14h5",
  // jötnar shrine — stone arch
  "jotnar-shrines": "M5 21V10a7 7 0 0 1 14 0v11M5 21h14M9 21v-6M15 21v-6",
  // treasure map — X marks the spot
  "treasure-maps": "M4 4l7 3 7-3v16l-7 3-7-3V4Zm7 3v16M6 9l4 3-4 3M18 9l-4 3 4 3",
};

export function CollectibleIcon({
  typeSlug,
  color,
  filled,
  className,
}: {
  typeSlug: string;
  color: string;
  filled: boolean;
  className?: string;
}) {
  const d = PATHS[typeSlug] ?? PATHS.artifacts;
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d={d}
        stroke={color}
        strokeWidth={filled ? 2.4 : 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={filled ? 1 : 0.85}
      />
    </svg>
  );
}
