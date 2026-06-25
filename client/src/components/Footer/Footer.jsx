import { Link } from "react-router-dom";
import { openConsentSettings } from "../../config/consent";
import { site } from "../../config/site";
import PaymentNotice from "../BookingWizard/PaymentNotice";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="page-width footer-inner">
        <div className="footer-main">
          <section className="footer-brand-column">
            <Link
              className="footer-brand"
              to="/"
              aria-label="UNILUX Автосервиз"
            >
              <img
                src="/unilux-logo.jpg"
                alt="UNILUX Автосервиз"
              />

              <span>
                <strong>UNILUX</strong>
                <small>АВТОСЕРВИЗ</small>
              </span>
            </Link>
          </section>

          <section
            className="footer-column footer-contact-column"
            aria-labelledby="footer-contact-title"
          >
            <h2 id="footer-contact-title">Контакт</h2>

            <div className="footer-contact-list">
              <a
                className="footer-phone"
                href={`tel:${site.phoneHref}`}
              >
                {site.phone}
              </a>

              <a
                className="footer-email"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>

              <a
                className="footer-address"
                href={site.mapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span>{site.address}</span>
                <i aria-hidden="true">↗</i>
              </a>
            </div>
          </section>

          <section
            className="footer-column footer-service-column"
            aria-labelledby="footer-hours-title"
          >
            <div className="footer-hours">
              <h2 id="footer-hours-title">
                Работно време
              </h2>

              <div className="footer-hours-list">
                <div>
                  <span>Понеделник – Петък</span>
                  <strong>{site.weekdayHours}</strong>
                </div>

                <div>
                  <span>Събота и неделя</span>
                  <strong>{site.weekendHours}</strong>
                </div>
              </div>
            </div>

            <div className="footer-payment">
              <span className="footer-payment-label">
                Плащане
              </span>

              <div className="footer-payment-value">
                <strong>С карта или в брой</strong>

                <div
                  className="footer-payment-icons"
                  aria-label="Приемани начини на плащане"
                >
                  <PaymentNotice compact />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Автосервиз UNILUX</p>

          <div className="footer-legal">
            <Link to="/privacy">
              Поверителност
            </Link>

            <button
              type="button"
              onClick={openConsentSettings}
            >
              Настройки за бисквитките
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}