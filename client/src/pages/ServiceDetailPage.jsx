import { Link, useParams } from "react-router-dom";
import ServiceIcon from "../components/ServiceIcon/ServiceIcon";
import { services } from "../config/site";
import "./ServiceDetailPage.css";

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const service = services.find((item) => item.id === serviceId);
  if (!service) return <main className="service-detail-page"><section className="page-width missing-service"><h1>Услугата не е намерена.</h1><Link className="dark-link" to="/services">Към услугите</Link></section></main>;
  return <main className="service-detail-page"><section className="service-detail-hero"><div className="page-width"><Link className="back-to-services" to="/services">← Всички услуги</Link><div className="service-detail-title"><div className="detail-icon-wrap"><ServiceIcon type={service.icon} label={service.title} /></div><div><h1>{service.title}</h1><p>{service.detail}</p><Link className="primary-link" to={`/reserve?service=${encodeURIComponent(service.title)}`}>Запази час <span>→</span></Link></div></div></div></section><section className="page-width service-detail-context"><div><span>За услугата</span><h2>Първо преглеждаме автомобила.</h2></div><p>Изпрати заявка с автомобила и предпочитан час. Свързваме се с теб, за да уточним детайлите и да потвърдим посещението. Не показваме автоматични цени и не обещаваме час без преглед.</p></section></main>;
}
