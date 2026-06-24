import React from "react";

type P = React.SVGProps<SVGSVGElement>;

export const IconMenu = (p: P) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const IconSearch = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const IconUpload = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 16V4" />
    <path d="M7 9l5-5 5 5" />
    <path d="M5 20h14" />
  </svg>
);

export const IconUser = (p: P) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6z" />
  </svg>
);

export const IconArrow = (p: P) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export const IconChat = (p: P) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}>
    <path d="M4 4h16v11H8l-4 4z" />
  </svg>
);

export const IconHeart = (p: P) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const IconPlayRing = (p: P) => (
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M10 8l6 4-6 4z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconLogout = (p: P) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="11" fill="currentColor" stroke="none" />
    <path d="M10 8l4 4-4 4" stroke="#f1e3ce" />
    <path d="M8 12h6" stroke="#f1e3ce" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconFacebook = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
    <path d="M14 8h3V5h-3c-2 0-3 1.5-3 3.5V11H8v3h3v7h3v-7h3l.5-3H14V8.5c0-.3.2-.5.5-.5z" />
  </svg>
);

export const IconTwitter = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
    <path d="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1A4 4 0 0011.9 9c-3.3-.2-6.2-1.7-8.2-4.2-.9 1.6-.4 3.6 1.1 4.6-.6 0-1.2-.2-1.7-.5 0 1.9 1.3 3.5 3.1 3.9-.5.1-1.1.2-1.6.1.5 1.6 2 2.7 3.7 2.8A8 8 0 012 18.6 11.3 11.3 0 008.1 20c7.3 0 11.4-6.2 11.1-11.7.8-.5 1.4-1.2 1.9-2z" />
  </svg>
);

export const IconLinkedin = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
    <path d="M6 9H3v12h3zM4.5 3A1.8 1.8 0 104.5 6.6 1.8 1.8 0 004.5 3zM21 21h-3v-6c0-1.6-.6-2.5-1.8-2.5-1 0-1.5.6-1.7 1.3-.1.2-.1.6-.1.9V21h-3V9h3v1.3c.4-.6 1.2-1.5 2.9-1.5 2.1 0 3.5 1.4 3.5 4.3z" />
  </svg>
);
