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
    swap: (
      <>
        <path d="M7 4v16M7 4 3 8m4-4 4 4M17 20V4m0 16-4-4m4 4 4-4" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    clipboard: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4h6v3H9zM9 11h6M9 15h4" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 17l9 5 9-5" />
      </>
    ),
    star: (
      <>
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3m0 14v3M4.9 4.9l2.1 2.1m10 10 2.1 2.1M2 12h3m14 0h3M4.9 19.1 7 17m10-10 2.1-2.1" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
    team: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 19a6 6 0 0 1 12 0" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M15.5 19a5 5 0 0 1 6.5 0" />
      </>
    ),
    moon: (
      <>
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
      </>
    ),
    expand: (
      <>
        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
      </>
    ),
    smartphone: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <path d="M11 18h2" />
      </>
    ),
    check: (
      <>
        <path d="m5 12 5 5L20 7" />
      </>
    ),
    chevronRight: (
      <>
        <path d="m9 6 6 6-6 6" />
      </>
    ),
    chevronLeft: (
      <>
        <path d="m15 6-6 6 6 6" />
      </>
    ),
    arrowUpRight: (
      <>
        <path d="M7 17 17 7M9 7h8v8" />
      </>
    ),
    sparkles: (
      <>
        <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3Z" />
        <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
        <path d="M5 16l.7 1.3L7 18l-1.3.7L5 20l-.7-1.3L3 18l1.3-.7L5 16Z" />
      </>
    ),
    send: (
      <>
        <path d="M22 2 11 13" />
        <path d="m22 2-7 20-4-9-9-4 20-7Z" />
      </>
    ),
    close: (
      <>
        <path d="M18 6 6 18M6 6l12 12" />
      </>
    ),
    chat: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
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
      {drawings[name] || drawings.info}
    </svg>
  )
}
