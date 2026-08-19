/**
 * Hand-drawn style spice doodles, drawn as inline SVG line art.
 *
 * These are a different visual register from the photoreal floating PNGs: they sit
 * behind the content as a faint sketchbook texture rather than on top of it.
 * Stroke colour comes from `currentColor` so each placement can be tinted with the
 * Agnitra palette from index.css.
 */

const DOODLE_PATHS = {
  chilli: (
    <>
      <path d="M29 13c0-4 4-6 7-4 2 1 3 4 2 6" />
      <path d="M31 16c9 3 15 11 15 21 0 11-7 18-15 18-6 0-9-4-8-9 2-7 8-10 9-17 1-5 0-9-1-13Z" />
    </>
  ),
  turmeric: (
    <>
      <path d="M14 34c-3-6 1-12 7-12 4 0 6 3 9 3 4 0 6-4 11-3 6 1 9 7 7 12-2 6-8 7-13 6-4-1-7-3-11-2-4 1-8 2-10-4Z" />
      <path d="M23 25c1 4 1 8 0 12" />
      <path d="M34 24c1 4 1 9 0 13" />
    </>
  ),
  ginger: (
    <>
      <path d="M16 38c-4-5-2-12 4-13 4-1 7 2 10 1 3-1 4-6 9-6 6 0 10 5 8 11-1 5-6 7-10 7-4 0-6-2-9-1-4 1-9 5-12 1Z" />
      <path d="M30 20c2-5 7-7 10-5" />
      <path d="M24 27c1 3 1 6 0 9" />
    </>
  ),
  coriander: (
    <>
      <path d="M32 52V26" />
      <path d="M32 30c-6-2-10-7-9-13 6-1 11 3 12 9" />
      <path d="M32 30c6-2 10-7 9-13-6-1-11 3-12 9" />
      <path d="M32 42c-6-1-10-5-10-11 6-1 10 2 11 8" />
      <path d="M32 42c6-1 10-5 10-11-6-1-10 2-11 8" />
    </>
  ),
  starAnise: (
    <>
      <path d="M32 10l4 9 9-4-4 9 9 4-9 4 4 9-9-4-4 9-4-9-9 4 4-9-9-4 9-4-4-9 9 4z" />
      <circle cx="32" cy="32" r="5" />
    </>
  ),
  cinnamon: (
    <>
      <path d="M22 14h16c2 0 3 2 3 4v30c0 2-1 4-3 4H22c-2 0-3-2-3-4V18c0-2 1-4 3-4Z" />
      <path d="M27 14v38" />
      <path d="M33 14v38" />
    </>
  ),
  mortar: (
    <>
      <path d="M14 30h36c0 11-8 18-18 18s-18-7-18-18Z" />
      <path d="M12 30h40" />
      <path d="M26 48h12l2 6H24z" />
      <path d="M40 28 46 10" />
      <path d="M43 9c2-1 4 0 4 2l-2 6" />
    </>
  ),
  cardamom: (
    <>
      <path d="M32 10c7 6 10 14 10 22 0 12-5 20-10 20s-10-8-10-20c0-8 3-16 10-22Z" />
      <path d="M32 14v36" />
      <path d="M26 22c2 8 2 18 0 26" />
      <path d="M38 22c-2 8-2 18 0 26" />
    </>
  ),
  garlic: (
    <>
      <path d="M32 14c-8 8-14 16-14 24 0 8 6 14 14 14s14-6 14-14c0-8-6-16-14-24Z" />
      <path d="M32 14v38" />
      <path d="M24 26c-2 8-2 16 0 24" />
      <path d="M40 26c2 8 2 16 0 24" />
      <path d="M32 14c0-4 2-6 4-7" />
    </>
  ),
  peppercorn: (
    <>
      <path d="M20 12c6 4 10 12 12 20 2 8 2 16 0 22" />
      <circle cx="26" cy="24" r="4" />
      <circle cx="33" cy="34" r="4" />
      <circle cx="35" cy="46" r="4" />
      <circle cx="22" cy="36" r="3" />
    </>
  ),
  bayleaf: (
    <>
      <path d="M18 46c0-16 10-30 26-34 2 16-6 32-22 36-2 0-4-1-4-2Z" />
      <path d="M22 46C26 34 33 22 44 12" />
    </>
  ),
  chakki: (
    <>
      <circle cx="32" cy="34" r="18" />
      <circle cx="32" cy="34" r="7" />
      <path d="M32 16v10" />
      <path d="M46 30 38 33" />
      <path d="M18 30l8 3" />
      <path d="M32 52v-11" />
      <path d="M44 46 38 39" />
      <path d="M20 46l6-7" />
    </>
  )
};


/**
 * Renders one doodle. `name` picks the drawing, `className` positions it
 * (see the doodle blocks in index.css).
 */
export function SpiceDoodle({ name, className = '' }) {
  const paths = DOODLE_PATHS[name];
  if (!paths) return null;

  return (
    <svg
      className={`spice-doodle ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths}
    </svg>
  );
}

/**
 * A full-bleed decorative layer for one section. Sits behind the section content,
 * so the host section needs the `doodle-host` class (see index.css).
 */
function SpiceDoodleLayer({ variant, doodles }) {
  return (
    <div className={`spice-doodle-layer doodle-layer--${variant}`} aria-hidden="true">
      {doodles.map((name, i) => (
        <SpiceDoodle key={`${name}-${i}`} name={name} className={`doodle-${variant}-${i + 1}`} />
      ))}
    </div>
  );
}

export default SpiceDoodleLayer;
