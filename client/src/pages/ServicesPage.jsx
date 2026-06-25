import { Link } from "react-router-dom";
import { services } from "../config/site";
import ServiceIcon from "../components/ServiceIcon/ServiceIcon";
import "./ServicesPage.css";

export default function ServicesPage() {
  return <main className="services-page"><section className="services-intro"><div className="page-width"><p>Автосервиз UNILUX</p><h1>Услуги за автомобила ти.</h1><span>Отвори услугата, виж кратка информация и изпрати заявка за предпочитан ден и час.</span></div></section><section className="page-width services-showcase" aria-label="Услуги"><div className="services-grid">{services.map((service) => <Link className="service-card" to={`/services/${service.id}`} key={service.id} title={service.title}><span className="service-card-icon"><ServiceIcon type={service.icon} label="" /></span><h2>{service.cardTitle || service.title}</h2></Link>)}</div></section></main>;
}
