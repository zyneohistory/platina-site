export function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" />
    </svg>
  );
}

export function ControllerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9h12a4 4 0 0 1 4 4v3a3 3 0 0 1-5.5 1.7L15 16H9l-1.5 1.7A3 3 0 0 1 2 16v-3a4 4 0 0 1 4-4Z" />
      <path d="M7 11.5v3M5.5 13h3" />
      <circle cx="16.2" cy="12.3" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="18.2" cy="14.3" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BarChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V11M10 20V4M16 20v-6" />
    </svg>
  );
}
