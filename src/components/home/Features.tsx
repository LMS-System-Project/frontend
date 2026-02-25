"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart2, BrainCircuit, Calendar, Users } from "lucide-react";

// Pexels photos for bento grid
const BENTO_ITEMS = [
  {
    type: "video",
    videoSrc: "https://videos.pexels.com/video-files/3195394/3195394-hd_1280_720_25fps.mp4",
    imgFallback: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&fit=crop",
    title: "AI-Powered Grading",
    desc: "Automated, rubric-aligned grading with instructor override.",
    span: "col-span-2",
    height: "340px",
    bgColor: "#2D3A2E",
    textColor: "#fff",
  },
  {
    type: "icon",
    icon: BarChart2,
    title: "Task Assignment",
    desc: "Easily create, assign, and track tasks to keep everyone aligned and accountable.",
    span: "col-span-1",
    height: "340px",
    bgColor: "#F5F0E6",
    textColor: "#111",
  },
  {
    type: "icon",
    icon: Calendar,
    title: "Real-Time Scheduling",
    desc: "Plan meetings, set deadlines, and sync calendars so your team stays on the same page.",
    span: "col-span-1",
    height: "260px",
    bgColor: "#C8C0B4",
    textColor: "#111",
  },
  {
    type: "photo",
    imgSrc: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&fit=crop",
    title: "Progress Tracking",
    desc: "Visualise team performance with dashboards that highlight what's done and what's next.",
    span: "col-span-2",
    height: "260px",
    bgColor: "#3A5A40",
    textColor: "#fff",
  },
];

function BentoVideoCard({
  videoSrc,
  imgFallback,
  title,
  desc,
  height,
  bgColor,
  textColor,
}: {
  videoSrc: string;
  imgFallback: string;
  title: string;
  desc: string;
  height: string;
  bgColor: string;
  textColor: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        height,
        borderRadius: "20px",
        overflow: "hidden",
        background: bgColor,
        cursor: "default",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setLoaded(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: loaded ? 0.55 : 0,
          transition: "opacity 1s ease",
        }}
        src={videoSrc}
      />
      {!loaded && (
        <img
          src={imgFallback}
          alt={title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
        }}
      />
      <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
        <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "18px", marginBottom: "6px" }}>{title}</h3>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", lineHeight: 1.5, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

export default function Features() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={ref}
      style={{ background: "#FAF8F4", padding: "100px 24px" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Section Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "64px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#111",
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Everything Your Institution Needs to Perform
          </h2>
          <p style={{ fontSize: "15px", color: "#888", lineHeight: 1.7, maxWidth: "460px", margin: "0 auto" }}>
            From AI-driven insights to real-time collaboration, our features are
            built to keep students and educators moving forward — together.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s ease 0.2s",
          }}
          className="bento-grid"
        >
          {/* Row 1: Video card (spans 2) + icon card */}
          <div style={{ gridColumn: "span 2" }}>
            <BentoVideoCard
              videoSrc="https://videos.pexels.com/video-files/3195394/3195394-hd_1280_720_25fps.mp4"
              imgFallback="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&fit=crop"
              title="AI-Powered Grading"
              desc="Automated, rubric-aligned grading with full instructor override and confidence indicators."
              height="340px"
              bgColor="#2D3A2E"
              textColor="#fff"
            />
          </div>

          <div
            style={{
              height: "340px",
              borderRadius: "20px",
              background: "#F0ECE3",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "#111",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BarChart2 size={22} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>
                Task Assignment
              </h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6, margin: 0 }}>
                Easily create, assign, and track coursework to keep every student accountable and on schedule.
              </p>
            </div>
          </div>

          {/* Row 2: Icon card + photo card (spans 2) */}
          <div
            style={{
              height: "260px",
              borderRadius: "20px",
              background: "#C8C0B4",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "#fff",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Calendar size={22} color="#111" />
            </div>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>
                Real-Time Scheduling
              </h3>
              <p style={{ fontSize: "13px", color: "#333", lineHeight: 1.6, margin: 0 }}>
                Plan lectures, set deadlines, and sync academic calendars so everyone stays aligned.
              </p>
            </div>
          </div>

          <div style={{ gridColumn: "span 2", height: "260px", borderRadius: "20px", overflow: "hidden", position: "relative", background: "#3A5A40" }}>
            <img
              src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=900&h=400&fit=crop"
              alt="Progress tracking"
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }} />
            <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "18px", marginBottom: "6px" }}>Progress Tracking</h3>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", lineHeight: 1.5, margin: 0 }}>
                Visualise student performance with dashboards that highlight what's done and what needs attention.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(0,0,0,0.08)",
            marginTop: "80px",
            borderRadius: "20px",
            overflow: "hidden",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.4s",
          }}
          className="stats-grid"
        >
          {[
            { stat: "50,000+", label: "Active Students" },
            { stat: "2,400+", label: "Courses Listed" },
            { stat: "98%", label: "Satisfaction Rate" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: "#FAF8F4",
                padding: "48px 40px",
                textAlign: "center",
              }}
            >
              <p style={{ fontFamily: "var(--font-serif), serif", fontSize: "3rem", fontWeight: 700, color: "#111", margin: "0 0 8px", letterSpacing: "-0.03em" }}>{s.stat}</p>
              <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
