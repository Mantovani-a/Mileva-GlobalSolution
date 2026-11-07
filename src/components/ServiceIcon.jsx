export default function ServiceIcon({ name, className = '' }) {
  const drawings = {
    bus: (
      <>
        <rect x="4" y="3" width="16" height="16" rx="3" />
        <path d="M4 12h16M7 19v2m10-2v2M8 7h.01M16 7h.01" />
      </>
    ),
    car: (
      <>
        <path d="M5 11 7 5h10l2 6M4 11h16v7H4zM6 18v2m12-2v2" />
        <circle cx="8" cy="15" r="1" />
        <circle cx="16" cy="15" r="1" />
      </>
    ),
    recycle: (
      <>
        <path d="m9 3 2-1 2 4-2 1M11 3h4l3 5M20 10l2 1-2 4-2-1m2-1-2 4h-5M12 20v2H7v-2m2 0H5l-2-5M4 13l-2-1 2-4 2 1m-2 1 2-4h4" />
      </>
    ),
    accessibility: (
      <>
        <circle cx="10" cy="3" r="1.5" />
        <path d="m10 7 1 7h6l3 6 2-1M11 9h6M7 10a6 6 0 1 0 7 10" />
      </>
    ),
    ramp: <path d="M3 21 20 4v17M3 21h17" />,
    tactile: (
      <>
        {[6, 12, 18].flatMap((x) =>
          [5, 12, 19].map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.4" fill="currentColor" />
          )),
        )}
      </>
    ),
    sound: (
      <>
        <path d="M3 9h4l5-5v16l-5-5H3zM16 8a6 6 0 0 1 0 8M19 4a11 11 0 0 1 0 16" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    pin: (
      <>
        <path d="M12 22s7-7 7-13a7 7 0 0 0-14 0c0 6 7 13 7 13Z" />
        <circle cx="12" cy="9" r="2" />
      </>
    ),
  }
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {drawings[name]}
    </svg>
  )
}
