import { useMemo, useState } from "react";
import "./ScheduleStep.css";

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const months = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"];
const weekdayTimes = ["16:00", "17:00", "18:00", "19:00", "20:00"];
const weekendTimes = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

function startOfDay(value) { const date = new Date(value); date.setHours(0, 0, 0, 0); return date; }
function valueFor(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }

export default function ScheduleStep({ date, time, onDate, onTime }) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const minimumDate = useMemo(() => { const item = new Date(today); item.setDate(item.getDate() + 1); return item; }, [today]);
  const calendarDays = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const firstVisible = new Date(first); firstVisible.setDate(first.getDate() - offset);
    return Array.from({ length: 42 }, (_, index) => { const item = new Date(firstVisible); item.setDate(firstVisible.getDate() + index); return item; });
  }, [cursor]);
  const selectedDate = date ? startOfDay(`${date}T12:00:00`) : null;
  const availableTimes = selectedDate && [0, 6].includes(selectedDate.getDay()) ? weekendTimes : weekdayTimes;
  const canGoBack = cursor.getFullYear() > today.getFullYear() || cursor.getMonth() > today.getMonth();
  const selectedLabel = selectedDate ? `${selectedDate.getDate()} ${months[selectedDate.getMonth()].toLowerCase()}` : "Избери ден";

  function moveMonth(direction) {
    setCursor((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
  }

  return <section className="wizard-step schedule-step"><p className="step-kicker">Ден и час</p><div className="schedule-heading"><div><h2>Избери удобно време.</h2><p className="step-copy">Избери предпочитан ден и час. Потвърждаваме посещението лично.</p></div><div className="selected-slot"><span>ТВОЕТО ПРЕДПОЧИТАНИЕ</span><strong>{selectedLabel}</strong><b>{time || "Избери час"}</b></div></div><div className="schedule-body"><div className="calendar-surface"><div className="calendar-toolbar"><button type="button" className="calendar-arrow" disabled={!canGoBack} onClick={() => moveMonth(-1)} aria-label="Предишен месец">←</button><strong>{months[cursor.getMonth()]} {cursor.getFullYear()}</strong><button type="button" className="calendar-arrow" onClick={() => moveMonth(1)} aria-label="Следващ месец">→</button></div><div className="calendar-weekdays">{weekdays.map((item) => <span key={item}>{item}</span>)}</div><div className="calendar-days" role="radiogroup" aria-label="Предпочитан ден">{calendarDays.map((item) => { const isCurrentMonth = item.getMonth() === cursor.getMonth(); const isPast = item < minimumDate; const isSelected = selectedDate?.getTime() === item.getTime(); return <button type="button" role="radio" aria-checked={isSelected} disabled={!isCurrentMonth || isPast} className={`${isSelected ? "selected" : ""}${!isCurrentMonth ? " outside" : ""}`} key={valueFor(item)} onClick={() => { onDate(valueFor(item)); onTime(""); }}>{item.getDate()}</button>; })}</div></div><div className="time-area"><p>{selectedDate && [0, 6].includes(selectedDate.getDay()) ? "Събота и неделя · 07:00 – 19:00" : "Понеделник – Петък · 16:00 – 21:00"} <b>*</b></p><div className="time-grid">{availableTimes.map((item) => <button type="button" className={time === item ? "selected" : ""} key={item} onClick={() => onTime(item)}><span>{item}</span><i></i></button>)}</div></div></div></section>;
}
