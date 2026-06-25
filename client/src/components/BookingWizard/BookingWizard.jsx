import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "../../config/site";
import ServiceStep from "./ServiceStep";
import VehicleStep from "./VehicleStep";
import ScheduleStep from "./ScheduleStep";
import DetailsStep from "./DetailsStep";
import "./BookingWizard.css";

const initialState = { service: "", vehicle: { make: "", model: "", registration: "" }, date: "", time: "", customer: { name: "", phone: "", email: "" }, note: "" };
const labels = ["Услуга", "Автомобил", "Час", "Данни"];

export default function BookingWizard() {
  const wizardRef = useRef(null);
  const firstStepRender = useRef(true);
  const preselected = useMemo(() => new URLSearchParams(window.location.search).get("service") || "", []);
  const [state, setState] = useState({ ...initialState, service: preselected });
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [completed, setCompleted] = useState(false);

  const change = (key, value) => setState((current) => ({ ...current, [key]: value }));
  const changeVehicle = (key, value) => setState((current) => ({ ...current, vehicle: { ...current.vehicle, [key]: value } }));
  const changeCustomer = (key, value) => setState((current) => ({ ...current, customer: { ...current.customer, [key]: value } }));
  const isValid = () => step === 1 ? Boolean(state.service) : step === 2 ? Boolean(state.vehicle.make && state.vehicle.model) : step === 3 ? Boolean(state.date && state.time) : Boolean(state.customer.name && state.customer.phone && state.customer.email);

  useEffect(() => {
    if (firstStepRender.current) {
      firstStepRender.current = false;
      return;
    }

    requestAnimationFrame(() => {
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
      const wizardTop = wizardRef.current?.getBoundingClientRect().top ?? 0;

      window.scrollTo({
        top: Math.max(0, window.scrollY + wizardTop - headerHeight - 14),
        behavior: "smooth",
      });
    });
  }, [step]);

  function next() {
    if (!isValid()) {
      setMessage("Попълни избора в тази стъпка, за да продължиш.");
      return;
    }
    setMessage("");
    setStep((current) => current + 1);
  }

  function back() {
    setMessage("");
    setStep((current) => current - 1);
  }

  async function submit(event) {
    event.preventDefault();
    if (!isValid()) {
      setMessage("Попълни контактните данни, за да изпратиш заявката.");
      return;
    }

    setSending(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || result.body?.message || "Неуспешно изпращане");
      setCompleted(true);
    } catch (error) {
      setMessage(error.message || "Не успяхме да изпратим заявката. Опитай отново след малко.");
    } finally {
      setSending(false);
    }
  }

  const emailMessage = [
    "НОВА ЗАЯВКА ЗА ЧАС — АВТОСЕРВИЗ UNILUX",
    "",
    `Услуга: ${state.service}`,
    `Автомобил: ${`${state.vehicle.make} ${state.vehicle.model} ${state.vehicle.registration}`.trim()}`,
    `Предпочитан ден: ${state.date}`,
    `Предпочитан час: ${state.time}`,
    `Клиент: ${state.customer.name}`,
    `Телефон: ${state.customer.phone}`,
    `Имейл: ${state.customer.email}`,
    state.note ? "" : null,
    state.note ? `Бележка: ${state.note}` : null,
    "",
    "Плащане: в сервиза след услугата"
  ].filter(Boolean).join("\n");

  if (completed) return <section className="wizard-success"><span>✓</span><p className="eyebrow">ЗАЯВКАТА Е ИЗПРАТЕНА</p><h2>Благодарим.</h2><p>Ще се свържем с теб, за да потвърдим посещението и точния час.</p></section>;

  return <section className="wizard" ref={wizardRef}>
    <aside className="wizard-progress" aria-label="Напредък на заявката">{labels.map((label, index) => <button type="button" disabled={step < index + 1} onClick={() => setStep(index + 1)} className={step === index + 1 ? "active" : step > index + 1 ? "done" : ""} key={label}><span>{index + 1}</span>{label}</button>)}</aside>
    <div className="wizard-panel">
      {step === 1 && <ServiceStep value={state.service} onChange={(value) => change("service", value)} />}
      {step === 2 && <VehicleStep vehicle={state.vehicle} onChange={changeVehicle} />}
      {step === 3 && <ScheduleStep date={state.date} time={state.time} onDate={(value) => change("date", value)} onTime={(value) => change("time", value)} />}
      {step === 4 && <form id="appointment-request" className="appointment-form" method="POST" action="https://api.web3forms.com/submit" onSubmit={submit}><input type="hidden" name="access_key" value={site.web3FormsAccessKey} /><input type="hidden" name="subject" value="Нова заявка за час | Автосервиз UNILUX" /><input type="hidden" name="from_name" value="Автосервиз UNILUX" /><input type="hidden" name="replyto" value={state.customer.email} /><input type="hidden" name="message" value={emailMessage} /><input type="hidden" name="service" value={state.service} /><input type="hidden" name="vehicle" value={`${state.vehicle.make} ${state.vehicle.model} ${state.vehicle.registration}`.trim()} /><input type="hidden" name="preferred_date" value={state.date} /><input type="hidden" name="preferred_time" value={state.time} /><input type="hidden" name="payment" value="Плащане в сервиза след услугата" /><DetailsStep customer={state.customer} note={state.note} appointment={state} onCustomer={changeCustomer} onNote={(value) => change("note", value)} /></form>}
      <footer className="wizard-actions">{step > 1 ? <button className="wizard-back" type="button" onClick={back}>← Назад</button> : <span />}{step < 4 ? <button className="primary-link" type="button" onClick={next}>Продължи <span>→</span></button> : <button className="primary-link" type="submit" form="appointment-request" disabled={sending}>{sending ? "Изпращане..." : "Изпрати заявка"} <span>→</span></button>}</footer>
      {message && <p className="wizard-message">{message}</p>}
    </div>
  </section>;
}
