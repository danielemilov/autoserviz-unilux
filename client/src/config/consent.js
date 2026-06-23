const consentKey = "unilux-cookie-consent";
const consentEvent = "unilux-consent-change";
const consentOpenEvent = "unilux-open-consent";

export function readConsent() { return window.localStorage.getItem(consentKey); }
export function saveConsent(value) { window.localStorage.setItem(consentKey, value); window.dispatchEvent(new Event(consentEvent)); }
export function openConsentSettings() { window.dispatchEvent(new Event(consentOpenEvent)); }
export { consentEvent, consentOpenEvent };
