import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { consentOpenEvent, readConsent, saveConsent } from "../../config/consent";
import "./CookieConsent.css";

export default function CookieConsent() {
  const [visible, setVisible] = useState(() => !readConsent());
  useEffect(() => { const open = () => setVisible(true); window.addEventListener(consentOpenEvent, open); return () => window.removeEventListener(consentOpenEvent, open); }, []);
  if (!visible) return null;
  const choose = (value) => { saveConsent(value); setVisible(false); };
  return <div className="cookie-layer" role="dialog" aria-modal="true" aria-labelledby="cookie-title"><section className="cookie-card"><p>Поверителност</p><h2 id="cookie-title">Карта и външни услуги.</h2><span>Не използваме аналитични или рекламни cookies. Картата на Google Maps се зарежда само след твоето разрешение и може да постави свои cookies.</span><div className="cookie-links"><Link to="/privacy">Политика за поверителност</Link></div><div className="cookie-actions"><button type="button" onClick={() => choose("essential")}>Само необходими</button><button type="button" onClick={() => choose("maps")}>Разреши картата</button></div></section></div>;
}
