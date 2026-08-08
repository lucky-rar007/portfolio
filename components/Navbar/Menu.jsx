import { useSpring, a } from "@react-spring/web";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Real contact info — kept in sync with `Contact`, `SiteFooter`, and
// `LetsTalk`. Update all four if these ever change.
const EMAIL = "lakshrajsingh1000@gmail.com";
const WHATSAPP_URL = "https://wa.me/918094239121";

// Smoothly scrolls to a section by id. Uses the active Lenis instance
// (exposed by SmoothScroll on `window.__lenis`) when available, so the
// motion is consistent with every other scroll on the site. Falls back to
// the browser's native smooth scrollIntoView if Lenis isn't ready yet
// (e.g. during SSR hydration).
const scrollToSection = (id) => {
  if (typeof window === "undefined") return;
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target == null) return;

  const lenis = window.__lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    return;
  }
  if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Menu = ({ open, onOutsideClick, onClose }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChildClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onOutsideClick(event);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleChildClick);
    return () => {
      document.removeEventListener("click", handleChildClick);
    };
  }, []);

  const [contents, contentsApi] = useSpring(() => ({
    from: { y: 100, opacity: 0, transform: "rotate(20deg)" },
  }));

  const [news, newsApi] = useSpring(() => ({
    from: { y: 100, opacity: 0, transform: "rotate(-20deg)" },
  }));
  const [hidden, setHidden] = useState(true);
  useEffect(() => {

    if (open == false) {
      setTimeout(() => {
        setHidden(false);
      }
        , 500);
    } else {
      setHidden(true)
    }

    contentsApi.start({
      y: open ? 0 : 100,
      opacity: open ? 1 : 0,
      transform: open ? `rotate(0deg)` : `rotate(20deg)`,
    });

    newsApi.start({
      y: open ? 0 : 100,
      opacity: open ? 1 : 0,
      transform: open ? `rotate(0deg)` : `rotate(-20deg)`,
    });

  }, [open]);

  // Every entry maps to a real section that already exists on the home
  // page. The site is single-page, so these never navigate — they smooth
  // scroll the user to the matching anchor through Lenis.
  //
  // `target: "top"` is a sentinel for "scroll to the very top of the
  // document" (the hero) since the hero owns the first viewport without
  // needing a separate offset.
  const navItems = [
    { label: "HOME", target: "top" },
    { label: "ABOUT", target: "about" },
    { label: "WORK", target: "projects-section" },
    { label: "CONTACT", target: "contact-section" },
  ];

  const handleNavClick = (e, target) => {
    e.preventDefault();
    scrollToSection(target);
    if (typeof onClose === "function") onClose();
  };

  return (
    <>
      {/* Full-screen backdrop blur mounted at body root so it covers 100vw x 100vh */}
      {mounted && open && createPortal(
        <div
          className="menu-backdrop"
          onClick={onClose}
        />,
        document.body
      )}

      {hidden && (
        <div
          className="absolute top-[4.5rem] right-0 w-[21rem] z-50 p-2"
          ref={ref}
        >
          {/* Site navigation — smooth scroll, blurred theme backdrop card */}
          <a.div
            className="menu-card font-Aeonik text-3xl"
            style={contents}
          >
            {navItems.map((item, i) => (
              <a
                key={item.target}
                href={item.target === "top" ? "#" : `#${item.target}`}
                onClick={(e) => handleNavClick(e, item.target)}
                className={`flex items-center justify-between transition-colors duration-200 hover:text-brblue cursor-pointer ${i === 0 ? "pb-3" : i === navItems.length - 1 ? "pt-3" : "py-3"
                  }`}
              >
                <span>{item.label}</span>
                <span className="text-fg-muted">•</span>
              </a>
            ))}
          </a.div>

          {/* Get in touch section card */}
          <a.div
            className="menu-card my-3"
            style={news}
          >
            <div className="font-Aeonik text-3xl leading-tight">
              Got an idea?
              <br />
              Let&apos;s talk.
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => {
                  if (onClose) onClose();
                  setTimeout(() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`, "_blank"), 150);
                }}
                className="flex items-center justify-between bg-fg text-bg rounded-2xl px-4 py-3 text-sm tracking-widest font-semibold transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span>EMAIL</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => onClose && onClose()}
                className="flex items-center justify-between border-2 border-fg text-fg rounded-2xl px-4 py-3 text-sm tracking-widest font-semibold transition-colors duration-200 hover:bg-accent-soft"
              >
                <span>WHATSAPP</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </a.div>
        </div>
      )}
    </>
  );
};

export default Menu;
