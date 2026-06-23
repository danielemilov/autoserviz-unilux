import "./ServiceIcon.css";

const Engine = () => <><path d="M17 24h8l5-7h12l4 7h5l4 5v13l-4 5h-8v-7H21v7h-7V31l3-7Z" /><path d="M31 26h10M35 47v-7M21 31h-7M51 31h6M30 17V10" /></>;
const Chassis = () => <><path d="M10 39h44l-4-13H14l-4 13Z" /><path d="M17 26l5-7h20l5 7M18 39v7M46 39v7" /><circle cx="19" cy="48" r="5" /><circle cx="45" cy="48" r="5" /><path d="M12 39h40" /></>;
const Brakes = () => <><circle cx="32" cy="32" r="19" /><circle cx="32" cy="32" r="7" /><path d="M32 13v7M32 44v7M13 32h7M44 32h7M19 19l5 5M40 40l5 5M45 19l-5 5M24 40l-5 5" /><path d="M48 17v18h-7" /></>;
const Suspension = () => <><path d="M20 11v12l-6 6 12 6-12 6 6 6v6M44 11v12l6 6-12 6 12 6-6 6v6" /><path d="M20 11h24M20 53h24M26 23h12M26 41h12" /></>;
const Diagnostics = () => <><rect x="15" y="10" width="34" height="44" rx="4" /><path d="M25 10v-3h14v3M23 23h18M23 31h8M23 39h8" /><path d="m35 41 4 4 8-10" /></>;
const Transmission = () => <><circle cx="32" cy="32" r="18" /><circle cx="32" cy="32" r="6" /><path d="M32 14v8M32 42v8M14 32h8M42 32h8M19 19l6 6M39 39l6 6M45 19l-6 6M25 39l-6 6" /><path d="M29 32h12m0 0-4-4m4 4-4 4" /></>;
const Scanner = () => <><rect x="10" y="17" width="44" height="30" rx="5" /><path d="M19 10v7M45 10v7M19 47v7M45 47v7M18 33h7l4-8 7 16 4-8h6" /><circle cx="47" cy="24" r="2" /></>;
const Detailing = () => <><path d="M15 42c7-15 18-21 34-20-2 15-11 23-26 24" /><path d="m26 43 5 8 6-10M19 27l-5-5M24 20l-1-7M35 18l3-6M44 21l6-4" /><path d="M13 47c8 4 22 6 35-1" /></>;
const Cabin = () => <><path d="M19 52V28l7-11h12l7 11v24H19Z" /><path d="M26 17v-6h12v6M24 30h16M32 35c-4 5-5 7-5 10a5 5 0 0 0 10 0c0-3-1-5-5-10Z" /><path d="M49 27c4 2 6 5 6 9M51 39c3 1 4 3 4 5" /></>;
const Protection = () => <><path d="M32 9 50 16v13c0 12-7 20-18 26-11-6-18-14-18-26V16l18-7Z" /><path d="M22 33h20M26 27v12M38 27v12" /><path d="m25 44 7 5 7-5" /></>;

const glyphs = {
  engine: <Engine />,
  chassis: <Chassis />,
  brakes: <Brakes />,
  suspension: <Suspension />,
  diagnostics: <Diagnostics />,
  transmission: <Transmission />,
  scanner: <Scanner />,
  detailing: <Detailing />,
  cabin: <Cabin />,
  protection: <Protection />
};

export default function ServiceIcon({ type, label = "" }) {
  return <svg className="service-icon" viewBox="0 0 64 64" role={label ? "img" : undefined} aria-label={label || undefined}>{glyphs[type] || glyphs.diagnostics}</svg>;
}
