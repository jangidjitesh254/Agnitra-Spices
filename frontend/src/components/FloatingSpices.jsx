import { useState } from 'react';
import { SPICE_ICONS } from './floatingSpiceConfig';

/**
 * Renders the drifting decorative spices for a page.
 *
 * Each entry is { key, icon }: `key` doubles as the CSS class that positions it
 * (see the floating decoration blocks in index.css) and `icon` selects the PNG.
 * Any entry whose image file is missing removes itself, so a new spice only
 * needs its icon dropped into /public/images to start appearing.
 */
function FloatingSpices({ spices }) {
  const [missing, setMissing] = useState({});

  return (
    <>
      {spices
        .filter((spice) => !missing[spice.key])
        .map((spice) => (
          <img
            key={spice.key}
            src={SPICE_ICONS[spice.icon]}
            className={`floating-leaf ${spice.key}`}
            alt=""
            aria-hidden="true"
            onError={() => setMissing((prev) => ({ ...prev, [spice.key]: true }))}
          />
        ))}
    </>
  );
}

export default FloatingSpices;
