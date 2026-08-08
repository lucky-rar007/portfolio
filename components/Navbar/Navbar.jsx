"use client";

import React, { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { Trail } from "./TrailText";

import LetsTalk from "./LetsTalk";
import MenuButton from "./MenuButton";
import Link from "next/link";
import MusicButton from "./MusicButton";

// Shared contact targets — same as Menu/Contact/SiteFooter.
const EMAIL = "lakshrajsingh1000@gmail.com";
const WHATSAPP_URL = "https://wa.me/918094239121";

// Smooth-scroll to an in-page section. Uses the global Lenis instance
// exposed by SmoothScroll (window.__lenis) so mobile nav clicks feel
// identical to any other scroll on the site, and falls back to native
// scrollIntoView when Lenis isn't ready yet.
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

const MOBILE_NAV_ITEMS = [
  { label: "HOME", target: "top" },
  { label: "ABOUT", target: "about" },
  { label: "WORK", target: "projects-section" },
  { label: "CONTACT", target: "contact-section" },
];

function Navbar() {
  const [rotate, setRotate] = useSpring(() => ({
    transform: `rotate(0deg)`,
    config: { tension: 300, friction: 20, mass: 1 },
  }));

  const [open, set] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    set(true);
  }, []);

  // Lock body scroll while the mobile menu is open so the user doesn't
  // accidentally scroll the page behind the overlay.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const handleMobileNav = (e, target) => {
    e.preventDefault();
    setMobileOpen(false);
    setRotate({ transform: "rotate(0deg)" });
    // Give the overlay a frame to close before scrolling so the user
    // sees the motion rather than a jumpy pre-scroll flash.
    setTimeout(() => scrollToSection(target), 50);
  };

  return (
    <>
      {/* Navbar small screen */}
      {/* z-[100001] keeps the navbar on top of every other layer.
          backdrop-blur-md and bg-bg/85 ensure content behind the header bar
          doesn't collide or overlap awkwardly on mobile scroll. */}
      <div className="fixed top-0 left-0 z-[100001] w-full py-3 px-4 lg:hidden backdrop-blur-md bg-bg/85 border-b border-black/5 dark:border-white/10 transition-colors duration-300">
        <div className="flex items-center justify-between w-full font-extrabold">
          <Link
            href="/"
            aria-label="Home"
            onClick={(e) => handleMobileNav(e, "top")}
            className="tracking-wider font-semibold text-sm sm:text-base cursor-pointer text-fg truncate max-w-[55vw]"
            style={{ letterSpacing: "-0.01em" }}
          >
            LAKSHRAJ SINGH CHUNDAWAT
          </Link>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Theme Switcher Button for Mobile */}
            <MusicButton />
            
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="nav_btn_sm flex items-center justify-center cursor-pointer"
              onMouseEnter={() => !mobileOpen && setRotate({ transform: "rotate(90deg)" })}
              onMouseLeave={() => !mobileOpen && setRotate({ transform: "rotate(0deg)" })}
              onClick={() => {
                const next = !mobileOpen;
                setMobileOpen(next);
                setRotate({ transform: next ? "rotate(45deg)" : "rotate(0deg)" });
              }}
            >
              <animated.div className="text-[0.55rem] leading-none" style={rotate}>
                {mobileOpen ? "✕" : "⬤ ⬤"}
              </animated.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay — only rendered on small screens.
          Uses theme-aware backdrop blur so background content blurs out softly
          in both light and dark modes while menu cards float sharp on top. */}
      <div
        className={`fixed inset-0 z-[100000] lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop blur overlay */}
        <div
          className="fixed inset-0 bg-white/65 dark:bg-black/75 backdrop-blur-2xl transition-colors duration-300"
          onClick={() => {
            setMobileOpen(false);
            setRotate({ transform: "rotate(0deg)" });
          }}
        />
        {/* Menu cards container — z-[100002] ensures cards sit sharp above blur */}
        <div className="relative z-[100002] h-full w-full flex flex-col pt-24 pb-8 px-5 overflow-y-auto">
          <nav className="flex flex-col gap-1 rounded-3xl bg-white/90 dark:bg-neutral-900/90 text-fg border border-black/10 dark:border-white/15 p-6 shadow-2xl backdrop-blur-md">
            {MOBILE_NAV_ITEMS.map((item, i) => (
              <a
                key={item.target}
                href={item.target === "top" ? "#" : `#${item.target}`}
                onClick={(e) => handleMobileNav(e, item.target)}
                className="flex items-center justify-between py-4 border-b border-black/10 dark:border-white/10 text-fg text-2xl font-bold transition-colors duration-200 hover:text-brblue cursor-pointer"
                style={{
                  letterSpacing: "-0.02em",
                  transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: mobileOpen ? 1 : 0,
                  transition: `transform 0.4s ease ${0.05 + i * 0.05}s, opacity 0.4s ease ${
                    0.05 + i * 0.05
                  }s, color 0.2s ease`,
                }}
              >
                <span>{item.label}</span>
                <span className="text-fg-muted text-sm font-mono">•</span>
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 flex flex-col gap-3 rounded-3xl bg-white/90 dark:bg-neutral-900/90 text-fg border border-black/10 dark:border-white/15 p-6 shadow-2xl backdrop-blur-md">
            <p className="text-fg-muted text-xs tracking-[0.2em] uppercase font-semibold">Get in touch</p>
            <a
              href={`mailto:${EMAIL}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between bg-fg text-bg rounded-2xl px-5 py-4 text-sm tracking-[0.2em] font-semibold transition-transform duration-200 hover:scale-[1.02]"
            >
              <span>EMAIL</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between border-2 border-fg text-fg rounded-2xl px-5 py-4 text-sm tracking-[0.2em] font-semibold transition-transform duration-200 hover:scale-[1.02]"
            >
              <span>WHATSAPP</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navbar large screen */}
      <div className="fixed top-0 left-0 w-full px-6 lg:px-20 z-[100001] ">
        <div className="items-start justify-between hidden lg:flex pt-14 pb-10">
          <div className="tracking-wider font-AeonikMedium text-4xl">
            <Link href="/" aria-label="Home">LAKSHRAJ SINGH CHUNDAWAT</Link>
          </div>
          <div className="hidden lg:flex items-center justify-around font-AeonikMedium">
            <Trail open={open} className="flex">
              <MusicButton />
              <LetsTalk />
              <MenuButton />
            </Trail>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
