"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PLANS = [
  {
    name: "Starter",
    subtitle: "Perfect for small institutions",
    price: "$0",
    period: "/month",
    features: [
      "Up to 3 courses",
      "Basic analytics",
      "Progress tracking",
      "AI Insights (Limited)",
    ],
    cta: "Get Started",
    ctaHref: "/login?mode=register",
    highlight: false,
    bg: "#F0ECE3",
    textColor: "#111",
  },
  {
    name: "Pro",
    subtitle: "For growing universities",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited courses",
      "Advanced AI analytics",
      "Career intelligence",
      "Priority support",
    ],
    cta: "Start Free Trial",
    ctaHref: "/login?mode=register",
    highlight: true,
    bg: "#111",
    textColor: "#fff",
  },
  {
    name: "Enterprise",
    subtitle: "For large organisations",
    price: "Custom",
    period: "",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    ctaHref: "#",
    highlight: false,
    bg: "#C8C0B4",
    textColor: "#111",
  },
];

export default function Pricing() {
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
      id="pricing"
      ref={ref}
      style={{ background: "#FAF8F4", padding: "100px 24px" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
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
              color: "#111",
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
            }}
          >
            Simple, Transparent Pricing
          </h2>
          <p style={{ fontSize: "15px", color: "#888", lineHeight: 1.7, maxWidth: "420px", margin: "0 auto" }}>
            Start free and scale as your institution grows. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s ease 0.15s",
          }}
          className="pricing-grid"
        >
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: plan.bg,
                borderRadius: "20px",
                padding: "40px 36px",
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                position: "relative",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
            >
              {plan.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: "#B8972E",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: "100px",
                    letterSpacing: "0.05em",
                  }}
                >
                  POPULAR
                </div>
              )}

              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: plan.textColor, marginBottom: "4px" }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: "13px", color: plan.highlight ? "rgba(255,255,255,0.6)" : "#888", margin: 0 }}>
                  {plan.subtitle}
                </p>
              </div>

              <div>
                <span
                  style={{
                    fontFamily: "var(--font-serif), serif",
                    fontSize: "3.5rem",
                    fontWeight: 700,
                    color: plan.textColor,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontSize: "14px", color: plan.highlight ? "rgba(255,255,255,0.5)" : "#888" }}>
                    {plan.period}
                  </span>
                )}
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: plan.textColor }}>
                    <Check
                      size={15}
                      style={{
                        flexShrink: 0,
                        color: plan.highlight ? "#B8972E" : "#3A5A40",
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "14px",
                  borderRadius: "100px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  background: plan.highlight ? "#B8972E" : "transparent",
                  color: plan.highlight ? "#fff" : plan.textColor,
                  border: plan.highlight ? "none" : `1.5px solid ${plan.textColor === "#fff" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"}`,
                  transition: "all 0.2s",
                  marginTop: "auto",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  if (plan.highlight) { el.style.background = "#a07c22"; }
                  else { el.style.background = plan.textColor === "#fff" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"; }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = plan.highlight ? "#B8972E" : "transparent";
                }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
