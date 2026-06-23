import "./VehicleStep.css";

export default function VehicleStep({ vehicle, onChange }) {
  return <section className="wizard-step vehicle-step"><p className="step-kicker">Автомобил</p><h2>Кой автомобил<br />очакваме?</h2><p className="step-copy">Основните данни ни помагат да подготвим правилния екип и време за посещението.</p><div className="vehicle-form"><label><span>МАРКА <b>*</b></span><input autoFocus value={vehicle.make} onChange={(event) => onChange("make", event.target.value)} placeholder="Например BMW" /></label><label><span>МОДЕЛ <b>*</b></span><input value={vehicle.model} onChange={(event) => onChange("model", event.target.value)} placeholder="Например X5" /></label><label className="vehicle-registration"><span>РЕГИСТРАЦИОНЕН НОМЕР</span><input value={vehicle.registration} onChange={(event) => onChange("registration", event.target.value)} placeholder="По желание" /></label></div></section>;
}
