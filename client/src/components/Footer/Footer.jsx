import { Link } from "react-router-dom";
import { openConsentSettings } from "../../config/consent";
import { site } from "../../config/site";
import PaymentNotice from "../BookingWizard/PaymentNotice";
import "./Footer.css";

export default function Footer() { return <footer className="footer"><div className="page-width footer-inner"><div className="footer-top"><div className="footer-brand-sector"><Link className="footer-brand" to="/"><img src="/unilux-logo.jpg" alt="" /><span>UNILUX<br /><small>АВТОСЕРВИЗ</small></span></Link><p>© {new Date().getFullYear()} Автосервиз UNILUX</p></div><div className="footer-sector"><span>Контакт</span><a href={`tel:${site.phoneHref}`}>{site.phone}</a><a href={`mailto:${site.email}`}>{site.email}</a></div><div className="footer-sector"><span>Локация и работно време</span><p>{site.address}</p><p>{site.workingHours}</p><a href={site.mapsDirectionsUrl} target="_blank" rel="noreferrer">Виж маршрута ↗</a></div></div><PaymentNotice compact /><div className="footer-legal"><Link to="/privacy">Поверителност</Link><button type="button" onClick={openConsentSettings}>Cookie настройки</button></div></div></footer>; }
