import "./BrandTicker.css";

const brands = [
  {
    id: "skoda",
    name: "Škoda",
    file: "skoda-transparent.png",
    width: 28,
    height: 28,
    scale: 1.16,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "bmw",
    name: "BMW",
    file: "bmw-transparent.png",
    width: 28,
    height: 28,
    scale: 1.08,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "audi",
    name: "Audi",
    file: "audi-transparent.png",
    width: 58,
    height: 20,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "volkswagen",
    name: "Volkswagen",
    file: "volkswagen-transparent.png",
    width: 31,
    height: 31,
    scale: 1.18,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    file: "mercedes-benz-transparent.png",
    width: 28,
    height: 28,
    scale: 1.08,
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "ford",
    name: "Ford",
    file: "ford-transparent.png",
    width: 54,
    height: 21,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  },
];

function getBrandVariables(brand) {
  return {
    "--brand-image-width": `${brand.width}px`,
    "--brand-image-height": `${brand.height}px`,
    "--brand-image-scale": brand.scale,
    "--brand-image-x": `${brand.offsetX}px`,
    "--brand-image-y": `${brand.offsetY}px`,
  };
}

function BrandTickerSet({ duplicate = false }) {
  return (
    <div
      className="brand-ticker__set"
      role={duplicate ? undefined : "list"}
      aria-hidden={duplicate ? "true" : undefined}
    >
      {brands.map((brand) => (
        <div
          className={`brand-ticker__item brand-ticker__item--${brand.id}`}
          role={duplicate ? undefined : "listitem"}
          style={getBrandVariables(brand)}
          key={`${brand.id}-${duplicate ? "duplicate" : "original"}`}
        >
          <div className="brand-ticker__logo-area">
            <img
              className="brand-ticker__logo"
              src={`/brands/${brand.file}`}
              alt={duplicate ? "" : brand.name}
              draggable="false"
              decoding="async"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BrandTicker() {
  return (
    <aside
      className="brand-ticker"
      aria-label="Обслужвани марки автомобили"
    >
      <div
        className="brand-ticker__shine"
        aria-hidden="true"
      />

      <div
        className="brand-ticker__side-shadow brand-ticker__side-shadow--left"
        aria-hidden="true"
      />

      <div
        className="brand-ticker__side-shadow brand-ticker__side-shadow--right"
        aria-hidden="true"
      />

      <div className="brand-ticker__track">
        <BrandTickerSet />
        <BrandTickerSet duplicate />
      </div>

      <div
        className="brand-ticker__bottom-line"
        aria-hidden="true"
      />
    </aside>
  );
}