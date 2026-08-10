"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: "founder-buddy",
    name: "Founder Buddy — AI Executive Intelligence & Risk Analytics",
    href: "https://github.com/lucky-rar007/founder-buddy",
    kind: "GitHub",
    badge: "AI & Risk Analytics Platform",
    role: "Python 3.13 • FastAPI • Gemini AI • MS Graph API • ChromaDB • Docker",
    note: "Enterprise AI assistant ingesting MS Teams & Outlook, normalizing multi-channel threads, detecting dragging risks via time-decay, and powering RAG executive Q&A.",
    summary: "Founder Buddy is an enterprise-grade AI intelligence assistant that automatically ingests cross-platform communications (Microsoft Teams & Outlook), cleans and normalizes multi-channel message threads, extracts operational risks and blockers using Gemini AI, detects slow-burning 'dragging issues' via a time-decay algorithm, and provides daily executive briefings and a RAG-powered interactive Q&A chatbot with full source citations.",
    techStack: {
      "Backend Framework": "Python 3.13, FastAPI, Uvicorn, APScheduler",
      "Database & Storage": "SQLite (WAL Mode, Single Source of Truth), ChromaDB (Vector Store)",
      "AI / Machine Learning": "Google Gemini (gemini-2.5-flash-lite, text-embedding-004), ONNX Runtime (Local noise classifier)",
      "Data Ingestion": "Microsoft Graph API (OAuth2 App-Only flow for Teams & Outlook)",
      "Security & Privacy": "AES-256 Fernet Encryption, Automated PII Scrubbing, BeautifulSoup HTML sanitizer",
      "Frontend & DevOps": "Vanilla JS (ES6+ SPA), Glassmorphism CSS, Docker, Docker Compose, Render"
    },
    features: [
      {
        title: "Omnichannel Communication Ingestion",
        description: "Connects directly to Microsoft Graph API to pull Teams channel messages, group chats, and Outlook emails with exponential backoff, auto-token renewal, and rate-limiting resilience."
      },
      {
        title: "Smart Thread Normalization & Privacy Pipeline",
        description: "Strips non-human artifacts (base64 images, attachment wrappers, bot notifications), scrubs PII (API keys, JWT tokens, credit cards, passwords, SSNs), and pre-classifies noise vs. operational chatter using a local lightweight ONNX ML model."
      },
      {
        title: "Multi-Stage Risk Analytics & Time-Decay Engine",
        description: "Extracts blockers, decisions, quality risks, and security issues from raw thread text. Applies a mathematical exponential time-decay algorithm (decay.py) and Levenshtein signal deduplication to highlight unblocked, unresolved dragging problems."
      },
      {
        title: "RAG-Powered Conversational Search & Executive Briefings",
        description: "Chunks thread data and embeds vectors in ChromaDB via text-embedding-004. Enables natural language RAG Q&A over team conversations with exact source thread citations and automatically generates Daily, Weekly, and Monthly executive briefings."
      },
      {
        title: "Security & Zero-Config Architecture",
        description: "Encrypts API keys and secrets at rest using AES-256 Fernet encryption and auto-migrates configuration into an encrypted SQLite database on first launch."
      }
    ],
    highlights: [
      "Architected an End-to-End AI Workspace Assistant: Designed and implemented an asynchronous FastAPI & SQLite web platform that ingests, cleans, and analyzes enterprise communication from MS Teams and Outlook.",
      "Engineered Multi-Stage AI & RAG Pipeline: Built a hybrid analytics pipeline combining Gemini LLM event extraction, custom Levenshtein string clustering, and ChromaDB vector search with Gemini embeddings (text-embedding-004).",
      "Implemented Proprietary Dragging Issue Algorithm: Developed a mathematical time-decay scoring model that tracks issue persistence across ingestion runs to identify high-impact, stagnant organizational blockers.",
      "Enforced Enterprise Privacy & Data Sanitization: Created automated BeautifulSoup regex parsers to strip attachments, remove HTML noise, and redact PII (JWTs, API keys, credentials) before cloud LLM inference.",
      "Built Resilient OAuth2 Integration: Integrated Microsoft Graph API using OAuth2 Client Credentials with custom rate-limiting, exponential backoff, and state checkpointing.",
      "Crafted High-Performance SPA Frontend: Developed a lightweight SPA using Vanilla JS and CSS tokens with interactive onboarding wizards, real-time analytics dashboards, and interactive chat interfaces."
    ],
    skills: ["Python 3.13", "FastAPI", "Google Gemini AI", "ChromaDB", "MS Graph API", "ONNX Runtime", "RAG Systems", "AES-256 Encryption", "Docker", "SQLite"]
  },
  {
    id: "apex-sentiment",
    name: "Apex Institutional Sentiment Engine",
    href: "https://apex-institutional-sentiment-engine.onrender.com",
    kind: "Live Demo",
    badge: "Financial Intelligence Platform",
    role: "Python • FastAPI • SQLite • Gemini • Web Scraping",
    note: "Financial intelligence platform transforming raw financial news into structured institutional market signals.",
    summary: "Apex Institutional Sentiment Engine is a quantitative market intelligence platform that parses real-time financial news, press releases, and macroeconomic feeds, transforming unstructured text into actionable institutional market sentiment signals using LLMs and automated data pipelines.",
    techStack: {
      "Backend": "Python, FastAPI, SQLite, BeautifulSoup, Scrapy",
      "AI & Data": "Google Gemini API, Sentiment Scoring Algorithms, Custom Data Normalization",
      "Deployment": "Render, Docker"
    },
    highlights: [
      "Built web scraping and news ingestion pipelines aggregating financial news from major market outlets.",
      "Engineered financial sentiment analysis pipelines utilizing Gemini LLM structured outputs.",
      "Created RESTful FastAPI endpoints providing real-time sentiment scores and market trend indicators."
    ],
    skills: ["Python", "FastAPI", "SQLite", "Google Gemini API", "Web Scraping", "Financial Analytics"]
  },
  {
    id: "rag-demo",
    name: "RAG-Based Semantic Search Assistant",
    href: "https://github.com/lucky-rar007/rag_demo_project",
    kind: "GitHub",
    badge: "Local RAG Architecture",
    role: "Python • FastAPI • ChromaDB • Ollama • LLaMA 3",
    note: "Retrieval-Augmented Generation (RAG) application enabling semantic search across private document collections.",
    summary: "High-performance RAG demonstration system enabling private, local semantic search and interactive Q&A across multi-format document repositories using Ollama local models and ChromaDB vector embeddings.",
    techStack: {
      "Core Framework": "Python, FastAPI",
      "Vector Storage & Embeddings": "ChromaDB, Local Vector Embeddings",
      "LLM Integration": "Ollama, LLaMA 3"
    },
    highlights: [
      "Developed local RAG pipeline ensuring zero data leakage to external APIs.",
      "Implemented document chunking and vector index optimization for sub-second retrieval speeds.",
      "Built conversational interface with source citation back-links."
    ],
    skills: ["Python", "FastAPI", "ChromaDB", "Ollama", "LLaMA 3", "RAG Architecture"]
  },
];

const EXPERIENCES = [
  {
    id: "frazor",
    company: "Frazor Enterprise Solutions LLP",
    title: "Software Development Intern (AI & Risk Analytics)",
    period: "Jun 2026 – Aug 2026",
    location: "Udaipur, Rajasthan, India",
    badge: "Founder Buddy AI Platform",
    summary: "Engineered Founder Buddy — an enterprise-grade AI Executive Intelligence & Risk Analytics platform. Built asynchronous FastAPI & SQLite data pipelines ingesting MS Teams and Outlook, multi-stage RAG vector search, PII privacy scrubbing, and proprietary time-decay risk analytics.",
    techStack: {
      "Backend Framework": "Python 3.13, FastAPI, Uvicorn, APScheduler",
      "Database & Storage": "SQLite (WAL Mode, Single Source of Truth), ChromaDB (Vector Store)",
      "AI / Machine Learning": "Google Gemini (gemini-2.5-flash-lite, text-embedding-004), ONNX Runtime (Local noise classifier)",
      "Data Ingestion": "Microsoft Graph API (OAuth2 App-Only flow for Teams & Outlook)",
      "Security & Privacy": "AES-256 Fernet Encryption, Automated PII Scrubbing, BeautifulSoup HTML sanitizer",
      "Frontend & DevOps": "Vanilla JS (ES6+ SPA), Glassmorphism CSS, Docker, Docker Compose, Render"
    },
    features: [
      {
        title: "Omnichannel Communication Ingestion",
        description: "Connected directly to Microsoft Graph API to pull Teams channel messages, group chats, and Outlook emails with exponential backoff, auto-token renewal, and rate-limiting resilience."
      },
      {
        title: "Smart Thread Normalization & Privacy Pipeline",
        description: "Stripped non-human artifacts (base64 images, attachment wrappers, bot notifications), scrubbed PII (API keys, JWT tokens, credit cards, passwords, SSNs), and pre-classified noise vs. operational chatter using a local lightweight ONNX ML model."
      },
      {
        title: "Multi-Stage Risk Analytics & Time-Decay Engine",
        description: "Extracted blockers, decisions, quality risks, and security issues from raw thread text. Applied a mathematical exponential time-decay algorithm (decay.py) and Levenshtein signal deduplication to highlight unblocked, unresolved dragging problems."
      },
      {
        title: "RAG-Powered Conversational Search & Executive Briefings",
        description: "Chunked thread data and embedded vectors in ChromaDB via text-embedding-004. Enabled natural language RAG Q&A over team conversations with exact source thread citations and generated Daily, Weekly, and Monthly executive briefings."
      }
    ],
    highlights: [
      "Architected Founder Buddy, an enterprise AI executive assistant using FastAPI, ChromaDB, Gemini AI, and Microsoft Graph API to synthesize multi-channel Teams & Outlook communications into actionable risk analytics.",
      "Engineered Multi-Stage AI & RAG Pipeline combining Gemini LLM event extraction, Levenshtein signal deduplication, and ChromaDB vector search with Gemini embeddings (text-embedding-004).",
      "Implemented Proprietary Dragging Issue Algorithm developing a mathematical time-decay scoring model (decay.py) that tracks issue persistence across ingestion runs to identify high-impact organizational blockers.",
      "Enforced Enterprise Privacy & Data Sanitization creating automated BeautifulSoup regex parsers to strip attachments, remove HTML noise, and redact PII (JWTs, API keys, credentials) before cloud LLM inference.",
      "Built Resilient OAuth2 Integration connecting Microsoft Graph API using Client Credentials with custom rate-limiting, exponential backoff, and state checkpointing."
    ],
    skills: ["Python 3.13", "FastAPI", "Google Gemini AI", "ChromaDB", "MS Graph API", "ONNX Runtime", "RAG Systems", "AES-256 Encryption", "Docker", "SQLite"]
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
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="pointer-events-none"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const DetailModal = ({ item, onClose }) => {
  useEffect(() => {
    // Disable background Lenis smooth scrolling when modal opens
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.stop();
    }
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = origOverflow;
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [onClose]);

  if (!item) return null;

  const isProject = !item.company;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[200000] flex items-center justify-center p-3 sm:p-6"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl shadow-2xl transition-colors duration-300 border border-[var(--color-border)] bg-[var(--color-bg-alt)] text-[var(--color-text)] overscroll-contain flex flex-col"
        >
          {/* Header Bar */}
          <div className="sticky top-0 bg-[var(--color-bg-alt)]/95 backdrop-blur-md z-40 px-6 sm:px-8 py-5 border-b border-[var(--color-border)] flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-[10px] font-mono tracking-widest text-[var(--color-accent)] bg-[var(--color-accent-soft)] px-2.5 py-0.5 rounded-full uppercase border border-[var(--color-border)] font-semibold">
                  {item.badge || (isProject ? "Project" : "Experience")}
                </span>
                {item.period && (
                  <span className="text-[11px] text-[var(--color-text-muted)] font-mono">{item.period}</span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold mt-1.5 text-[var(--color-text)] tracking-tight">
                {item.name || item.company}
              </h3>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close modal"
              className="w-9 h-9 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-white transition-all border border-[var(--color-border)] flex items-center justify-center cursor-pointer flex-shrink-0 shadow-sm"
              title="Close (Esc)"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Role / Tech Summary Tagline */}
            {item.role && (
              <p className="text-xs sm:text-sm font-medium text-[var(--color-accent)] font-mono">
                {item.role}
              </p>
            )}

            {/* Overview */}
            <div>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--color-text)] opacity-90">
                {item.summary || item.note}
              </p>
            </div>

            {/* Key Features & Architecture */}
            {item.features && item.features.length > 0 && (
              <div className="pt-2 border-t border-[var(--color-border)]">
                <h4 className="text-[11px] uppercase tracking-widest font-mono text-[var(--color-text-subtle)] mb-3 font-bold">
                  KEY FEATURES &amp; ARCHITECTURE
                </h4>
                <div className="space-y-3">
                  {item.features.map((feat, i) => (
                    <div key={i} className="text-xs sm:text-sm">
                      <span className="font-bold text-[var(--color-text)] block">▸ {feat.title}</span>
                      <span className="text-[var(--color-text)] opacity-80 leading-relaxed block mt-0.5 pl-3">{feat.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {item.highlights && item.highlights.length > 0 && (
              <div className="pt-2 border-t border-[var(--color-border)]">
                <h4 className="text-[11px] uppercase tracking-widest font-mono text-[var(--color-text-subtle)] mb-3 font-bold">
                  HIGHLIGHTS &amp; IMPACT
                </h4>
                <ul className="space-y-2">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-text)] opacity-85 leading-relaxed">
                      <span className="text-[var(--color-accent)] mt-0.5 select-none font-bold">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills / Tech Tags */}
            {item.skills && item.skills.length > 0 && (
              <div className="pt-2 border-t border-[var(--color-border)]">
                <h4 className="text-[11px] uppercase tracking-widest font-mono text-[var(--color-text-subtle)] mb-2.5 font-bold">
                  TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono font-medium bg-[var(--color-accent-soft)] border border-[var(--color-border)] text-[var(--color-text)] px-2.5 py-1 rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="mt-8 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                OPEN {item.kind || "LINK"} ↗
              </a>
            ) : <div />}
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-text)] border border-[var(--color-border)] font-semibold text-xs tracking-wider uppercase hover:opacity-80 transition-opacity"
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
  return (
    <li className="pj-row">
      <div className="pj-link cursor-pointer" onClick={onClick}>
        <span className="pj-num">{String(index + 1).padStart(2, "0")}</span>
        <div className="pj-meta">
          <span className="pj-name">{item.name || item.company}</span>
          <span className="pj-role">
            {item.role || `${item.title} (${item.period})`}
          </span>
          {item.note && <span className="pj-note">{item.note}</span>}
          {item.summary && !item.note && <span className="pj-note">{item.summary}</span>}
        </div>
        <span className="pj-kind">{item.kind || item.location?.split(",")[0]}</span>
        <div className="flex items-center gap-2">
          {item.href && (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="pj-arrow hover:opacity-80 transition-opacity p-1.5 bg-white/5 border border-white/10 rounded-full flex items-center justify-center w-8 h-8"
              title="Open Link"
            >
              <ArrowIcon />
            </a>
          )}
          <button
            onClick={onClick}
            className="text-[11px] font-mono text-brblue font-bold px-2.5 py-1 bg-brblue/10 border border-brblue/20 rounded-md hover:bg-brblue/20 transition-colors whitespace-nowrap"
          >
            INFO ↗
          </button>
        </div>
      </div>
    </li>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);

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
            <Row key={p.id || p.name} item={p} index={i} onClick={() => setSelectedItem(p)} />
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
              onClick={() => setSelectedItem(v)}
            />
          ))}
        </ul>
      </section>

      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
};

export default Projects;
