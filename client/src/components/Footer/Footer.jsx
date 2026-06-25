import { Link } from "react-router-dom";
import { openConsentSettings } from "../../config/consent";
import { site } from "../../config/site";
import PaymentNotice from "../BookingWizard/PaymentNotice";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="page-width footer-inner">
        <div className="footer-layout">
          <section className="footer-brand-sector">
            <Link className="footer-brand" to="/">
              <img src="/unilux-logo.jpg" alt="" />
              <span>
                UNILUX
                <small>АВТОСЕРВИЗ</small>
              </span>
            </Link>
            <p>
              Ремонт, диагностика и точна грижа за автомобила — с ясен разговор
              преди всяка работа.
            </p>
          </section>

          <section className="footer-info-panel" aria-label="Контактна информация">
            <div className="footer-sector footer-sector-main">
              <span>Контакт</span>
              <a className="footer-primary-link" href={`tel:${site.phoneHref}`}>
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>

            <div className="footer-sector">
              <span>Локация</span>
              <p>{site.address}</p>
              <a href={site.mapsDirectionsUrl} target="_blank" rel="noreferrer">
                Виж маршрута ↗
              </a>
            </div>

            <div className="footer-sector">
              <span>Работно време</span>
              <p>Понеделник – Петък · {site.weekdayHours}</p>
              <p>Събота и неделя · {site.weekendHours}</p>
            </div>
          </section>
        </div>

        <PaymentNotice compact />

        <div className="footer-bottom">
          <div className="footer-legal">
            <Link to="/privacy">Поверителност</Link>
            <button type="button" onClick={openConsentSettings}>
              Cookie настройки
            </button>
          </div>

          <p className="footer-copyright">© 2026 Автосервиз UNILUX</p>
        </div>
      </div>
    </footer>
  );
}
