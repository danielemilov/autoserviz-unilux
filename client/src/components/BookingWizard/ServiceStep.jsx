import { services } from "../../config/site";
import ServiceIcon from "../ServiceIcon/ServiceIcon";
import "./ServiceStep.css";

export default function ServiceStep({ value, onChange }) {
  return <section className="wizard-step service-step"><p className="step-kicker">Избор на услуга</p><div className="step-heading"><div><h2>За какво ти трябва час?</h2><p className="step-copy">Избери услуга. След това ще добавиш автомобила и предпочитания час.</p></div><span className="selection-count">{value || "Избери услуга"}</span></div><div className="service-choice-grid">{services.map((service) => <button className={value === service.title ? "chosen" : ""} type="button" key={service.id} onClick={() => onChange(service.title)} aria-pressed={value === service.title}><ServiceIcon type={service.icon} label="" /><strong>{service.title}</strong><b>{value === service.title ? "✓" : "→"}</b></button>)}</div></section>;
}
