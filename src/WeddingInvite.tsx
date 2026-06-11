import { useState, useEffect, useRef } from "react";
import frontEnvelope from "./assets/lastphoto.jpeg";
import openEnvelope from "./assets/openenvelope.jpeg";
import "./weddingInvite.css";
const WEDDING_DATE = new Date("2027-07-03T12:00:00");
 import weddingVideo from "./assets/weddingwalk2.mp4";


function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));
 
  function getTimeLeft(date: Date) {
    const diff = date.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }
 
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
 
  return timeLeft;
}
 
type Phase = "envelope" | "flash" | "reveal";
 
export default function WeddingInvite() {
  const [phase, setPhase] = useState<Phase>("envelope");
  const [hovered, setHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
 
  function handleOpen() {
    if (phase !== "envelope") return;
    setPhase("flash");
    setTimeout(() => setPhase("reveal"), 1200);
  }
 
  return (
    <div className={`root ${phase === "reveal" ? "root--reveal" : ""}`}>
      {/* ── Flash overlay ── */}
      <div className={`flash-overlay ${phase === "flash" ? "active" : ""}`} />
 
      {/* ── ENVELOPE SCREEN ── */}
      {phase !== "reveal" && (
      <div className={`screen envelope-screen ${phase === "envelope" ? "visible" : "hidden"}`}>
        
        <div
          className={`envelope-wrapper ${hovered ? "hovered" : ""}`}
          onClick={handleOpen}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          role="button"
          tabIndex={0}
          aria-label="Open wedding invitation"
          onKeyDown={(e) => e.key === "Enter" && handleOpen()}
        >
          
          <img
            src={frontEnvelope}
            alt="Wedding envelope sealed with L&G wax seal"
            className="envelope-img"
            draggable={false}
          />
          <div className="envelope-text">
             <span>Liliana</span>
             <span>&</span>
             <span>Guilherme</span>
    
  </div>
  <div className="envelope-text-below">
    <span>Abrir</span>
    <span>o</span>
    <span>convite</span>
  </div>
  
  
        </div>
      </div>
      )}
 
      {/* ── REVEAL SCREEN ── */}
      <div className={`reveal-screen ${phase === "reveal" ? "visible" : ""}`}>
        <div className="reveal-inner">
          {/* Open envelope photo */}
          <div className="open-envelope-wrap">
            <img
              src={openEnvelope}
              alt="Open wedding invitation showing Liliana & Guilherme"
              className="open-envelope-img"
            />
            <video className="oval-video" autoPlay muted loop playsInline>
  <source src={weddingVideo} type="video/mp4" />
</video>
          </div>
 
          {/* Info block */}
          <div className="info-block">
            <p className="label-sm">Guardar a Data</p>
            <h1 className="couple-names">
              Liliana<br />
              <span className="ampersand">&amp;</span><br />
              Guilherme
            </h1>
 
            <div className="divider" />
 
            <div className="event-details">
              <div className="detail-row">
                <span className="detail-icon"></span>
                <span>3 de Julho de 2027, Igreja das Irmãs Franciscanas, Barcelos</span>
              </div>
            </div>
 
            <div className="divider" />
 
            {/* Countdown */}
            <p className="label-sm" style={{ marginBottom: "1rem" }}>Contagem Decrescente</p>
            <div className="countdown-grid">
              {[
                { value: days, label: "Dias" },
                { value: hours, label: "Horas" },
                { value: minutes, label: "Min" },
                { value: seconds, label: "Seg" },
              ].map(({ value, label }) => (
                <div key={label} className="countdown-cell">
                  <span className="countdown-num">{String(value).padStart(2, "0")}</span>
                  <span className="countdown-label">{label}</span>
                </div>
              ))}
            </div>
 
            <div className="monogram">L &amp; G</div>
          </div>
        </div>
      </div>
 
      
    </div>
  );
}
 