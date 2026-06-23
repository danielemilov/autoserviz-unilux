import { useEffect, useState } from "react";

import {
  consentEvent,
  openConsentSettings,
  readConsent,
  saveConsent,
} from "../../config/consent";

import { site } from "../../config/site";

import "./MapSection.css";

export default function MapSection() {
  const [mapAllowed, setMapAllowed] = useState(
    () => readConsent() === "maps",
  );

  useEffect(() => {
    const updateMapConsent = () => {
      setMapAllowed(readConsent() === "maps");
    };

    window.addEventListener(
      consentEvent,
      updateMapConsent,
    );

    return () => {
      window.removeEventListener(
        consentEvent,
        updateMapConsent,
      );
    };
  }, []);

  const allowMap = () => {
    saveConsent("maps");
    setMapAllowed(true);
  };

  return (
    <section
      className="map-section"
      id="contacts"
    >
      <div className="page-width">
        <div className="map-card">
          <div className="map-info">
            <p className="eyebrow light">
              Контакти и локация
            </p>

            <h2>
              Ще ни намериш
              <br />
              в Ушинци.
            </h2>

            <p>{site.address}</p>

            <a
              className="map-phone"
              href={`tel:${site.phoneHref}`}
            >
              {site.phone}
            </a>

            <a
              className="map-email"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>

            <span className="map-hours">
              {site.workingHours}
            </span>

            <a
              className="map-route"
              href={site.mapsDirectionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Виж маршрута
              <span aria-hidden="true">↗</span>
            </a>

            <div
              className="map-unilux-mark"
              aria-hidden="true"
            >
              <div>
                <img
                  src="/unilux-logo.jpg"
                  alt=""
                  draggable="false"
                />
              </div>

              <span>UNILUX</span>
            </div>
          </div>

          <div className="map-canvas">
            {mapAllowed ? (
              <iframe
                title="Автосервиз UNILUX — Ушинци"
                src={site.mapsEmbedUrl}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <div className="map-consent">
                <span>Google Maps</span>

                <p>
                  Картата се зарежда след разрешение за
                  външната услуга.
                </p>

                <button
                  type="button"
                  onClick={allowMap}
                >
                  Покажи карта
                </button>

                <button
                  className="map-consent-settings"
                  type="button"
                  onClick={openConsentSettings}
                >
                  Настройки за поверителност
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}