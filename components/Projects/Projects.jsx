"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    name: "Founder Buddy — AI Executive Assistant",
    href: "https://github.com/lucky-rar007/founder-buddy",
    kind: "GitHub",
    role: "FastAPI • MS Graph API • ChromaDB • Outlook • Teams",
    note: "AI assistant delivering daily executive intelligence, signal processing, and semantic search.",
  },
  {
    name: "Apex Institutional Sentiment Engine",
    href: "https://apex-institutional-sentiment-engine.onrender.com",
    kind: "Live Demo",
    role: "Python • FastAPI • SQLite • Gemini • Web Scraping",
    note: "Financial intelligence platform transforming raw financial news into structured institutional market signals.",
  },
  {
    name: "RAG-Based Semantic Search Assistant",
    href: "https://github.com/lucky-rar007/rag_demo_project",
    kind: "GitHub",
    role: "Python • FastAPI • ChromaDB • Ollama • LLaMA 3",
    note: "Retrieval-Augmented Generation (RAG) application enabling semantic search across private document collections.",
  },
];

const EXPERIENCES = [
  {
    id: "frazor",
    company: "Frazor Enterprise Solutions LLP",
    title: "Software Development Intern",
    period: "Jun 2026 – Aug 2026",
    location: "Udaipur, Rajasthan, India",
    badge: "AI & Data Pipelines",
    summary: "Engineered Founder Buddy AI assistant, Event-Signal pipelines, UUID lineage tracking, and ChromaDB RAG.",
    highlights: [
      "Engineered Founder Buddy, an AI executive assistant using FastAPI, ChromaDB, and Microsoft Graph API to synthesize daily emails, calendar events, and Teams messages into actionable intelligence.",
      "Implemented Event-Signal processing pipelines for automatic extraction of business signals from structured and unstructured data feeds.",
      "Built UUID lineage tracking across data transformations to ensure end-to-end auditability and compliance.",
      "Integrated ChromaDB RAG vector search enabling instant semantic document querying with context-aware responses."
    ],
    skills: ["Python", "FastAPI", "ChromaDB", "MS Graph API", "RAG Systems", "PostgreSQL", "UUID Lineage", "Docker"]
  },
  {
    id: "internshala",
    company: "Internshala Trainings",
    title: "Python Developer Intern",
    period: "Apr 2025 – Jun 2025",
    location: "Remote",
    badge: "Python & Analytics",
    summary: "Built desktop Fantasy Cricket recommendation engine & mathematical player evaluation pipeline.",
    highlights: [
      "Built desktop Fantasy Cricket recommendation engine using Python and Tkinter for statistical player evaluation.",
      "Implemented mathematical scoring models analyzing historical player performance, match conditions, and opposition metrics to generate optimal team lineups.",
      "Applied object-oriented design principles and modular clean code practices to deliver an intuitive GUI desktop application."
    ],
    skills: ["Python", "Tkinter", "Mathematical Scoring Models", "Object-Oriented Programming", "Player Analytics"]
  },
  {
    id: "mate",
    company: "MATE",
    title: "Android Development Intern",
    period: "Nov 2024",
    location: "Udaipur, Rajasthan, India",
    badge: "Mobile Apps",
    summary: "Developed Flutter-based Android application featuring multi-screen navigation and complete CRUD task workflows.",
    highlights: [
      "Developed Android application features using Flutter and Dart, implementing responsive multi-screen layouts.",
      "Integrated state management patterns and RESTful API endpoints for seamless client-server data synchronization.",
      "Built full CRUD workflows for task and resource management with offline-first local persistence."
    ],
    skills: ["Flutter", "Dart", "Android Studio", "REST APIs", "State Management", "Git"]
  }
];

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ExperienceModal = ({ exp, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!exp) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-2xl bg-neutral-900/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-fg"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-mono tracking-widest text-brblue bg-brblue/10 px-3 py-1 rounded-full uppercase border border-brblue/20">
                  {exp.badge}
                </span>
                <span className="text-xs text-fg-muted font-mono">{exp.period}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mt-2 text-fg tracking-tight">
                {exp.company}
              </h3>
              <p className="text-sm font-semibold text-brblue mt-1">
                {exp.title} • <span className="text-fg-muted font-normal">{exp.location}</span>
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-fg transition-colors"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Body */}
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-mono text-fg-muted mb-2">
                OVERVIEW
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-fg/90">
                {exp.summary}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-mono text-fg-muted mb-3">
                KEY RESPONSIBILITIES &amp; ACHIEVEMENTS
              </h4>
              <ul className="space-y-2.5">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-fg/80 leading-normal">
                    <span className="text-brblue mt-1 select-none">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-mono text-fg-muted mb-3">
                TECHNOLOGIES &amp; SKILLS
              </h4>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium bg-white/5 border border-white/10 text-fg/90 px-3 py-1.5 rounded-xl"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-brblue text-white font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              CLOSE DETAILS
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const Row = ({ item, index, onClick }) => {
  const hasLink = Boolean(item.href);
  const Wrapper = hasLink ? "a" : "div";
  const wrapperProps = hasLink
    ? { href: item.href, target: "_blank", rel: "noreferrer" }
    : { onClick, style: { cursor: "pointer" } };

  return (
    <li className="pj-row">
      <Wrapper
        className={`pj-link${hasLink ? "" : " pj-link--static"}`}
        {...wrapperProps}
      >
        <span className="pj-num">{String(index + 1).padStart(2, "0")}</span>
        <div className="pj-meta">
          <span className="pj-name">{item.name || item.company}</span>
          <span className="pj-role">
            {item.role || `${item.title} (${item.period})`}
          </span>
          {item.note && <span className="pj-note">{item.note}</span>}
          {item.summary && <span className="pj-note">{item.summary}</span>}
        </div>
        <span className="pj-kind">{item.kind || item.location?.split(",")[0]}</span>
        <span className="pj-arrow" aria-hidden="true">
          {hasLink ? <ArrowIcon /> : <span className="text-xs font-mono text-brblue font-bold">INFO ↗</span>}
        </span>
      </Wrapper>
    </li>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const [selectedExp, setSelectedExp] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = sectionRef.current.querySelectorAll(".pj-row");
      gsap.from(rows, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const titles = sectionRef.current.querySelectorAll(".pj-title");
      gsap.from(titles, {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="projects-section" ref={sectionRef}>
        <div className="pj-head">
          <span className="pj-label">PROJECTS</span>
          <h2 className="pj-title">selected work</h2>
        </div>

        <ul className="pj-list">
          {PROJECTS.map((p, i) => (
            <Row key={p.name} item={p} index={i} />
          ))}
        </ul>

        <div id="ventures" className="pj-head pj-head--secondary">
          <span className="pj-label">EXPERIENCE</span>
          <h2 className="pj-title">work experience</h2>
        </div>

        <ul className="pj-list">
          {EXPERIENCES.map((v, i) => (
            <Row
              key={v.id}
              item={v}
              index={i}
              onClick={() => setSelectedExp(v)}
            />
          ))}
        </ul>
      </section>

      {selectedExp && (
        <ExperienceModal exp={selectedExp} onClose={() => setSelectedExp(null)} />
      )}
    </>
  );
};

export default Projects;
