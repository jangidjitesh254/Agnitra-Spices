// Single source of truth for the launch promotion. The home banner advertises it
// and checkout validates against it, so the site can never show a code the cart
// then rejects.

export const LAUNCH_OFFER = {
  code: 'LAUNCH15',
  percentOff: 15,
  // Offsets are pinned to IST so the window opens on the 14th for Indian
  // shoppers whatever time zone their device is set to.
  startsAt: new Date('2026-09-14T00:00:00+05:30'),
  endsAt: new Date('2026-09-30T23:59:59+05:30')
};

const formatDay = (date) =>
  date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', timeZone: 'Asia/Kolkata' });

export const LAUNCH_START_LABEL = formatDay(LAUNCH_OFFER.startsAt);
export const LAUNCH_END_LABEL = formatDay(LAUNCH_OFFER.endsAt);

/** 'upcoming' before the window, 'live' inside it, 'expired' after. */
export function getOfferStatus(now = new Date()) {
  if (now < LAUNCH_OFFER.startsAt) return 'upcoming';
  if (now > LAUNCH_OFFER.endsAt) return 'expired';
  return 'live';
}

/** Whole days left until the offer opens; 0 once it is live. */
export function daysUntilLaunch(now = new Date()) {
  const ms = LAUNCH_OFFER.startsAt.getTime() - now.getTime();
  return ms <= 0 ? 0 : Math.ceil(ms / 86400000);
}

/**
 * Validate a typed coupon against the cart subtotal.
 * Returns { ok, discount, message } — never throws, so callers can render the
 * message straight into the field.
 */
export function applyCoupon(rawCode, subtotal, now = new Date()) {
  const code = (rawCode || '').trim().toUpperCase();

  if (!code) {
    return { ok: false, discount: 0, message: 'Enter a coupon code' };
  }
  if (code !== LAUNCH_OFFER.code) {
    return { ok: false, discount: 0, message: 'This coupon code is not valid' };
  }

  const status = getOfferStatus(now);
  if (status === 'upcoming') {
    return { ok: false, discount: 0, message: `${LAUNCH_OFFER.code} goes live on ${LAUNCH_START_LABEL}` };
  }
  if (status === 'expired') {
    return { ok: false, discount: 0, message: `${LAUNCH_OFFER.code} expired on ${LAUNCH_END_LABEL}` };
  }
  if (subtotal <= 0) {
    return { ok: false, discount: 0, message: 'Add something to your cart first' };
  }

  return {
    ok: true,
    code: LAUNCH_OFFER.code,
    percentOff: LAUNCH_OFFER.percentOff,
    discount: Math.round((subtotal * LAUNCH_OFFER.percentOff) / 100),
    message: `${LAUNCH_OFFER.percentOff}% launch discount applied`
  };
}
