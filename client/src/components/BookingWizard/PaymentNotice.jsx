import "./PaymentNotice.css";

export default function PaymentNotice({ compact = false }) { return <aside className={`payment-notice${compact ? " compact" : ""}`}><div><p className="eyebrow light">Начини на плащане</p><h3>{compact ? "Плащане в сервиза." : <>Плащане<br />в сервиза.</>}</h3><p>След извършване на услугата. Няма онлайн плащане и не събираме данни за карта.</p></div><div className="payment-badges" aria-label="Визуализирани начини на плащане"><span className="visa">VISA</span><span className="master"><i></i><i></i></span><span> Pay</span><span><b>G</b> Pay</span></div></aside>; }
