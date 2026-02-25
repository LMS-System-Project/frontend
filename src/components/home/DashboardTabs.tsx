"use client";

import { useState, useEffect, useRef } from "react";
import { GraduationCap, BookOpen, ShieldCheck } from "lucide-react";

const ROLES = [
  {
    key: "student",
    label: "Student",
    icon: GraduationCap,
    heroImg: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop",
    headline: "Your academic journey, intelligently guided.",
    points: [
      "Personalised CGPA trend charts and subject performance radar",
      "AI career path recommendations aligned with your strengths",
      "Smart assignment tracker with AI feedback before submission",
    ],
  },
  {
    key: "instructor",
    label: "Teacher",
    icon: BookOpen,
    heroImg: "https://images.pexels.com/photos/4144101/pexels-photo-4144101.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop",
    headline: "Grade smarter with AI-assisted tools.",
    points: [
      "AI grading with rubric alignment and confidence scores",
      "Per-student performance insights and early risk flags",
      "Course analytics with drop-off and engagement metrics",
    ],
  },
  {
    key: "admin",
    label: "Admin",
    icon: ShieldCheck,
    heroImg: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop",
    headline: "University-wide intelligence at a glance.",
    points: [
      "Department GPA comparison and student at-risk heatmap",
      "Batch export of reports in CSV, XLSX, or PDF",
      "AI anomaly detection and academic fraud alerts",
    ],
  },
];

export default function DashboardTabs() {
  const [active, setActive] = useState("student");
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const current = ROLES.find((r) => r.key === active)!;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    setImgLoaded(false);
  }, [active]);

  return (
    <section
      id="dashboards"
      ref={ref}
      style={{ background: "#F0ECE3", padding: "100px 24px" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "56px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "all 0.8s ease",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              color: "#111",
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
            }}
          >
            Proven Results, Real Impact
          </h2>
          <p style={{ fontSize: "15px", color: "#888", lineHeight: 1.7, maxWidth: "420px", margin: "0 auto" }}>
            See how institutions are working faster, collaborating better, and getting more done with GradeFlow.
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "48px",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.15s",
          }}
        >
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isActive = active === role.key;
            return (
              <button
                key={role.key}
                onClick={() => setActive(role.key)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 22px",
                  borderRadius: "100px",
                  border: "1.5px solid",
                  borderColor: isActive ? "#111" : "rgba(0,0,0,0.15)",
                  background: isActive ? "#111" : "transparent",
                  color: isActive ? "#fff" : "#555",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <Icon size={15} />
                {role.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.2s",
          }}
          className="dashboard-grid"
        >
          {/* Left: photo */}
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "4/3",
              position: "relative",
              background: "#C8C0B4",
            }}
          >
            <img
              key={current.key}
              src={current.heroImg}
              alt={current.label}
              onLoad={() => setImgLoaded(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: imgLoaded ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            />
          </div>

          {/* Right: text */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                fontWeight: 700,
                color: "#111",
                letterSpacing: "-0.02em",
                margin: "0 0 28px",
                lineHeight: 1.2,
              }}
            >
              {current.headline}
            </h3>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: "18px" }}>
              {current.points.map((point, i) => (
                <li key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "#111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social proof photos strip */}
        <div
          style={{
            marginTop: "80px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.4s",
          }}
          className="proof-grid"
        >
          {[
            "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=700&h=450&fit=crop",
            "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=700&h=450&fit=crop",
            "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=700&h=450&fit=crop",
          ].map((src, i) => (
            <div key={i} style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "3/2" }}>
              <img src={src} alt="Campus life" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
