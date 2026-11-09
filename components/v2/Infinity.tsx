export function Infinity({ className = "", strokeWidth = 5.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        d="M18 32c0-8 6-14 14-14 5 0 9 2 12 6 3-4 7-6 12-6 8 0 14 6 14 14s-6 14-14 14c-5 0-9-2-12-6-3 4-7 6-12 6-8 0-14-6-14-14z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        transform="translate(-12 0)"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`}>
      <Infinity className="wordmark-mark" />
      <span>D8A</span>
    </span>
  );
}
