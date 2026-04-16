import { useState, useEffect, useRef } from "react";

const A = "#10b981";
const BG = "#151520";
const S1 = "#1e1e2e";
const S2 = "#2a2a3d";
const T1 = "#f5f5fa";
const T2 = "#c4c4d8";
const T3 = "#9494b0";
const BD = "#3a3a52";

const skills = [
  { cat: "Backend", items: ["Java", "Spring Boot", "C#", "ASP.NET Core", "Node.js", "REST APIs"] },
  { cat: "Frontend", items: ["Angular", "Thymeleaf", "HTML/CSS", "JavaScript", "Jetpack Compose"] },
  { cat: "Mobile", items: ["Swift / SwiftUI", "Kotlin / Compose", "MVVM Architecture"] },
  { cat: "Data & Tools", items: ["MySQL", "Git", "Maven", "GitHub Actions", "Docker"] },
];

const projects = [
  {
    title: "NHL Pick-a-Winner",
    tags: ["Node.js", "Socket.IO", "Express"],
    desc: "Real-time multiplayer prediction game where players compete to guess NHL game outcomes. Live score integration via SportsData.io API, dynamic team logos, and a live leaderboard.",
    link: "https://github.com/llangis/nhl-pick-a-winner",
    color: "#10b981",
  },
  {
    title: "Campus Bites",
    tags: ["ASP.NET Core", "MVC", "C#"],
    desc: "Full-stack campus food ordering platform. Built as Full-Stack Lead & Client Liaison in a two-person team. Features restaurant browsing, menu management, and order tracking.",
    link: "https://github.com/llangis",
    color: "#6366f1",
  },
    {
    title: "Recovery Connect",
    tags: ["Java", "Spring Boot", "Thymeleaf"],
    desc: "Fellowship recovery tracking platform supporting AA, NA, and CA programs. Browse and manage the 12 Steps, Traditions, Promises, and Readings with full CRUD, Spring Security auth, and clean onion architecture.",
    link: "https://github.com/llangis",
    color: "#3b82f6",
  },
];

function useInView(t = 0.15) {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = r.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: t });
    o.observe(el);
    return () => o.disconnect();
  }, [t]);
  return [r, v];
}

function useType(text, speed = 45, delay = 600) {
  const [d, setD] = useState("");
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t); }, [delay]);
  useEffect(() => { if (!go || d.length >= text.length) return; const t = setTimeout(() => setD(text.slice(0, d.length + 1)), speed); return () => clearTimeout(t); }, [d, go, text, speed]);
  return d;
}

function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => { const f = () => setS(window.scrollY > 40); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  const ns = { color: T3, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", transition: "color 0.25s" };
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 clamp(1.5rem, 4vw, 4rem)", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: s ? "rgba(21,21,32,0.9)" : "transparent", backdropFilter: s ? "blur(16px)" : "none", borderBottom: s ? "1px solid " + BD : "1px solid transparent", transition: "all 0.4s ease" }}>
      <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 18, color: A }}>LL</span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: A, animation: "pulse 2s ease-in-out infinite" }} />
      </a>
      <div style={{ display: "flex", gap: "clamp(1.2rem, 3vw, 2.5rem)" }}>
        {["About", "Skills", "Projects"].map(x => (
          <a key={x} href={"#" + x.toLowerCase()} style={ns} onMouseOver={e => e.target.style.color = A} onMouseOut={e => e.target.style.color = T3}>{x}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const typed = useType("Full-Stack Developer", 50, 800);
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(2rem, 8vw, 10rem)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(" + A + " 1px, transparent 1px), linear-gradient(90deg, " + A + " 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div style={{ position: "absolute", top: "10%", right: "5%", width: 600, height: 600, background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", left: "0%", width: 400, height: 400, background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: A, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20, animation: "fadeSlideUp 0.6s ease both" }}>
        <span style={{ opacity: 0.5 }}>~/</span> Hello, I'm
      </p>
      <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 700, color: T1, lineHeight: 1.05, margin: 0, letterSpacing: "-0.03em", animation: "fadeSlideUp 0.7s ease 0.15s both" }}>Luc Langis</h1>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(1rem, 2.5vw, 1.35rem)", color: A, marginTop: 16, height: "1.6em", animation: "fadeSlideUp 0.7s ease 0.3s both" }}>
        {typed}<span style={{ animation: "blink 1s step-end infinite" }}>▌</span>
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 1.8vw, 1.15rem)", color: T2, maxWidth: 540, lineHeight: 1.7, marginTop: 28, animation: "fadeSlideUp 0.7s ease 0.5s both" }}>
        Career-changer. Former sound technician turned software developer. Bilingual (FR/EN), based in Moncton, NB. Building things that work — and sound good.
      </p>
      <div style={{ display: "flex", gap: 16, marginTop: 36, animation: "fadeSlideUp 0.7s ease 0.65s both" }}>
        <a href="#projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 8, background: A, color: "#fff", fontWeight: 600, fontSize: 14, fontFamily: "'DM Sans', sans-serif", textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 0 24px rgba(16,185,129,0.2)" }} onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 32px rgba(16,185,129,0.35)"; }} onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(16,185,129,0.2)"; }}>
          View Projects
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
        <a href="https://github.com/llangis" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 8, background: "transparent", color: T2, fontWeight: 500, fontSize: 14, fontFamily: "'DM Sans', sans-serif", border: "1px solid " + BD, textDecoration: "none", transition: "border-color 0.25s, color 0.25s" }} onMouseOver={e => { e.currentTarget.style.borderColor = A; e.currentTarget.style.color = A; }} onMouseOut={e => { e.currentTarget.style.borderColor = BD; e.currentTarget.style.color = T2; }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </a>
      </div>
    </section>
  );
}

function Label({ text, idx }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: A, fontWeight: 600 }}>{idx}.</span>
      <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, color: T1, margin: 0, letterSpacing: "-0.02em" }}>{text}</h2>
      <div style={{ flex: 1, height: 1, background: BD, marginLeft: 16 }} />
    </div>
  );
}

function About() {
  const [r, v] = useInView();
  return (
    <section id="about" ref={r} style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(2rem, 8vw, 10rem)", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      <Label text="About Me" idx="01" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "clamp(2rem, 4vw, 4rem)", marginTop: 48 }}>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 1.6vw, 1.1rem)", color: T2, lineHeight: 1.75, margin: 0 }}>
            I'm a second-year <strong style={{ color: T1 }}>Software Development</strong> student at NBCC Moncton, graduating June 2026. Before code, I spent years as a <strong style={{ color: T1 }}>sound technician</strong> in Montreal — mixing live shows, recording sessions, and wiring studios.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 1.6vw, 1.1rem)", color: T2, lineHeight: 1.75, marginTop: 20 }}>
            That world taught me to debug under pressure, ship on deadline, and care about the details people don't consciously notice. Now I bring that same energy to building software — from Spring Boot APIs to mobile apps in Swift and Kotlin.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[{ l: "Location", v: "Moncton, NB" }, { l: "Languages", v: "FR / EN" }, { l: "Graduating", v: "June 2026" }, { l: "Looking for", v: "Internship" }].map(x => (
            <div key={x.l} style={{ padding: "20px 24px", borderRadius: 12, background: S1, border: "1px solid " + BD, transition: "border-color 0.3s" }} onMouseOver={e => e.currentTarget.style.borderColor = A} onMouseOut={e => e.currentTarget.style.borderColor = BD}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: A, textTransform: "uppercase", letterSpacing: "0.1em" }}>{x.l}</span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: T1, margin: "8px 0 0", fontWeight: 500 }}>{x.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [r, v] = useInView();
  return (
    <section id="skills" ref={r} style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(2rem, 8vw, 10rem)", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      <Label text="Skills" idx="02" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 24, marginTop: 48 }}>
        {skills.map(g => (
          <div key={g.cat} style={{ padding: "32px 28px", borderRadius: 16, background: S1, border: "1px solid " + BD, transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s" }} onMouseOver={e => { e.currentTarget.style.borderColor = A; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"; }} onMouseOut={e => { e.currentTarget.style.borderColor = BD; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: A, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 20px" }}>{g.cat}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {g.items.map(i => (
                <span key={i} style={{ padding: "6px 14px", borderRadius: 6, background: S2, color: T2, border: "1px solid " + BD, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500 }}>{i}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Card({ p }) {
  const [r, v] = useInView(0.1);
  const [h, setH] = useState(false);
  return (
    <div ref={r} style={{ padding: "36px 32px", borderRadius: 16, background: S1, border: "1px solid " + (h ? p.color : BD), transition: "all 0.4s ease", opacity: v ? 1 : 0, transform: v ? (h ? "translateY(-6px)" : "translateY(0)") : "translateY(30px)", position: "relative", overflow: "hidden", boxShadow: h ? "0 12px 40px rgba(0,0,0,0.3)" : "none" }} onMouseOver={() => setH(true)} onMouseOut={() => setH(false)}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 200, height: 200, background: "radial-gradient(circle, " + p.color + "20 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none", opacity: h ? 1 : 0, transition: "opacity 0.4s" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: p.color + "15", border: "1px solid " + p.color + "35", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16"/></svg>
        </div>
        <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ color: T3, transition: "color 0.25s" }} onMouseOver={e => e.currentTarget.style.color = p.color} onMouseOut={e => e.currentTarget.style.color = T3}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
        </a>
      </div>
      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 600, color: T1, margin: "0 0 12px" }}>{p.title}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: T2, lineHeight: 1.65, margin: "0 0 20px" }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {p.tags.map(t => (
          <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, padding: "4px 10px", borderRadius: 4, background: S2, color: p.color, border: "1px solid " + p.color + "30" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const [r, v] = useInView();
  return (
    <section id="projects" ref={r} style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(2rem, 8vw, 10rem)", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      <Label text="Projects" idx="03" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 24, marginTop: 48 }}>
        {projects.map(p => <Card key={p.title} p={p} />)}
      </div>
    </section>
  );
}

function Footer() {
  const ls = { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: T3, textDecoration: "none", transition: "color 0.25s" };
  return (
    <footer style={{ padding: "48px clamp(2rem, 8vw, 10rem) 40px", borderTop: "1px solid " + BD, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: T3 }}>© 2026 Luc Langis</span>
      <div style={{ display: "flex", gap: 24 }}>
        {[{ n: "GitHub", u: "https://github.com/llangis" }, { n: "LinkedIn", u: "https://linkedin.com/" }, { n: "Email", u: "mailto:luc@example.com" }].map(x => (
          <a key={x.n} href={x.u} target="_blank" rel="noopener noreferrer" style={ls} onMouseOver={e => e.target.style.color = A} onMouseOut={e => e.target.style.color = T3}>{x.n}</a>
        ))}
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: BG }}>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Footer />
    </div>
  );
}
