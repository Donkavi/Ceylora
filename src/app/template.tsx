/**
 * Every route change fades the new page in from a soft veil. Done in CSS so the
 * page is painted immediately (good for LCP) and works without JavaScript.
 * Fill mode is "backwards" so no transform lingers after the animation — a
 * lingering transform would break the fixed positioning used by pinned sections.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-[page-in_0.9s_var(--ease-cinematic)_backwards]">{children}</div>;
}
