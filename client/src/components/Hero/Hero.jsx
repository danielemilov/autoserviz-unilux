import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-visual" aria-hidden="true">
        <img
          className="hero-car"
          src="/hero-car.png"
          alt=""
          draggable="false"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      <div className="page-width hero-layout">
        <div className="hero-copy">
          <h1>
            <span>Карай</span>
            <span>спокойно.</span>
          </h1>

          <p>
            Ремонт, диагностика и точна грижа за автомобила.
          </p>

          <Link className="primary-link hero-cta" to="/reserve">
            <span>Запази час</span>

            <span className="hero-cta-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <div className="hero-plate-shell" aria-hidden="true">
          <div className="hero-plate">
            <div className="hero-plate-logo">
              <img
                src="/unilux-logo.jpg"
                alt=""
                draggable="false"
              />
            </div>

            <div className="hero-plate-copy">
              <strong>UNILUX</strong>

              <small>
                Професионален ремонт и диагностика
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}